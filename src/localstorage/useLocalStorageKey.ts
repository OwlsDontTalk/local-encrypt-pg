import CryptoJS from 'crypto-js';

const secretPassphrase = 'passphrase';

const useLocalStorageKey = () => {
    const saveKey = (key: string) => {
        const encryptedKey = CryptoJS.AES.encrypt(key, secretPassphrase).toString();
        localStorage.setItem('apiKey', encryptedKey);
    };

    const loadKey = () => {
        const encryptedKey = localStorage.getItem('apiKey');
        if (encryptedKey) {
            const decryptedKey = CryptoJS.AES.decrypt(encryptedKey, secretPassphrase).toString(CryptoJS.enc.Utf8);
            alert(`Decrypted API Key: ${decryptedKey}`);
        } else {
            alert('No API Key found');
        }
    };

    return { saveKey, loadKey };
};

export default useLocalStorageKey;
