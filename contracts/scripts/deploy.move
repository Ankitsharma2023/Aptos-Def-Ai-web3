script {
    use aptos_defai::AptosDeFAI;

    fun main(account: &signer) {
        AptosDeFAI::register_account(account);
    }
}

