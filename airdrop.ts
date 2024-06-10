import { Connection, LAMPORTS_PER_SOL, Keypair } from '@solana/web3.js';
import * as fs from 'fs';

(async () => {
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    const secret = JSON.parse(fs.readFileSync('wallet.json', 'utf8'));
    const keypair = Keypair.fromSecretKey(new Uint8Array(secret));

    const airdropSignature = await connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);
    await connection.confirmTransaction(airdropSignature);

    console.log('Airdrop successful. 2 SOL credited.');
})();
