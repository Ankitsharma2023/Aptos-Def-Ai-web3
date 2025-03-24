import { AptosClient, Types } from '@aptos-labs/ts-sdk';
import Decimal from 'decimal.js';
import { toast } from 'react-hot-toast';

export interface AgentConfig {
  name: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  targetApy: number;
  maxSlippage: number;
  rebalanceThreshold: number;
  maxPositionSize: Decimal; // Maximum size for any single position
  minLiquidity: Decimal; // Minimum liquidity requirement for a protocol
  protocols: string[];
  emergencyThresholds: {
    maxDrawdown: number; // Maximum allowed drawdown before emergency action
    minCollateralRatio: number; // Minimum collateral ratio to maintain
    maxUtilization: number; // Maximum protocol utilization rate
  };
}

export interface Position {
  id: string;
  protocol: string;
  pool: string;
  amount: Decimal;
  token: string;
  apy: number;
  timestamp: Date;
  riskScore: number;
  collateralRatio?: number;
  utilizationRate?: number;
  fees24h?: Decimal;
}

export interface PositionUpdate {
  type: 'enter' | 'exit' | 'rebalance';
  timestamp: Date;
  oldPosition?: Position;
  newPosition: Position;
  reason: string;
  gasUsed: Decimal;
  success: boolean;
}

export abstract class BaseAgent {
  protected client: AptosClient;
  protected config: AgentConfig;
  protected positions: Position[] = [];
  protected positionHistory: PositionUpdate[] = [];
  protected isActive: boolean = false;
  protected totalValue: Decimal = new Decimal(0);
  protected lastAnalysis: Date | null = null;
  protected readonly ANALYSIS_INTERVAL = 5 * 60 * 1000; // 5 minutes

  constructor(config: AgentConfig) {
    this.config = {
      ...config,
      maxPositionSize: new Decimal(config.maxPositionSize || 10000), // Default $10k max per position
      minLiquidity: new Decimal(config.minLiquidity || 100000), // Default $100k min liquidity
      emergencyThresholds: {
        maxDrawdown: config.emergencyThresholds?.maxDrawdown || 0.1, // 10% max drawdown
        minCollateralRatio: config.emergencyThresholds?.minCollateralRatio || 1.5, // 150% minimum collateral ratio
        maxUtilization: config.emergencyThresholds?.maxUtilization || 0.8, // 80% maximum utilization
      }
    };
    this.client = new AptosClient('https://fullnode.mainnet.aptoslabs.com/v1');
  }

  abstract async analyze(): Promise<{
    shouldAct: boolean;
    reason?: string;
    action?: string;
    urgency: 'low' | 'medium' | 'high';
    expectedReturn?: number;
    risks?: string[];
  }>;

  abstract async execute(): Promise<boolean>;

  protected async validateTransaction(txHash: string): Promise<boolean> {
    try {
      const txn = await this.client.waitForTransaction({
        transactionHash: txHash,
      });
      return txn.success;
    } catch (error) {
      console.error('Transaction validation failed:', error);
      return false;
    }
  }

  protected async estimateGas(
    transaction: Types.Transaction
  ): Promise<Decimal> {
    try {
      const simulation = await this.client.simulateTransaction(transaction);
      return new Decimal(simulation.gas_used);
    } catch (error) {
      console.error('Gas estimation failed:', error);
      throw error;
    }
  }

  protected async checkEmergencyConditions(): Promise<{
    emergency: boolean;
    reasons: string[];
  }> {
    const reasons: string[] = [];
    
    // Check drawdown
    const drawdown = this.calculateDrawdown();
    if (drawdown > this.config.emergencyThresholds.maxDrawdown) {
      reasons.push(`Drawdown (${(drawdown * 100).toFixed(2)}%) exceeds maximum threshold`);
    }

    // Check collateral ratios
    for (const position of this.positions) {
      if (position.collateralRatio && 
          position.collateralRatio < this.config.emergencyThresholds.minCollateralRatio) {
        reasons.push(`Low collateral ratio in ${position.protocol} position`);
      }
    }

    // Check utilization rates
    for (const position of this.positions) {
      if (position.utilizationRate && 
          position.utilizationRate > this.config.emergencyThresholds.maxUtilization) {
        reasons.push(`High utilization rate in ${position.protocol}`);
      }
    }

    return {
      emergency: reasons.length > 0,
      reasons
    };
  }

  protected calculateDrawdown(): number {
    if (this.positionHistory.length === 0) return 0;
    
    const peakValue = this.positionHistory.reduce((max, update) => {
      const positionValue = new Decimal(update.newPosition.amount);
      return positionValue.gt(max) ? positionValue : max;
    }, new Decimal(0));

    const currentValue = this.totalValue;
    return peakValue.eq(0) ? 0 : 1 - currentValue.div(peakValue).toNumber();
  }

  protected async updatePosition(update: PositionUpdate): Promise<void> {
    this.positionHistory.push(update);
    
    // Update current positions
    if (update.type === 'exit') {
      this.positions = this.positions.filter(p => p.id !== update.oldPosition?.id);
    } else if (update.type === 'enter') {
      this.positions.push(update.newPosition);
    } else if (update.type === 'rebalance' && update.oldPosition) {
      const index = this.positions.findIndex(p => p.id === update.oldPosition?.id);
      if (index !== -1) {
        this.positions[index] = update.newPosition;
      }
    }

    // Update total value
    this.totalValue = this.positions.reduce(
      (sum, pos) => sum.plus(pos.amount),
      new Decimal(0)
    );
  }

  protected notifySuccess(message: string) {
    toast.success(message);
  }

  protected notifyError(message: string) {
    toast.error(message);
  }

  protected notifyWarning(message: string) {
    toast.custom((t) => (
      <div className="bg-yellow-900/80 border border-yellow-700 text-yellow-200 px-6 py-4 rounded-lg shadow-lg">
        ⚠️ {message}
      </div>
    ));
  }

  public getPositions(): Position[] {
    return this.positions;
  }

  public getPositionHistory(): PositionUpdate[] {
    return this.positionHistory;
  }

  public getConfig(): AgentConfig {
    return this.config;
  }

  public getTotalValue(): Decimal {
    return this.totalValue;
  }

  public getPerformanceMetrics(): {
    totalReturn: number;
    annualizedReturn: number;
    sharpeRatio: number;
    maxDrawdown: number;
  } {
    // Calculate performance metrics based on position history
    const returns = this.calculateReturns();
    const volatility = this.calculateVolatility(returns);
    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    
    return {
      totalReturn: this.calculateTotalReturn(),
      annualizedReturn: this.annualizeReturn(avgReturn),
      sharpeRatio: volatility === 0 ? 0 : avgReturn / volatility,
      maxDrawdown: this.calculateMaxDrawdown()
    };
  }

  private calculateReturns(): number[] {
    if (this.positionHistory.length < 2) return [];
    
    const returns: number[] = [];
    for (let i = 1; i < this.positionHistory.length; i++) {
      const prev = this.positionHistory[i - 1].newPosition.amount;
      const curr = this.positionHistory[i].newPosition.amount;
      returns.push(curr.div(prev).minus(1).toNumber());
    }
    return returns;
  }

  private calculateVolatility(returns: number[]): number {
    if (returns.length === 0) return 0;
    const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const squaredDiffs = returns.map(r => Math.pow(r - mean, 2));
    return Math.sqrt(squaredDiffs.reduce((sum, d) => sum + d, 0) / returns.length);
  }

  private calculateTotalReturn(): number {
    if (this.positionHistory.length === 0) return 0;
    const initial = this.positionHistory[0].newPosition.amount;
    return this.totalValue.div(initial).minus(1).toNumber();
  }

  private annualizeReturn(dailyReturn: number): number {
    return Math.pow(1 + dailyReturn, 365) - 1;
  }

  private calculateMaxDrawdown(): number {
    let maxDrawdown = 0;
    let peak = new Decimal(0);
    
    for (const update of this.positionHistory) {
      const value = update.newPosition.amount;
      if (value.gt(peak)) {
        peak = value;
      }
      const drawdown = peak.eq(0) ? 0 : 1 - value.div(peak).toNumber();
      maxDrawdown = Math.max(maxDrawdown, drawdown);
    }
    
    return maxDrawdown;
  }

  public isRunning(): boolean {
    return this.isActive;
  }

  public async start(): Promise<void> {
    this.isActive = true;
    this.notifySuccess(`${this.config.name} agent started`);
  }

  public async stop(): Promise<void> {
    this.isActive = false;
    this.notifySuccess(`${this.config.name} agent stopped`);
  }
}

export { BaseAgent }