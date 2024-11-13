import React, { useEffect } from 'react';
import '@google/model-viewer';

function ModelViewer({ modelUrl, imageUrl, title }) {
  useEffect(() => {
    if (!window.customElements.get('model-viewer')) {
      console.warn("ModelViewer: '@google/model-viewer' not loaded correctly.");
    }
  }, []);

  return (
    <div className="model-viewer">
      {modelUrl ? (
        <model-viewer
          src={modelUrl}
          ios-src={modelUrl.replace('.glb', '.usdz')} // Optional: auto-convert path for iOS if you have a USDZ model
          alt={title}
          ar
          ar-modes="webxr scene-viewer quick-look" // Ensures compatibility across Android and iOS
          auto-rotate
          camera-controls
          style={{ width: '100%', height: '400px' }}
          onError={() => console.error('Failed to load the model:', modelUrl)}
        >
        </model-viewer>
      ) : (
        <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%' }} />
      )}
    </div>
  );
}

export default ModelViewer;
