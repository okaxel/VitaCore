import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { Transaction } from '@mysten/sui/transactions';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

// 1. Initialize Sui Client (Testnet used for demonstration)
const client = new SuiClient({ url: getFullnodeUrl('testnet') });

// 2. Load your wallet keypair from environment variables
// Ensure your .env file has: SUI_PRIVATE_KEY="your_secret_key_phrase_or_hex"
const secretKey = process.env.SUI_PRIVATE_KEY;
if (!secretKey) {
    throw new Error("Please configure SUI_PRIVATE_KEY in your .env file.");
}
const keypair = Ed25519Keypair.fromSecretKey(secretKey);

// Define Walrus publisher endpoint (Deales with heavy blob storage)
const WALRUS_PUBLISHER = "https://walrus.space"; 

async function storeMRIImage(filePath) {
    try {
        console.log(`Reading MRI image from: ${filePath}...`);
        const fileBuffer = fs.readFileSync(filePath);
        
        // 3. Upload the heavy MRI binary to the Walrus Storage Network
        console.log("Uploading blob to Walrus decentralized storage...");
        const response = await fetch(`${WALRUS_PUBLISHER}/v1/store?epochs=5`, {
            method: 'PUT',
            body: fileBuffer,
            headers: { 'Content-Type': 'image/dicom' } // or 'image/png' depending on your format
        });

        if (!response.ok) {
            throw new Error(`Walrus upload failed: ${response.statusText}`);
        }

        const storageResult = await response.json();
        // This blobId is the permanent, cryptographic hash of your MRI image
        const blobId = storageResult.newlyCreated.blobObject.blobId;
        console.log(`Blob successfully stored! ID: ${blobId}`);

        // 4. Create an on-chain anchor transaction on Sui
        console.log("Creating on-chain metadata anchor on Sui...");
        const tx = new Transaction();

        // Target an existing ecosystem package or standard NFT minting contract
        // For demonstration, we simulate creating a custom medical record object
        const PACKAGE_ID = "0xYOUR_DEPLOYED_MEDICAL_PACKAGE_ID"; 
        
        tx.moveCall({
            target: `${PACKAGE_ID}::mri_record::mint_record`,
            arguments: [
                tx.pure.string("Patient_ID_8832"), // Patient identifier
                tx.pure.string(blobId),            // Storage pointer to the MRI image
                tx.pure.string("Brain MRI Scan")   // Description
            ],
        });

        // 5. Sign and execute the transaction
        const txResult = await client.signAndExecuteTransaction({
            signer: keypair,
            transaction: tx,
            options: { showEffects: true }
        });

        console.log(`Sui Transaction success! Digest: ${txResult.digest}`);
        console.log(`Your MRI is now securely linked to the Sui ledger.`);

    } catch (error) {
        console.error("Execution failed:", error);
    }
}

// Execute the process with your file path
const mriFilePath = path.resolve('./mri_scans/brain_scan.dcm');
storeMRIImage(mriFilePath);

// Add your specific Admin Capability Object ID after deploying your contract
const ADMIN_CAP_OBJECT_ID = "0xYOUR_ADMIN_CAPABILITY_OBJECT_ID"; 
const RECIPIENT_ADDRESS = "0xPATIENT_OR_CLINIC_SUI_ADDRESS";

tx.moveCall({
    target: `${PACKAGE_ID}::mri_record::mint_record`,
    arguments: [
        tx.object(ADMIN_CAP_OBJECT_ID),             // Pass AdminCap object reference
        tx.pure.string("Patient_ID_8832"),          // Patient identifier
        tx.pure.string(blobId),                     // Walrus storage pointer
        tx.pure.string("Brain MRI Scan"),            // Description
        tx.pure.u64(Date.now()),                    // Timestamp in milliseconds
        tx.pure.address(RECIPIENT_ADDRESS)          // Target owner of the record
    ],
});

/*

sui client publish --gas-budget 50000000

*/