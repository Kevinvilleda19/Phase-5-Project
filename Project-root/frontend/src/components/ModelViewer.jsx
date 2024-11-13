import React, { useEffect } from 'react';
import '@google/model-viewer';

function ModelViewer({ modelUrl, imageUrl, title }) {
  useEffect(() => {
    if (!window.customElements.get('model-viewer')) {
      console.warn("ModelViewer: '@google/model-viewer' is not loaded correctly.");
    }
  }, []);

  // Make sure the model URL is accessible and correctly referenced
  const validModelUrl = modelUrl.startsWith('/') ? modelUrl : `/${modelUrl}`;

  return (
    <div className="model-viewer">
      {modelUrl ? (
        <model-viewer
          src={validModelUrl}                   // Corrected path for model file
          ios-src={validModelUrl.replace('.glb', '.usdz')} // Optional for iOS AR compatibility if .usdz file exists
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
