module aptos_defai::agent_registry {
    use aptos_framework::signer;

    struct Agent has key {
        owner: address,
        strategy_id: u64,
    }

    public entry fun register_agent(account: &signer, strategy_id: u64) {
        let owner = signer::address_of(account);
        move_to(account, Agent { owner, strategy_id });
    }
}

