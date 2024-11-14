import React, { useState } from 'react';
import LocalStorageApp from './localstorage/LocalStorageApp';
import IndexedDbApp from './indexeddb/IndexedDbApp';
import WebCryptoApp from './webcrypto/WebCryptoApp';

const App: React.FC = () => {
  const [method, setMethod] = useState<'local' | 'indexed' | 'crypto'>('local');

  const renderApp = () => {
    switch (method) {
      case 'local':
        return <LocalStorageApp />;
      case 'indexed':
        return <IndexedDbApp />;
      case 'crypto':
        return <WebCryptoApp />;
      default:
        return null;
    }
  };

  return (
      <div>
        <h1>API Key Storage Example</h1>
        <div>
          <button onClick={() => setMethod('local')}>LocalStorage</button>
          <button onClick={() => setMethod('indexed')}>IndexedDB</button>
          <button onClick={() => setMethod('crypto')}>Web Crypto API</button>
        </div>
        {renderApp()}
      </div>
  );
};

export default App;
