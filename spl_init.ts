import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import * as fs from 'fs';

(async () => {
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    const secret = JSON.parse(fs.readFileSync('wallet.json', 'utf8'));
    const payer = Keypair.fromSecretKey(new Uint8Array(secret));

    const mint = await createMint(connection, payer, payer.publicKey, null, 9);

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint,
        payer.publicKey
    );

    fs.writeFileSync('mint.json', JSON.stringify({ mint: mint.toString(), tokenAccount: tokenAccount.address.toString() }));
    console.log('Token mint and account created.');
})();
