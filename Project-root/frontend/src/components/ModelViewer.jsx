import React from 'react';
import '@google/model-viewer';

function ModelViewer({ modelUrl, imageUrl, title }) {
  return (
    <div className="model-viewer">
      <model-viewer
        src={modelUrl}
        ios-src={modelUrl.replace('.glb', '.usdz')}
        alt={title}
        ar
        ar-modes="webxr scene-viewer quick-look"
        auto-rotate
        camera-controls
        style={{ width: '100%', height: '400px' }}
        onError={(error) => console.error("Model viewer error:", error)}
      ></model-viewer>
    </div>
  );
}

export default ModelViewer;
