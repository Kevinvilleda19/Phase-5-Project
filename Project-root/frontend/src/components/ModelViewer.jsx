import React, { useEffect, useState } from 'react';
import '@google/model-viewer';

function ModelViewer({ modelUrl, imageUrl, title }) {
  const [isModelAccessible, setIsModelAccessible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Perform a HEAD request to check if the model file is accessible
    fetch(modelUrl, { method: 'HEAD' })
      .then((response) => {
        if (!response.ok) {
          setIsModelAccessible(false);
        }
      })
      .catch(() => {
        setIsModelAccessible(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [modelUrl]);

  return (
    <div className="model-viewer">
      {isLoading ? (
        <p>Loading model...</p>
      ) : isModelAccessible ? (
        <model-viewer
          src={modelUrl}
          ios-src={modelUrl.replace('.glb', '.usdz')}
          alt={title}
          ar
          ar-modes="webxr scene-viewer quick-look"
          auto-rotate
          camera-controls
          style={{ width: '100%', height: '400px' }}
          onError={() => setIsModelAccessible(false)}
        ></model-viewer>
      ) : (
        <div style={{ width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <p>Model not available</p>
        </div>
      )}
    </div>
  );
}

export default ModelViewer;
