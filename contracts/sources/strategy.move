module aptos_defai::strategy {
    use aptos_framework::signer;

    struct Strategy has key {
        owner: address,
        allocation: u64,
    }

    public entry fun create_strategy(account: &signer, allocation: u64) {
        let owner = signer::address_of(account);
        move_to(account, Strategy { owner, allocation });
    }

    public entry fun update_allocation(account: &signer, new_allocation: u64) {
        let strategy = borrow_global_mut<Strategy>(signer::address_of(account));
        strategy.allocation = new_allocation;
    }
}

