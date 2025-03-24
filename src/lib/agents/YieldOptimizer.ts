import { BaseAgent, AgentConfig, Position, PositionUpdate } from './BaseAgent';
import Decimal from 'decimal.js';
import { formatUnits, parseUnits } from 'web3-utils';
import { v4 as uuidv4 } from 'uuid';

interface YieldStrategy {
  protocol: string;
  pool: string;
  currentApy: number;
  tvl: Decimal;
  risk: number;
  utilizationRate: number;
  volatility7d: number;
  impermanentLoss30d: number;
  fee24h: Decimal;
  volume24h: Decimal;
}

export class YieldOptimizer extends BaseAgent {
  private strategies: YieldStrategy[] = [];
  private lastRebalance: Date = new Date();
  private readonly MIN_REBALANCE_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours
  private readonly MAX_POSITIONS = 3; // Maximum number of concurrent positions
  private readonly MIN_APY_IMPROVEMENT = 0.02; // 2% minimum APY improvement to trigger rebalance
  private readonly RISK_WEIGHTS = {
    apy: 0.4,
    tvl: 0.15,
    utilization: 0.15,
    volatility: 0.15,
    impermanentLoss: 0.15
  };

  constructor(config: AgentConfig) {
    super({
      ...config,
      name: 'Yield Optimizer',
      description: 'Optimizes yield across multiple protocols while managing risk exposure',
    });
  }

  async analyze(): Promise<{
    shouldAct: boolean;
    reason?: string;
    action?: string;
    urgency: 'low' | 'medium' | 'high';
    expectedReturn?: number;
    risks?: string[];
  }> {
    // Check emergency conditions first
    const emergency = await this.checkEmergencyConditions();
    if (emergency.emergency) {
      return {
        shouldAct: true,
        reason: 'Emergency conditions detected: ' + emergency.reasons.join(', '),
        action: 'Emergency exit from risky positions',
        urgency: 'high',
        risks: emergency.reasons
      };
    }

    await this.updateStrategies();
    
    const bestStrategy = this.findBestStrategy();
    const currentStrategy = this.getCurrentStrategy();
    
    if (!currentStrategy) {
      return {
        shouldAct: true,
        reason: 'Initial position needed',
        action: 'Deploy to highest yield protocol',
        urgency: 'medium',
        expectedReturn: bestStrategy.currentApy,
        risks: this.assessStrategyRisks(bestStrategy)
      };
    }

    const timeSinceLastRebalance = Date.now() - this.lastRebalance.getTime();
    if (timeSinceLastRebalance < this.MIN_REBALANCE_INTERVAL) {
      return {
        shouldAct: false,
        reason: 'Minimum rebalance interval not met',
        urgency: 'low'
      };
    }

    const apyImprovement = bestStrategy.currentApy - currentStrategy.currentApy;
    const riskAdjustedImprovement = this.calculateRiskAdjustedImprovement(
      bestStrategy,
      currentStrategy
    );

    if (riskAdjustedImprovement > this.MIN_APY_IMPROVEMENT) {
      return {
        shouldAct: true,
        reason: `Potential ${(apyImprovement * 100).toFixed(2)}% APY improvement available`,
        action: `Rebalance to ${bestStrategy.protocol}`,
        urgency: apyImprovement > 0.05 ? 'high' : 'medium',
        expectedReturn: bestStrategy.currentApy,
        risks: this.assessStrategyRisks(bestStrategy)
      };
    }

    return {
      shouldAct: false,
      reason: 'Current position optimal',
      urgency: 'low'
    };
  }

  async execute(): Promise<boolean> {
    try {
      const analysis = await this.analyze();
      if (!analysis.shouldAct) return false;

      if (analysis.urgency === 'high' && analysis.action?.includes('Emergency')) {
        return await this.executeEmergencyExit();
      }

      const bestStrategy = this.findBestStrategy();
      
      // Validate strategy meets minimum requirements
      if (!this.validateStrategy(bestStrategy)) {
        this.notifyWarning('Selected strategy does not meet minimum requirements');
        return false;
      }

      // Check position size limits
      const positionSize = this.calculateOptimalPositionSize(bestStrategy);
      if (positionSize.gt(this.config.maxPositionSize)) {
        this.notifyWarning('Position size exceeds maximum limit');
        return false;
      }

      // Simulate the rebalancing transaction
      const simulation = await this.simulateRebalance(bestStrategy, positionSize);
      if (!simulation.success) {
        this.notifyError('Rebalance simulation failed');
        return false;
      }

      // Execute the rebalancing
      const txHash = await this.executeRebalance(bestStrategy, positionSize);
      const success = await this.validateTransaction(txHash);

      if (success) {
        const newPosition: Position = {
          id: uuidv4(),
          protocol: bestStrategy.protocol,
          pool: bestStrategy.pool,
          amount: positionSize,
          token: 'USDC',
          apy: bestStrategy.currentApy,
          timestamp: new Date(),
          riskScore: this.calculateRiskScore(bestStrategy),
          utilizationRate: bestStrategy.utilizationRate,
          fees24h: bestStrategy.fee24h
        };

        const update: PositionUpdate = {
          type: 'enter',
          timestamp: new Date(),
          newPosition,
          reason: `Entered position in ${bestStrategy.protocol} for higher yield`,
          gasUsed: new Decimal(simulation.gasUsed),
          success: true
        };

        await this.updatePosition(update);
        this.lastRebalance = new Date();
        this.notifySuccess(`Successfully entered position in ${bestStrategy.protocol}`);
        return true;
      }

      this.notifyError('Position entry failed');
      return false;
    } catch (error) {
      console.error('Execution error:', error);
      this.notifyError('Execution failed');
      return false;
    }
  }

  private async executeEmergencyExit(): Promise<boolean> {
    try {
      for (const position of this.positions) {
        if (this.isPositionAtRisk(position)) {
          const txHash = await this.executeExit(position);
          const success = await this.validateTransaction(txHash);
          
          if (success) {
            const update: PositionUpdate = {
              type: 'exit',
              timestamp: new Date(),
              oldPosition: position,
              newPosition: {
                ...position,
                amount: new Decimal(0)
              },
              reason: 'Emergency exit due to risk conditions',
              gasUsed: new Decimal(0), // Will be updated with actual gas used
              success: true
            };
            
            await this.updatePosition(update);
            this.notifySuccess(`Emergency exit from ${position.protocol} successful`);
          } else {
            this.notifyError(`Failed to exit position in ${position.protocol}`);
            return false;
          }
        }
      }
      return true;
    } catch (error) {
      console.error('Emergency exit failed:', error);
      this.notifyError('Emergency exit failed');
      return false;
    }
  }

  private calculateRiskAdjustedImprovement(
    newStrategy: YieldStrategy,
    currentStrategy: YieldStrategy
  ): number {
    const newScore = this.calculateRiskAdjustedScore(newStrategy);
    const currentScore = this.calculateRiskAdjustedScore(currentStrategy);
    return newScore - currentScore;
  }

  private calculateRiskAdjustedScore(strategy: YieldStrategy): number {
    return (
      strategy.currentApy * this.RISK_WEIGHTS.apy -
      (strategy.risk * this.RISK_WEIGHTS.tvl +
        strategy.utilizationRate * this.RISK_WEIGHTS.utilization +
        strategy.volatility7d * this.RISK_WEIGHTS.volatility +
        strategy.impermanentLoss30d * this.RISK_WEIGHTS.impermanentLoss)
    );
  }

  private calculateRiskScore(strategy: YieldStrategy): number {
    return (
      strategy.risk * 0.3 +
      strategy.utilizationRate * 0.3 +
      strategy.volatility7d * 0.2 +
      strategy.impermanentLoss30d * 0.2
    );
  }

  private validateStrategy(strategy: YieldStrategy): boolean {
    return (
      strategy.tvl.gte(this.config.minLiquidity) &&
      strategy.utilizationRate <= this.config.emergencyThresholds.maxUtilization &&
      strategy.volume24h.gt(new Decimal(50000)) // Minimum $50k daily volume
    );
  }

  private calculateOptimalPositionSize(strategy: YieldStrategy): Decimal {
    // Calculate based on TVL and volume
    const maxByTvl = strategy.tvl.mul(0.02); // Max 2% of TVL
    const maxByVolume = strategy.volume24h.mul(0.1); // Max 10% of daily volume
    
    // Take the minimum of all constraints
    return Decimal.min(
      maxByTvl,
      maxByVolume,
      this.config.maxPositionSize
    );
  }

  private async updateStrategies(): Promise<void> {
    this.strategies = await Promise.all(
      this.config.protocols.map(async (protocol) => {
        try {
          const data = await this.fetchProtocolData(protocol);
          return {
            protocol,
            pool: data.pool,
            currentApy: data.apy,
            tvl: new Decimal(data.tvl),
            risk: data.risk,
            utilizationRate: data.utilizationRate,
            volatility7d: data.volatility7d,
            impermanentLoss30d: data.impermanentLoss30d,
            fee24h: new Decimal(data.fee24h),
            volume24h: new Decimal(data.volume24h)
          };
        } catch (error) {
          console.error(`Failed to fetch data for ${protocol}:`, error);
          return null;
        }
      })
    ).then(strategies => strategies.filter(Boolean) as YieldStrategy[]);
  }

  private findBestStrategy(): YieldStrategy {
    return this.strategies.reduce((best, current) => {
      const currentScore = this.calculateRiskAdjustedScore(current);
      const bestScore = this.calculateRiskAdjustedScore(best);
      return currentScore > bestScore ? current : best;
    });
  }

  private getCurrentStrategy(): YieldStrategy | null {
    if (this.positions.length === 0) return null;
    const currentPosition = this.positions[0];
    return this.strategies.find(s => s.protocol === currentPosition.protocol) || null;
  }

  private isPositionAtRisk(position: Position): boolean {
    const strategy = this.strategies.find(s => s.protocol === position.protocol);
    if (!strategy) return true; // Consider unknown strategies as risky
    
    return (
      strategy.utilizationRate > this.config.emergencyThresholds.maxUtilization ||
      strategy.volatility7d > 0.1 || // 10% weekly volatility threshold
      strategy.impermanentLoss30d > 0.05 // 5% IL threshold
    );
  }

  private assessStrategyRisks(strategy: YieldStrategy): string[] {
    const risks: string[] = [];
    
    if (strategy.utilizationRate > 0.7) {
      risks.push('High utilization rate');
    }
    if (strategy.volatility7d > 0.05) {
      risks.push('Elevated price volatility');
    }
    if (strategy.impermanentLoss30d > 0.02) {
      risks.push('Significant impermanent loss risk');
    }
    if (strategy.tvl.lt(new Decimal(1000000))) {
      risks.push('Low TVL');
    }
    
    return risks;
  }

  private async fetchProtocolData(protocol: string): Promise<any> {
    // Implement protocol-specific data fetching
    throw new Error('Protocol data fetching not implemented');
  }

  private async simulateRebalance(
    strategy: YieldStrategy,
    amount: Decimal
  ): Promise<{ success: boolean; gasUsed: string }> {
    // Implement rebalance simulation
    throw new Error('Rebalance simulation not implemented');
  }

  private async executeRebalance(
    strategy: YieldStrategy,
    amount: Decimal
  ): Promise<string> {
    // Implement actual rebalancing transaction
    throw new Error('Rebalance execution not implemented');
  }

  private async executeExit(position: Position): Promise<string> {
    // Implement position exit transaction
    throw new Error('Exit execution not implemented');
  }
}