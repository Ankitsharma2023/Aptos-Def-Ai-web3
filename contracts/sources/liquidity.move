module aptos_defai::portfolio {
    use aptos_framework::signer;

    struct Portfolio has key {
        owner: address,
        assets: vector<u64>,
    }

    public entry fun create_portfolio(account: &signer) {
        let owner = signer::address_of(account);
        move_to(account, Portfolio { owner, assets: vector[] });
    }

    public entry fun add_asset(account: &signer, asset: u64) {
        let portfolio = borrow_global_mut<Portfolio>(signer::address_of(account));
        portfolio.assets.push(asset);
    }
}

