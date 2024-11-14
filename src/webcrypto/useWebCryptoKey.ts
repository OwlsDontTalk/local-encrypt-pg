const useWebCryptoKey = () => {
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const saveKey = async (key: string) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(key);
        const cryptoKey = await window.crypto.subtle.generateKey(
            { name: 'AES-GCM', length: 256 },
            true,
            ['encrypt', 'decrypt']
        );
        const encryptedData = await window.crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            cryptoKey,
            data
        );
        // @ts-ignore
        localStorage.setItem('apiKey', btoa(String.fromCharCode(...new Uint8Array(encryptedData))));
    };

    const loadKey = async () => {
        const encryptedKey = localStorage.getItem('apiKey');
        if (encryptedKey) {
            const binaryKey = atob(encryptedKey).split('').map((char) => char.charCodeAt(0));
            const cryptoKey = await window.crypto.subtle.generateKey(
                { name: 'AES-GCM', length: 256 },
                true,
                ['encrypt', 'decrypt']
            );
            const decryptedData = await window.crypto.subtle.decrypt(
                { name: 'AES-GCM', iv },
                cryptoKey,
                new Uint8Array(binaryKey)
            );
            const decoder = new TextDecoder();
            alert(`Decrypted API Key: ${decoder.decode(decryptedData)}`);
        } else {
            alert('No API Key found');
        }
    };

    return { saveKey, loadKey };
};

export default useWebCryptoKey;
