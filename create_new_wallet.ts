import { Keypair } from '@solana/web3.js';
import * as fs from 'fs';

(async () => {
    const newWallet = Keypair.generate();
    const secretKey = `[${newWallet.secretKey.toString()}]`;

    fs.writeFileSync('new_wallet.json', secretKey);
    console.log('New wallet created and saved to new_wallet.json');
})();
