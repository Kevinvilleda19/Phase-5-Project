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
          src={modelUrl} // Ensure this path is correct
          ios-src={modelUrl.replace('.glb', '.usdz')} // Optional: only if a USDZ file exists
          alt={title}
          ar
          ar-modes="webxr scene-viewer quick-look"
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
