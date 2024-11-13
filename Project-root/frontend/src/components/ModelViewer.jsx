import React, { useEffect, useState } from 'react';
import '@google/model-viewer';

function ModelViewer({ modelUrl, imageUrl, title }) {
  const [isModelLoaded, setIsModelLoaded] = useState(true);

  useEffect(() => {
    // Validate URL by checking if it’s accessible
    fetch(modelUrl, { method: 'HEAD' })
      .then((response) => {
        if (!response.ok) {
          console.error(`Model file not found at ${modelUrl}. Response: ${response.statusText}`);
          setIsModelLoaded(false);
        }
      })
      .catch((error) => {
        console.error('Error accessing model file:', error);
        setIsModelLoaded(false);
      });
  }, [modelUrl]);

  return (
    <div className="model-viewer">
      {isModelLoaded ? (
        <model-viewer
          src={modelUrl}
          ios-src={modelUrl.replace('.glb', '.usdz')} // Optional for iOS
          alt={title}
          ar
          ar-modes="webxr scene-viewer quick-look"
          auto-rotate
          camera-controls
          style={{ width: '100%', height: '400px' }}
          onError={(e) => {
            console.error('Failed to load the model:', modelUrl, e);
            setIsModelLoaded(false);
          }}
        ></model-viewer>
      ) : (
        <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%' }} />
      )}
    </div>
  );
}

export default ModelViewer;
