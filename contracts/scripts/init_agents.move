script {
    use aptos_defai::agent_registry;

    fun main(account: &signer, strategy_id: u64) {
        agent_registry::register_agent(account, strategy_id);
    }
}

