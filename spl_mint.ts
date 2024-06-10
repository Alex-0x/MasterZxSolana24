import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { mintTo } from '@solana/spl-token';
import * as fs from 'fs';

(async () => {
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    const secret = JSON.parse(fs.readFileSync('wallet.json', 'utf8'));
    const payer = Keypair.fromSecretKey(new Uint8Array(secret));

    const mintData = JSON.parse(fs.readFileSync('mint.json', 'utf8'));
    const mint = new PublicKey(mintData.mint);
    const tokenAccount = new PublicKey(mintData.tokenAccount);

    const signature = await mintTo(connection, payer, mint, tokenAccount, payer, 1000);
    console.log(`Minted 1000 tokens. Transaction signature: ${signature}`);
})();
