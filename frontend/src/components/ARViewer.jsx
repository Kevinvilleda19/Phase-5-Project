import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// Load the model
function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} />;
}

// Main AR Viewer component
function ARViewer({ modelPath }) {
  // Initialize AR on component mount
  useEffect(() => {
    // Check if AR.js is available
    if (!window.AR) {
      console.error("AR.js not available");
      return;
    }

    // Create the AR scene when the component mounts
    const scene = document.createElement('a-scene');
    scene.setAttribute('embedded', '');
    scene.setAttribute('arjs', '');

    const marker = document.createElement('a-marker');
    marker.setAttribute('preset', 'hiro'); // You can use different markers

    const entity = document.createElement('a-entity');
    entity.setAttribute('gltf-model', modelPath);
    entity.setAttribute('scale', '0.1 0.1 0.1'); // Adjust scale if necessary

    marker.appendChild(entity);
    scene.appendChild(marker);
    document.body.appendChild(scene);

    // Clean up on unmount
    return () => {
      document.body.removeChild(scene);
    };
  }, [modelPath]);

  return (
    <div>
      <h2>AR Viewer</h2>
      <p>Point your camera to the marker to view the model in AR.</p>
      <Canvas style={{ width: "100%", height: "400px" }}>
        <ambientLight intensity={0.5} />
        <OrbitControls />
        <Model modelPath={modelPath} />
      </Canvas>
    </div>
  );
}

export default ARViewer;
