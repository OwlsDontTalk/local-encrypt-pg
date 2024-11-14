import React, { useState } from 'react';
import useWebCryptoKey from './useWebCryptoKey';

const App: React.FC = () => {
    const [inputKey, setInputKey] = useState('');
    const { saveKey, loadKey } = useWebCryptoKey();

    return (
        <div>
            <input
                type="text"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="Enter API Key"
            />
            <button onClick={() => saveKey(inputKey)}>Save Key</button>
            <button onClick={loadKey}>Load Key</button>
        </div>
    );
};

export default App;
