module aptos_defai::lending {
    use aptos_framework::signer;

    struct LendingPosition has key {
        owner: address,
        amount: u64,
    }

    public entry fun borrow(account: &signer, amount: u64) {
        let position = borrow_global_mut<LendingPosition>(signer::address_of(account));
        position.amount = position.amount + amount;
    }
}

