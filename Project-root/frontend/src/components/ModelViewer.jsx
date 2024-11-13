import React, { useEffect, useState } from 'react';

const ModelViewer = ({ modelUrl, imageUrl, title }) => {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const model = document.querySelector('model-viewer');
    if (model) {
      model.addEventListener('error', () => {
        setError('Failed to load the model.');
      });
      model.addEventListener('load', () => {
        setIsModelLoaded(true);
      });
    }
  }, []);

  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      <model-viewer
        src={modelUrl}
        ios-src={modelUrl.replace('.glb', '.usdz')}
        alt={title}
        ar
        ar-modes="webxr scene-viewer quick-look"
        auto-rotate
        camera-controls
        style={{ width: '100%', height: '400px' }}
      >
        <img slot="poster" src={imageUrl} alt={title} />
      </model-viewer>
      {!isModelLoaded && <p>Loading model...</p>}
    </div>
  );
};

export default ModelViewer;