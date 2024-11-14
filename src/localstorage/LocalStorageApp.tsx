import React, { useState } from 'react';
import useLocalStorageKey from './useLocalStorageKey';

const App: React.FC = () => {
    const [inputKey, setInputKey] = useState('');
    const { saveKey, loadKey } = useLocalStorageKey();

    return (
        <div>
            <input
                type="text"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="Enter Key"
            />
            <button onClick={() => saveKey(inputKey)}>Save Key</button>
            <button onClick={loadKey}>Load Key</button>
        </div>
    );
};

export default App;
