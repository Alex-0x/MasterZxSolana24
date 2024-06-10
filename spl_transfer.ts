import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount, transfer } from '@solana/spl-token';
import * as fs from 'fs';

// Carica il wallet di chi invia la transazione
const payerSecret = JSON.parse(fs.readFileSync('wallet.json', 'utf8'));
const payer = Keypair.fromSecretKey(new Uint8Array(payerSecret));
console.log('Payer loaded:', payer.publicKey.toBase58());

// Carica il nuovo wallet
const newWalletSecret = JSON.parse(fs.readFileSync('new_wallet.json', 'utf8'));
const newWallet = Keypair.fromSecretKey(new Uint8Array(newWalletSecret));
console.log('New wallet loaded:', newWallet.publicKey.toBase58());

// Creo una nuova connessione con il cluster di devnet di Solana
const connection = new Connection('https://api.devnet.solana.com', 'finalized');
console.log('Connection to devnet established');

// Carica il mint e l'account del token dal file JSON
const mintData = JSON.parse(fs.readFileSync('mint.json', 'utf8'));
const mint = new PublicKey(mintData.mint);
console.log('Mint loaded:', mint.toBase58());

// Ottiengo l'account del token del pagatore
const payerTokenAccount = new PublicKey(mintData.tokenAccount);
console.log('Payer token account:', payerTokenAccount.toBase58());

(async () => {
    try {
        // Crea o ottiene l'account del token associato per il destinatario
        const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mint,
            newWallet.publicKey
        );
        console.log('Recipient token account:', recipientTokenAccount.address.toBase58());

        // token transfer
        console.log('Initiating token transfer...');
        const signature = await transfer(
            connection,
            payer,
            payerTokenAccount,
            recipientTokenAccount.address,
            payer.publicKey,
            500 
        );
        console.log(`Transferred 500 tokens. Transaction signature: ${signature}`);
    } catch (error) {
        console.error('Error during transfer:', error);
    }
})();
