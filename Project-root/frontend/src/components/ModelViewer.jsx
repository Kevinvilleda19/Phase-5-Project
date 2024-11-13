import React, { useEffect, useState } from 'react';
import '@google/model-viewer';

function ModelViewer({ modelUrl, imageUrl, title }) {
  const [isModelLoaded, setIsModelLoaded] = useState(true);

  useEffect(() => {
    if (!window.customElements.get('model-viewer')) {
      console.warn("ModelViewer: '@google/model-viewer' not loaded correctly.");
    }

    // Test the URL by attempting to load it as a HEAD request to verify accessibility
    fetch(modelUrl, { method: 'HEAD' })
      .then((response) => {
        if (!response.ok) {
          console.error(`Model file not found at ${modelUrl}. Response: ${response.statusText}`);
          setIsModelLoaded(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching model file:', error);
        setIsModelLoaded(false);
      });
  }, [modelUrl]);

  const validModelUrl = modelUrl.startsWith('/') ? modelUrl : `/${modelUrl}`;

  return (
    <div className="model-viewer">
      {isModelLoaded ? (
        <model-viewer
          src={validModelUrl}
          ios-src={validModelUrl.replace('.glb', '.usdz')} // Optional for iOS if USDZ exists
          alt={title}
          ar
          ar-modes="webxr scene-viewer quick-look"
          auto-rotate
          camera-controls
          style={{ width: '100%', height: '400px' }}
          onError={(e) => {
            console.error('Failed to load the model:', validModelUrl, e);
            setIsModelLoaded(false); // Fallback to the image if the model fails
          }}
        ></model-viewer>
      ) : (
        <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%' }} />
      )}
    </div>
  );
}

export default ModelViewer;
