import { create } from 'zustand';
import { BaseAgent } from '../lib/agents/BaseAgent';
import { AgentFactory, AgentType } from '../lib/agents/AgentFactory';
import { toast } from 'react-hot-toast';

interface AgentState {
  agents: BaseAgent[];
  activeAgents: string[];
  totalValue: number;
  lastUpdate: Date | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addAgent: (type: AgentType, config?: any) => Promise<void>;
  removeAgent: (agentId: string) => Promise<void>;
  startAgent: (agentId: string) => Promise<void>;
  stopAgent: (agentId: string) => Promise<void>;
  updateAgentConfig: (agentId: string, config: any) => Promise<void>;
  
  // Queries
  getAgent: (agentId: string) => BaseAgent | undefined;
  getActiveAgents: () => BaseAgent[];
  getAgentMetrics: (agentId: string) => any;
  getTotalValue: () => number;
  
  // System
  initialize: () => Promise<void>;
  cleanup: () => Promise<void>;
}

export const useAgentStore = create<AgentState>((set, get) => ({
  agents: [],
  activeAgents: [],
  totalValue: 0,
  lastUpdate: null,
  isLoading: false,
  error: null,

  addAgent: async (type: AgentType, config?: any) => {
    try {
      set({ isLoading: true, error: null });
      
      const agent = AgentFactory.createAgent(type, config);
      
      set(state => ({
        agents: [...state.agents, agent],
        lastUpdate: new Date()
      }));

      toast.success(`${agent.getConfig().name} agent added successfully`);
    } catch (error: any) {
      set({ error: error.message });
      toast.error(`Failed to add agent: ${error.message}`);
    } finally {
      set({ isLoading: false });
    }
  },

  removeAgent: async (agentId: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const agent = get().getAgent(agentId);
      if (!agent) throw new Error('Agent not found');

      // Stop agent if running
      if (get().activeAgents.includes(agentId)) {
        await agent.stop();
      }

      set(state => ({
        agents: state.agents.filter(a => a.getConfig().name !== agentId),
        activeAgents: state.activeAgents.filter(id => id !== agentId),
        lastUpdate: new Date()
      }));

      toast.success(`${agent.getConfig().name} agent removed`);
    } catch (error: any) {
      set({ error: error.message });
      toast.error(`Failed to remove agent: ${error.message}`);
    } finally {
      set({ isLoading: false });
    }
  },

  startAgent: async (agentId: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const agent = get().getAgent(agentId);
      if (!agent) throw new Error('Agent not found');

      await agent.start();
      
      set(state => ({
        activeAgents: [...state.activeAgents, agentId],
        lastUpdate: new Date()
      }));

      // Start monitoring loop
      monitorAgent(agent);

    } catch (error: any) {
      set({ error: error.message });
      toast.error(`Failed to start agent: ${error.message}`);
    } finally {
      set({ isLoading: false });
    }
  },

  stopAgent: async (agentId: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const agent = get().getAgent(agentId);
      if (!agent) throw new Error('Agent not found');

      await agent.stop();
      
      set(state => ({
        activeAgents: state.activeAgents.filter(id => id !== agentId),
        lastUpdate: new Date()
      }));

    } catch (error: any) {
      set({ error: error.message });
      toast.error(`Failed to stop agent: ${error.message}`);
    } finally {
      set({ isLoading: false });
    }
  },

  updateAgentConfig: async (agentId: string, config: any) => {
    try {
      set({ isLoading: true, error: null });
      
      const agent = get().getAgent(agentId);
      if (!agent) throw new Error('Agent not found');

      // Stop agent if running
      const wasActive = get().activeAgents.includes(agentId);
      if (wasActive) {
        await agent.stop();
      }

      // Create new agent with updated config
      const newAgent = AgentFactory.createAgent(
        config.type,
        { ...agent.getConfig(), ...config }
      );

      // Replace old agent
      set(state => ({
        agents: state.agents.map(a => 
          a.getConfig().name === agentId ? newAgent : a
        ),
        lastUpdate: new Date()
      }));

      // Restart if it was active
      if (wasActive) {
        await newAgent.start();
      }

      toast.success(`${agent.getConfig().name} configuration updated`);
    } catch (error: any) {
      set({ error: error.message });
      toast.error(`Failed to update agent config: ${error.message}`);
    } finally {
      set({ isLoading: false });
    }
  },

  getAgent: (agentId: string) => {
    return get().agents.find(a => a.getConfig().name === agentId);
  },

  getActiveAgents: () => {
    return get().agents.filter(agent => 
      get().activeAgents.includes(agent.getConfig().name)
    );
  },

  getAgentMetrics: (agentId: string) => {
    const agent = get().getAgent(agentId);
    if (!agent) return null;

    return {
      positions: agent.getPositions(),
      performance: agent.getPerformanceMetrics(),
      config: agent.getConfig(),
      totalValue: agent.getTotalValue()
    };
  },

  getTotalValue: () => {
    return get().agents.reduce((total, agent) => 
      total + agent.getTotalValue().toNumber(),
      0
    );
  },

  initialize: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // Initialize with default agents
      const yieldOptimizer = AgentFactory.createAgent('yield');
      const riskManager = AgentFactory.createAgent('risk');

      set({
        agents: [yieldOptimizer, riskManager],
        lastUpdate: new Date()
      });

      toast.success('Agent system initialized');
    } catch (error: any) {
      set({ error: error.message });
      toast.error(`Initialization failed: ${error.message}`);
    } finally {
      set({ isLoading: false });
    }
  },

  cleanup: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // Stop all active agents
      const activeAgents = get().getActiveAgents();
      await Promise.all(
        activeAgents.map(agent => agent.stop())
      );

      set({
        agents: [],
        activeAgents: [],
        lastUpdate: new Date()
      });

      toast.success('Agent system cleaned up');
    } catch (error: any) {
      set({ error: error.message });
      toast.error(`Cleanup failed: ${error.message}`);
    } finally {
      set({ isLoading: false });
    }
  }
}));

// Agent monitoring loop
async function monitorAgent(agent: BaseAgent) {
  while (agent.isRunning()) {
    try {
      const analysis = await agent.analyze();
      
      if (analysis.shouldAct) {
        if (analysis.urgency === 'high') {
          toast.error(analysis.reason || 'High urgency action required');
        } else if (analysis.urgency === 'medium') {
          toast.warning(analysis.reason || 'Action recommended');
        }
        
        await agent.execute();
      }
      
      await new Promise(resolve => setTimeout(resolve, 60000)); // Check every minute
    } catch (error) {
      console.error('Agent monitoring error:', error);
      await new Promise(resolve => setTimeout(resolve, 300000)); // Back off on error
    }
  }
}