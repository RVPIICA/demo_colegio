import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { casa_sections } from '../util/sections'
import PNGMoveInteractive from '../Components/Three/PNGMoveInteractive'
import PNGVRVideoInteractive from '../Components/Three/PNGVRVideoInteractive'

//Videos
import casa_tipica from "../static/videos/casa_tipica.mp4";

//Escena del interior de la casa. Incluye el punto para salir de la casa
export const CasaInterior: React.FC<{ onClick: (value: string) => void }> = ({ onClick }) => {

  //Asigno la imagen creada en el archivo sections.tsx
  const texture = useLoader(TextureLoader, casa_sections.casa_interior)
  //Retorno de la función. Notese el onClick del Move Interactive que me cambia la sección
  return (
    <group>
      <mesh>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      <PNGMoveInteractive text="Salir" onClick={() => onClick('casa_exterior')} position={[120, 0, 30]} rotation={4.4} />
    </group>
  )
}
//Exterior de la casa, igual que la escena del interior pero también tiene un video interactive
//Que me abre una pantalla con un video al momento de interactuar.
export const CasaExterior: React.FC<{ onClick: (value: string) => void, }> = ({ onClick }) => {

  const texture = useLoader(TextureLoader, casa_sections.casa_exterior)

  return (
    <group>
      <mesh>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      <PNGVRVideoInteractive videoSize={[100, 70]} videoTexture={casa_tipica} text={"Casa típica rural"} rotation={1.6} position={[-80, 10, 10]} />
      <PNGMoveInteractive text="Visitar el Interior" onClick={() => onClick('casa_interior')} position={[-35, 0, -90]} rotation={0.4} />
    </group>
  )
}