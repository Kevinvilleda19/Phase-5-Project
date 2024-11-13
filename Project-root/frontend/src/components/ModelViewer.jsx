import React, { useEffect } from 'react';
import '@google/model-viewer';

function ModelViewer({ modelUrl, imageUrl, title }) {
  useEffect(() => {
    if (!window.customElements.get('model-viewer')) {
      console.warn("ModelViewer: '@google/model-viewer' not loaded correctly.");
    }
  }, []);

  // Ensures a root-relative path to avoid 404 errors
  const validModelUrl = modelUrl.startsWith('/') ? modelUrl : `/${modelUrl}`;

  return (
    <div className="model-viewer">
      {modelUrl ? (
        <model-viewer
          src={validModelUrl} // Use modelUrl or validModelUrl here instead of modelFileName
          ios-src={validModelUrl.replace('.glb', '.usdz')} // Optional for iOS if USDZ exists
          alt={title}
          ar
          ar-modes="webxr scene-viewer quick-look"
          auto-rotate
          camera-controls
          style={{ width: '100%', height: '400px' }}
          onError={(e) => console.error('Failed to load the model:', validModelUrl, e)}
        ></model-viewer>
      ) : (
        <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%' }} />
      )}
    </div>
  );
}

export default ModelViewer;
