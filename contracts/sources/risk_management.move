module aptos_defai::risk_management {
    use aptos_framework::signer;

    struct RiskMetrics has key {
        owner: address,
        liquidation_threshold: u64,
    }

    public entry fun set_threshold(account: &signer, threshold: u64) {
        let metrics = borrow_global_mut<RiskMetrics>(signer::address_of(account));
        metrics.liquidation_threshold = threshold;
    }
}

