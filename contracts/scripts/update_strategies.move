script {
    use aptos_defai::strategy;

    fun main(account: &signer, new_allocation: u64) {
        strategy::update_allocation(account, new_allocation);
    }
}

