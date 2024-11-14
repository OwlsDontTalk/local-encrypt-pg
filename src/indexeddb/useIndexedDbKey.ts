import { openDB } from 'idb';
import CryptoJS from 'crypto-js';

const secretPassphrase = 'passphrase';

const useIndexedDbKey = () => {
    const saveKey = async (key: string) => {
        const encryptedKey = CryptoJS.AES.encrypt(key, secretPassphrase).toString();
        const db = await openDB('apiKeysDB', 1, {
            upgrade(db) {
                db.createObjectStore('keys');
            },
        });
        await db.put('keys', encryptedKey, 'apiKey');
    };

    const loadKey = async () => {
        const db = await openDB('apiKeysDB', 1);
        const encryptedKey = await db.get('keys', 'apiKey');
        if (encryptedKey) {
            const decryptedKey = CryptoJS.AES.decrypt(encryptedKey, secretPassphrase).toString(CryptoJS.enc.Utf8);
            alert(`Decrypted API Key: ${decryptedKey}`);
        } else {
            alert('No API Key found');
        }
    };

    return { saveKey, loadKey };
};

export default useIndexedDbKey;
