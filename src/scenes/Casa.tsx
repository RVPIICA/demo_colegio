import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { casa_sections } from '../util/sections'
import PNGMoveInteractive from '../Components/Three/PNGMoveInteractive'
//Videos
import casa_tipica from "../static/videos/casa_tipica.mp4";
import { IModalData } from '../util/interfaces'
import PNGVideoInteractive from '../Components/Three/PNGVideoInteractive'
import PNGVRVideoInteractive from '../Components/Three/PNGVRVideoInteractive'

export const CasaInterior:React.FC<{ onClick: (value:string)=>void }> = ({ onClick }) => {

  const texture = useLoader(TextureLoader, casa_sections.casa_interior)

    return (
        <group>
          <mesh>
            <sphereGeometry args={[500, 60, 40]} />
            <meshBasicMaterial map={ texture } side={THREE.BackSide} />
          </mesh>
          <PNGMoveInteractive text="Salir" onClick={() => onClick('casa_exterior')} position={[120, 0, 30]} rotation={4.4}/>
        </group>
    )
}

export const CasaExterior:React.FC<{ onClick: (value:string)=>void, setModalData: (modalData:IModalData) => void }> = ({ onClick, setModalData }) => {

  const modalDataArray:IModalData[] = [
    {
      title: 'Casa típica rural',
      videoUrl: casa_tipica
    }
  ]

  const texture = useLoader(TextureLoader, casa_sections.casa_exterior)

    return (
        <group>
          <mesh>
            <sphereGeometry args={[500, 60, 40]} />
            <meshBasicMaterial map={ texture } side={THREE.BackSide} />
          </mesh>
          <PNGVRVideoInteractive videoSize={[100,90]} videoTexture={modalDataArray[0].videoUrl} text={modalDataArray[0].title} rotation={1.6} position={[-80, 10, 10]} />
          <PNGMoveInteractive text="Regresar" onClick={() => onClick('overview_frente')} position={[-10, 20, 150]} rotation={2.9}/>
          <PNGMoveInteractive text="Visitar el Interior" onClick={() => onClick('casa_interior')} position={[-35, 0, -90]} rotation={0.4}/>
        </group>
    )
}