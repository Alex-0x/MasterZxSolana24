import { Keypair } from '@solana/web3.js';
import * as fs from 'fs';

(async () => {
    const keypair = Keypair.generate();
    const secretKey = `[${keypair.secretKey.toString()}]`;

    fs.writeFileSync('wallet.json', secretKey);
    console.log('Wallet created and saved to wallet.json');
})();
