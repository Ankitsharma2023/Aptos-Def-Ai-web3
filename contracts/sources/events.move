module aptos_defai::events {
    use aptos_framework::event;

    struct EventLog has key {
        event_data: vector<u8>,
    }

    public entry fun log_event(data: vector<u8>) {
        let event = EventLog { event_data: data };
        event::emit(&event);
    }
}

