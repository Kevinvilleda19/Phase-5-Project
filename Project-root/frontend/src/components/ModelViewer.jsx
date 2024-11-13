import React, { useEffect, useState } from 'react';
import '@google/model-viewer';

function ModelViewer({ modelUrl, imageUrl, title }) {
  const [isModelAccessible, setIsModelAccessible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Perform a HEAD request to verify if the model file is accessible
    fetch(modelUrl, { method: 'HEAD' })
      .then((response) => {
        if (!response.ok) {
          console.error(`Model file not found at ${modelUrl}. Response: ${response.statusText}`);
          setIsModelAccessible(false);
        } else {
          console.log(`Model file is accessible at ${modelUrl}.`);
        }
      })
      .catch((error) => {
        console.error('Error accessing model file:', error);
        setIsModelAccessible(false);
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false after the fetch is complete
      });
  }, [modelUrl]);

  return (
    <div className="model-viewer">
      {isLoading ? (
        <p>Loading model...</p> // Show loading message while fetching
      ) : isModelAccessible ? (
        <model-viewer
          src={modelUrl} // Ensure this points to a valid .glb file
          ios-src={modelUrl.replace('.glb', '.usdz')} // Optional for iOS AR compatibility if a .usdz file exists
          alt={title}
          ar
          ar-modes="webxr scene-viewer quick-look"
          auto-rotate
          camera-controls
          style={{ width: '100%', height: '400px' }}
          onError={(error) => {
            console.error('Failed to load the model:', error);
            setIsModelAccessible(false);
          }}
        ></model-viewer>
      ) : (
        <div style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <p>Model not available</p> {/* Display when the model is inaccessible */}
        </div>
      )}
    </div>
  );
}

export default ModelViewer;
