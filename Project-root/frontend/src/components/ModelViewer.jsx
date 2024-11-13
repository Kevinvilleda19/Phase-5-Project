import React, { useEffect } from 'react';
import '@google/model-viewer';

function ModelViewer({ modelUrl, imageUrl, title }) {
  useEffect(() => {
    if (!window.customElements.get('model-viewer')) {
      console.warn("ModelViewer: '@google/model-viewer' not loaded correctly.");
    }
  }, []);

  // Ensure the model URL is correct
  const validModelUrl = modelUrl.startsWith('/') ? modelUrl : `/models/${modelUrl}`;

  return (
    <div className="model-viewer">
      {modelUrl ? (
        <model-viewer
          src={validModelUrl}
          ios-src={validModelUrl.replace('.glb', '.usdz')} // Optional if you have a .usdz file for iOS
          alt={title}
          ar
          ar-modes="webxr scene-viewer quick-look"
          auto-rotate
          camera-controls
          style={{ width: '100%', height: '400px' }}
          onError={() => console.error('Failed to load the model:', validModelUrl)}
        ></model-viewer>
      ) : (
        <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%' }} />
      )}
    </div>
  );
}

export default ModelViewer;
