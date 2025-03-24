module aptos_defai::AptosDeFAI {
    use aptos_framework::coin;
    use aptos_framework::signer;
    use aptos_framework::event;

    struct DefaiAccount has key {
        owner: address,
        balance: u64,
    }

    public entry fun register_account(account: &signer) {
        let owner = signer::address_of(account);
        move_to(account, DefaiAccount { owner, balance: 0 });
    }

    public entry fun deposit(account: &signer, amount: u64) {
        let defai = borrow_global_mut<DefaiAccount>(signer::address_of(account));
        defai.balance = defai.balance + amount;
    }

    public entry fun withdraw(account: &signer, amount: u64) {
        let defai = borrow_global_mut<DefaiAccount>(signer::address_of(account));
        assert!(defai.balance >= amount, 1);
        defai.balance = defai.balance - amount;
    }
}

