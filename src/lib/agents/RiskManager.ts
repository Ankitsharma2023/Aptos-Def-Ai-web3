import { BaseAgent, AgentConfig, Position } from './BaseAgent';
import Decimal from 'decimal.js';
import { formatDistance } from 'date-fns';

interface RiskMetrics {
  volatility: number;
  impermanentLoss: number;
  utilizationRate: number;
  collateralRatio: number;
  marketDepth: Decimal;
  concentration: number;
  correlations: Map<string, number>;
  healthFactor: number;
  liquidationRisk: number;
}

interface ProtocolHealth {
  tvl: Decimal;
  volume24h: Decimal;
  uniqueUsers: number;
  auditScore: number;
  incidentHistory: {
    lastIncident: Date | null;
    severity: 'low' | 'medium' | 'high';
    resolution: string;
  };
}

export class RiskManager extends BaseAgent {
  private metrics: RiskMetrics | null = null;
  private protocolHealth: Map<string, ProtocolHealth> = new Map();
  private readonly RISK_THRESHOLDS = {
    volatility: 0.15, // 15% volatility
    impermanentLoss: 0.05, // 5% IL
    utilizationRate: 0.8, // 80% utilization
    collateralRatio: 1.5, // 150% minimum collateral ratio
    minMarketDepth: new Decimal(100000), // $100k minimum market depth
    maxConcentration: 0.4, // 40% maximum protocol concentration
    minHealthFactor: 1.2, // Minimum health factor
    maxCorrelation: 0.7, // Maximum correlation between positions
  };

  constructor(config: AgentConfig) {
    super({
      ...config,
      name: 'Risk Manager',
      description: 'Monitors and manages portfolio risk exposure across protocols',
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
    await this.updateRiskMetrics();
    await this.updateProtocolHealth();
    
    if (!this.metrics) {
      return {
        shouldAct: false,
        reason: 'Risk metrics not available',
        urgency: 'low'
      };
    }

    const riskFactors = this.evaluateRiskFactors();
    const protocolIssues = this.evaluateProtocolHealth();
    const portfolioIssues = this.evaluatePortfolioHealth();

    const allIssues = [...riskFactors, ...protocolIssues, ...portfolioIssues];
    
    if (allIssues.length > 0) {
      const highRiskIssues = allIssues.filter(issue => issue.severity === 'high');
      const mediumRiskIssues = allIssues.filter(issue => issue.severity === 'medium');
      
      if (highRiskIssues.length > 0) {
        return {
          shouldAct: true,
          reason: `Critical risk factors detected: ${highRiskIssues.map(i => i.description).join(', ')}`,
          action: 'Immediate risk mitigation required',
          urgency: 'high',
          risks: highRiskIssues.map(i => i.description)
        };
      }
      
      if (mediumRiskIssues.length > 0) {
        return {
          shouldAct: true,
          reason: `Elevated risk factors detected: ${mediumRiskIssues.map(i => i.description).join(', ')}`,
          action: 'Adjust positions to reduce risk exposure',
          urgency: 'medium',
          risks: mediumRiskIssues.map(i => i.description)
        };
      }
    }

    return {
      shouldAct: false,
      reason: 'Risk levels within acceptable range',
      urgency: 'low'
    };
  }

  async execute(): Promise<boolean> {
    try {
      const analysis = await this.analyze();
      if (!analysis.shouldAct) return false;

      if (analysis.urgency === 'high') {
        return await this.executeEmergencyMitigation();
      }

      // Implement risk mitigation strategies
      const mitigationSuccess = await this.mitigateRisks();
      
      if (mitigationSuccess) {
        this.notifySuccess('Successfully adjusted positions to reduce risk');
        return true;
      }

      this.notifyError('Risk mitigation failed');
      return false;
    } catch (error) {
      console.error('Risk management execution error:', error);
      this.notifyError('Risk management failed');
      return false;
    }
  }

  private async executeEmergencyMitigation(): Promise<boolean> {
    try {
      // Identify highest risk positions
      const riskyPositions = this.positions.filter(position => 
        this.isPositionHighRisk(position)
      );

      // Execute emergency exits
      for (const position of riskyPositions) {
        const exitSuccess = await this.emergencyExit(position);
        if (!exitSuccess) {
          this.notifyError(`Failed to exit risky position in ${position.protocol}`);
          return false;
        }
      }

      // Rebalance remaining positions if necessary
      if (this.positions.length > 0) {
        const rebalanceSuccess = await this.rebalanceForRiskReduction();
        if (!rebalanceSuccess) {
          this.notifyWarning('Partial success: Exited risky positions but rebalancing failed');
          return true; // Still consider it a success as we exited risky positions
        }
      }

      this.notifySuccess('Successfully executed emergency risk mitigation');
      return true;
    } catch (error) {
      console.error('Emergency mitigation failed:', error);
      this.notifyError('Emergency mitigation failed');
      return false;
    }
  }

  private async updateRiskMetrics(): Promise<void> {
    try {
      const [
        volatility,
        impermanentLoss,
        utilizationRate,
        collateralRatio,
        marketDepth,
        concentration,
        correlations,
        healthFactor,
        liquidationRisk
      ] = await Promise.all([
        this.calculateVolatility(),
        this.calculateImpermanentLoss(),
        this.calculateUtilizationRate(),
        this.calculateCollateralRatio(),
        this.calculateMarketDepth(),
        this.calculateConcentration(),
        this.calculateCorrelations(),
        this.calculateHealthFactor(),
        this.calculateLiquidationRisk()
      ]);

      this.metrics = {
        volatility,
        impermanentLoss,
        utilizationRate,
        collateralRatio,
        marketDepth,
        concentration,
        correlations,
        healthFactor,
        liquidationRisk
      };
    } catch (error) {
      console.error('Failed to update risk metrics:', error);
      this.metrics = null;
    }
  }

  private async updateProtocolHealth(): Promise<void> {
    for (const protocol of this.config.protocols) {
      try {
        const health = await this.fetchProtocolHealth(protocol);
        this.protocolHealth.set(protocol, health);
      } catch (error) {
        console.error(`Failed to fetch health data for ${protocol}:`, error);
      }
    }
  }

  private evaluateRiskFactors(): Array<{
    severity: 'low' | 'medium' | 'high';
    description: string;
  }> {
    const factors: Array<{
      severity: 'low' | 'medium' | 'high';
      description: string;
    }> = [];

    if (!this.metrics) return factors;

    // Volatility check
    if (this.metrics.volatility > this.RISK_THRESHOLDS.volatility) {
      factors.push({
        severity: this.metrics.volatility > this.RISK_THRESHOLDS.volatility * 1.5 ? 'high' : 'medium',
        description: `High volatility (${(this.metrics.volatility * 100).toFixed(2)}%)`
      });
    }

    // Impermanent loss check
    if (this.metrics.impermanentLoss > this.RISK_THRESHOLDS.impermanentLoss) {
      factors.push({
        severity: this.metrics.impermanentLoss > this.RISK_THRESHOLDS.impermanentLoss * 1.5 ? 'high' : 'medium',
        description: `Significant impermanent loss (${(this.metrics.impermanentLoss * 100).toFixed(2)}%)`
      });
    }

    // Utilization rate check
    if (this.metrics.utilizationRate > this.RISK_THRESHOLDS.utilizationRate) {
      factors.push({
        severity: this.metrics.utilizationRate > this.RISK_THRESHOLDS.utilizationRate * 1.1 ? 'high' : 'medium',
        description: `High utilization rate (${(this.metrics.utilizationRate * 100).toFixed(2)}%)`
      });
    }

    // Market depth check
    if (this.metrics.marketDepth.lt(this.RISK_THRESHOLDS.minMarketDepth)) {
      factors.push({
        severity: this.metrics.marketDepth.lt(this.RISK_THRESHOLDS.minMarketDepth.div(2)) ? 'high' : 'medium',
        description: 'Insufficient market depth'
      });
    }

    // Concentration check
    if (this.metrics.concentration > this.RISK_THRESHOLDS.maxConcentration) {
      factors.push({
        severity: this.metrics.concentration > this.RISK_THRESHOLDS.maxConcentration * 1.2 ? 'high' : 'medium',
        description: `High protocol concentration (${(this.metrics.concentration * 100).toFixed(2)}%)`
      });
    }

    // Health factor check
    if (this.metrics.healthFactor < this.RISK_THRESHOLDS.minHealthFactor) {
      factors.push({
        severity: this.metrics.healthFactor < this.RISK_THRESHOLDS.minHealthFactor * 0.8 ? 'high' : 'medium',
        description: `Low health factor (${this.metrics.healthFactor.toFixed(2)})`
      });
    }

    return factors;
  }

  private evaluateProtocolHealth(): Array<{
    severity: 'low' | 'medium' | 'high';
    description: string;
  }> {
    const issues: Array<{
      severity: 'low' | 'medium' | 'high';
      description: string;
    }> = [];

    for (const [protocol, health] of this.protocolHealth.entries()) {
      // TVL checks
      if (health.tvl.lt(new Decimal(1000000))) { // Less than $1M TVL
        issues.push({
          severity: health.tvl.lt(new Decimal(500000)) ? 'high' : 'medium',
          description: `Low TVL in ${protocol}`
        });
      }

      // Volume checks
      if (health.volume24h.lt(new Decimal(100000))) { // Less than $100k daily volume
        issues.push({
          severity: health.volume24h.lt(new Decimal(50000)) ? 'high' : 'medium',
          description: `Low volume in ${protocol}`
        });
      }

      // Audit score checks
      if (health.auditScore < 80) {
        issues.push({
          severity: health.auditScore < 70 ? 'high' : 'medium',
          description: `Low audit score for ${protocol}`
        });
      }

      // Recent incidents
      if (health.incidentHistory.lastIncident) {
        const daysSinceIncident = Math.floor(
          (Date.now() - health.incidentHistory.lastIncident.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (daysSinceIncident < 30) {
          issues.push({
            severity: health.incidentHistory.severity,
            description: `Recent incident in ${protocol} (${daysSinceIncident} days ago)`
          });
        }
      }
    }

    return issues;
  }

  private evaluatePortfolioHealth(): Array<{
    severity: 'low' | 'medium' | 'high';
    description: string;
  }> {
    const issues: Array<{
      severity: 'low' | 'medium' | 'high';
      description: string;
    }> = [];

    // Check position correlations
    if (this.metrics?.correlations) {
      for (const [pair, correlation] of this.metrics.correlations) {
        if (correlation > this.RISK_THRESHOLDS.maxCorrelation) {
          issues.push({
            severity: correlation > this.RISK_THRESHOLDS.maxCorrelation * 1.2 ? 'high' : 'medium',
            description: `High correlation between positions: ${pair}`
          });
        }
      }
    }

    // Check liquidation risks
    if (this.metrics?.liquidationRisk > 0.1) { // 10% liquidation risk threshold
      issues.push({
        severity: this.metrics.liquidationRisk > 0.2 ? 'high' : 'medium',
        description: `High liquidation risk (${(this.metrics.liquidationRisk * 100).toFixed(2)}%)`
      });
    }

    // Check portfolio concentration
    const totalValue = this.positions.reduce((sum, pos) => sum.plus(pos.amount), new Decimal(0));
    for (const position of this.positions) {
      const concentration = position.amount.div(totalValue).toNumber();
      if (concentration > this.RISK_THRESHOLDS.maxConcentration) {
        issues.push({
          severity: concentration > this.RISK_THRESHOLDS.maxConcentration * 1.2 ? 'high' : 'medium',
          description: `High concentration in ${position.protocol}`
        });
      }
    }

    return issues;
  }

  private isPositionHighRisk(position: Position): boolean {
    const protocol = this.protocolHealth.get(position.protocol);
    if (!protocol) return true;

    return (
      position.utilizationRate! > this.RISK_THRESHOLDS.utilizationRate ||
      position.collateralRatio! < this.RISK_THRESHOLDS.collateralRatio ||
      protocol.auditScore < 70
    );
  }

  private async emergencyExit(position: Position): Promise<boolean> {
    // Implement emergency exit logic
    throw new Error('Emergency exit not implemented');
  }

  private async rebalanceForRiskReduction(): Promise<boolean> {
    // Implement risk-reducing rebalance logic
    throw new Error('Risk-reducing rebalance not implemented');
  }

  private async calculateVolatility(): Promise<number> {
    // Implement volatility calculation
    throw new Error('Volatility calculation not implemented');
  }

  private async calculateImpermanentLoss(): Promise<number> {
    // Implement impermanent loss calculation
    throw new Error('Impermanent loss calculation not implemented');
  }

  private async calculateUtilizationRate(): Promise<number> {
    // Implement utilization rate calculation
    throw new Error('Utilization rate calculation not implemented');
  }

  private async calculateCollateralRatio(): Promise<number> {
    // Implement collateral ratio calculation
    throw new Error('Collateral ratio calculation not implemented');
  }

  private async calculateMarketDepth(): Promise<Decimal> {
    // Implement market depth calculation
    throw new Error('Market depth calculation not implemented');
  }

  private async calculateConcentration(): Promise<number> {
    // Implement concentration calculation
    throw new Error('Concentration calculation not implemented');
  }

  private async calculateCorrelations(): Promise<Map<string, number>> {
    // Implement correlation calculation
    throw new Error('Correlation calculation not implemented');
  }

  private async calculateHealthFactor(): Promise<number> {
    // Implement health factor calculation
    throw new Error('Health factor calculation not implemented');
  }

  private async calculateLiquidationRisk(): Promise<number> {
    // Implement liquidation risk calculation
    throw new Error('Liquidation risk calculation not implemented');
  }

  private async fetchProtocolHealth(protocol: string): Promise<ProtocolHealth> {
    // Implement protocol health fetching
    throw new Error('Protocol health fetching not implemented');
  }

  private async mitigateRisks(): Promise<boolean> {
    // Implement risk mitigation strategies
    throw new Error('Risk mitigation not implemented');
  }
}