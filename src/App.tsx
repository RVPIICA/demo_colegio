import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Controllers, VRButton, XR } from '@react-three/xr'
import { Preload, OrbitControls } from '@react-three/drei'
import './App.scss';
import { Portal } from './Components/Three/Portal';
import Layout from './Layouts/Layout';


function App() {
  return (
    <>
      <Layout>
        <VRButton />
        <Canvas style={{zIndex:0}} frameloop="always" camera={{ fov: 70, position: [0, 0, 0.1], rotation: [0, 0, 0] }}>
          <XR>
            <Controllers rayMaterial={{color: 'blue'}} hideRaysOnBlur={false}/>
            <OrbitControls enableZoom={true} enablePan={false} enableDamping dampingFactor={0.2} autoRotate={false} rotateSpeed={-0.5} />
            <Suspense fallback={null}>
              <Preload all />
              <Portal />
            </Suspense>
          </XR>
        </Canvas>
      </Layout>
    </>
  );
}

export default App;
