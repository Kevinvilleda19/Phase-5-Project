import React from 'react';
import '@google/model-viewer';

function ModelViewer({ modelUrl, imageUrl, title }) {
  return (
    <div className="model-viewer">
      {modelUrl ? (
        <model-viewer
          src={modelUrl}
          alt={title}
          ar
          auto-rotate
          camera-controls
          style={{ width: '100%', height: '400px' }}
        ></model-viewer>
      ) : (
        <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%' }} />
      )}
    </div>
  );
}

export default ModelViewer;
