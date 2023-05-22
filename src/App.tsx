import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { XR } from '@react-three/xr'
import { Preload, OrbitControls } from '@react-three/drei'
import './App.scss';
import { Portal } from './Components/Three/Portal';
import Layout from './Layouts/Layout';
import InfoModal from './Components/Web/InfoModal';
import { IModalData } from "./util/interfaces";


function App() {
  const [modalData, setModalData] = useState<IModalData|undefined>()
  return (
    <>
      <Layout>
        <InfoModal info={modalData} setModalData={setModalData}/>
        <Canvas style={{zIndex:0}} frameloop="always" camera={{ fov: 70, position: [0, 0, 0.1], rotation: [0, 0, 0] }}>
          <XR>
            <OrbitControls enableZoom={true} enablePan={false} enableDamping dampingFactor={0.2} autoRotate={false} rotateSpeed={-0.5} />
            <Suspense fallback={null}>
              <Preload all />
              <Portal setModalData={setModalData}/>
            </Suspense>
          </XR>
        </Canvas>
      </Layout>
    </>
  );
}

export default App;
