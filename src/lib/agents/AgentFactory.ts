import { BaseAgent } from './BaseAgent';
import { YieldOptimizer } from './YieldOptimizer';
import { RiskManager } from './RiskManager';

export type AgentType = 'yield' | 'risk';

export interface AgentFactoryConfig {
  maxPositionSize: number;
  minLiquidity: number;
  emergencyThresholds: {
    maxDrawdown: number;
    minCollateralRatio: number;
    maxUtilization: number;
  };
  protocols: string[];
}

export class AgentFactory {
  private static readonly DEFAULT_CONFIG: AgentFactoryConfig = {
    maxPositionSize: 10000, // $10k max per position
    minLiquidity: 100000, // $100k min protocol liquidity
    emergencyThresholds: {
      maxDrawdown: 0.1, // 10% max drawdown
      minCollateralRatio: 1.5, // 150% minimum collateral ratio
      maxUtilization: 0.8, // 80% maximum utilization
    },
    protocols: [
      'liquidswap',
      'ditto',
      'aries',
      'thala',
      'pancake',
      'econia'
    ]
  };

  static createAgent(
    type: AgentType,
    customConfig: Partial<AgentFactoryConfig> = {}
  ): BaseAgent {
    const config = {
      ...this.DEFAULT_CONFIG,
      ...customConfig,
      emergencyThresholds: {
        ...this.DEFAULT_CONFIG.emergencyThresholds,
        ...customConfig.emergencyThresholds
      }
    };

    switch (type) {
      case 'yield':
        return new YieldOptimizer({
          name: 'Yield Optimizer',
          description: 'Optimizes yield across multiple protocols',
          riskLevel: 'medium',
          targetApy: 0.15, // 15% target APY
          maxSlippage: 0.01, // 1% max slippage
          rebalanceThreshold: 0.02, // 2% rebalance threshold
          ...config
        });
      
      case 'risk':
        return new RiskManager({
          name: 'Risk Manager',
          description: 'Manages portfolio risk exposure',
          riskLevel: 'low',
          targetApy: 0.12, // 12% target APY
          maxSlippage: 0.005, // 0.5% max slippage
          rebalanceThreshold: 0.05, // 5% risk threshold
          ...config
        });
      
      default:
        throw new Error(`Unknown agent type: ${type}`);
    }
  }
}