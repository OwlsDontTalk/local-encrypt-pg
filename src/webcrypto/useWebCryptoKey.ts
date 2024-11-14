const iv = window.crypto.getRandomValues(new Uint8Array(12));
let cryptoKey: CryptoKey | null = null;

const useWebCryptoKey = () => {
    const saveKey = async (key: string) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(key);

        cryptoKey = await window.crypto.subtle.generateKey(
            { name: 'AES-GCM', length: 256 },
            true,
            ['encrypt', 'decrypt']
        );

        const encryptedData = await window.crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            cryptoKey,
            data
        );

        const encryptedArray = new Uint8Array(encryptedData);
        const encryptedString = btoa(String.fromCharCode.apply(null, Array.from(iv).concat(Array.from(encryptedArray))));

        localStorage.setItem('apiKey', encryptedString);
    };

    const loadKey = async () => {
        const storedData = localStorage.getItem('apiKey');
        if (storedData) {
            const dataArray = Uint8Array.from(atob(storedData), char => char.charCodeAt(0));
            const iv = dataArray.slice(0, 12);
            const encryptedArray = dataArray.slice(12);

            if (!cryptoKey) {
                cryptoKey = await window.crypto.subtle.generateKey(
                    { name: 'AES-GCM', length: 256 },
                    true,
                    ['encrypt', 'decrypt']
                );
            }

            try {
                const decryptedData = await window.crypto.subtle.decrypt(
                    { name: 'AES-GCM', iv },
                    cryptoKey,
                    encryptedArray
                );

                const decoder = new TextDecoder();
                alert(`Decrypted Key: ${decoder.decode(decryptedData)}`);
            } catch (error) {
                console.error('Decryption failed:', error);
            }
        } else {
            alert('No Key found');
        }
    };

    return { saveKey, loadKey };
};

export default useWebCryptoKey;
