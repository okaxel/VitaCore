module VitaCore::mri_record {
    use std::string::{String};
    use sui::tx_context::{Self, TxContext};
    use sui::object::{Self, UID};
    use sui::transfer;

    /// The object that securely represents the MRI metadata on the Sui ledger
    public struct MriRecord has key, store {
        id: UID,
        patient_id: String,
        walrus_blob_id: String,
        description: String,
        timestamp: u64,
    }

    /// Admin capability allowing only the authorized medical node or professional to mint records
    public struct AdminCap has key, store {
        id: UID
    }

    /// Module initializer - runs once upon contract deployment
    fun init(ctx: &mut TxContext) {
        // Send the admin capability to the publisher of the contract
        transfer::transfer(
            AdminCap { id: object::new(ctx) }, 
            tx_context::sender(ctx)
        );
    }

    /// Mints a brand new MriRecord and transfers ownership to the patient or target address
    /// Requires the AdminCap to prevent unauthorized medical record creation
    public entry fun mint_record(
        _any_admin: &AdminCap,
        patient_id: String,
        walrus_blob_id: String,
        description: String,
        timestamp: u64,
        recipient: address,
        ctx: &mut TxContext
    ) {
        let record = MriRecord {
            id: object::new(ctx),
            patient_id,
            walrus_blob_id,
            description,
            timestamp,
        };

        // Securely transfers ownership of this medical record to the specified recipient
        transfer::public_transfer(record, recipient);
    }
}
