import React, { useEffect, useState } from 'react';
import '@google/model-viewer';

function ModelViewer({ modelUrl, imageUrl, title }) {
  const [isModelAccessible, setIsModelAccessible] = useState(true);

  useEffect(() => {
    // Check if the model URL is accessible before loading it
    fetch(modelUrl, { method: 'HEAD' })
      .then((response) => {
        if (!response.ok) {
          console.error(`Model file not found at ${modelUrl}. Response: ${response.statusText}`);
          setIsModelAccessible(false);
        }
      })
      .catch((error) => {
        console.error('Error accessing model file:', error);
        setIsModelAccessible(false);
      });
  }, [modelUrl]);

  return (
    <div className="model-viewer">
      {isModelAccessible ? (
        <model-viewer
          src={modelUrl} // Make sure this points to a valid .glb file in the public directory
          ios-src={modelUrl.replace('.glb', '.usdz')} // Optional for iOS AR compatibility if a .usdz file exists
          alt={title}
          ar
          ar-modes="webxr scene-viewer quick-look"
          auto-rotate
          camera-controls
          style={{ width: '100%', height: '400px' }}
          onError={() => {
            console.error('Failed to load the model:', modelUrl);
            setIsModelAccessible(false);
          }}
        ></model-viewer>
      ) : (
        <div style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%' }} />
          <p>Model not available</p> {/* This will display when the model is inaccessible */}
        </div>
      )}
    </div>
  );
}

export default ModelViewer;
