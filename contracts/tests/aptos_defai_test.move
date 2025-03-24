module aptos_defai::test {
    use aptos_framework::signer;
    use aptos_defai::AptosDeFAI;

    fun test_register() {
        let account = @0x1;
        AptosDeFAI::register_account(&account);
    }
}

