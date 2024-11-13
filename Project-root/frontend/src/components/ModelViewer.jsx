import React, { useEffect } from 'react';
import '@google/model-viewer';

function ModelViewer({ modelUrl, imageUrl, title }) {
  useEffect(() => {
    // Check if the custom element <model-viewer> is defined
    if (!window.customElements.get('model-viewer')) {
      console.warn("ModelViewer: '@google/model-viewer' not loaded correctly.");
    }
  }, []);

  // Ensure model URL is correctly set as a root-relative path
  const validModelUrl = modelUrl.startsWith('/') ? modelUrl : `/models/${modelUrl}`;

  return (
    <div className="model-viewer">
      {modelUrl ? (
        <model-viewer
          src={validModelUrl}                        // Directly uses the .glb path without JSON parsing
          ios-src={validModelUrl.replace('.glb', '.usdz')} // Optional: If a USDZ model exists for iOS
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
