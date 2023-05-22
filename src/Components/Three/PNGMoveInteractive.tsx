import { useLoader } from "@react-three/fiber"
import { Interactive } from "@react-three/xr"
import { useState } from "react"
import { TextureLoader } from "three"
import mapPinMarker from "../../static/icons/map-pin-marker.png"
import mapPinMarkerAlpha from "../../static/icons/map-pin-marker-alpha.png"
import { Html, Text } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'

const PNGMoveInteractive:React.FC<{ 
    onClick: ()=>void,
    size?: number,
    position: [number, number, number],
    rotation?: number,
    text:string}> = ({ onClick, position, size=10, rotation=5, text}) => {

        const pinTexture = useLoader(TextureLoader, mapPinMarker)
        const pinTextureAlpha = useLoader(TextureLoader, mapPinMarkerAlpha)

        const [hover, setHover] = useState(false)

        const { scale: pinScale } = useSpring({ scale: hover ? 1.2 : 1 })

        return (
            <Interactive onSelect={ () => onClick() } onHover={() => setHover(true)} onBlur={() => setHover(false)}>
                <group position={position} rotation={[0,rotation,0]}>
                    <animated.mesh  scale={pinScale}>
                        <planeGeometry args={[size, size]} />                    
                        <meshBasicMaterial map={ pinTexture } alphaMap={pinTextureAlpha} transparent={true}/>
                        <Html center>
                            <div style={{width:"40px", height:"40px", cursor:"pointer"}} onMouseLeave={() => setHover(false)} onMouseOver={() => setHover(true)} onClick={() => onClick()}></div>
                        </Html>
                    </animated.mesh>
                    <mesh position={[0,-12,0]} scale={[1,1,1]}>    
                        <Text color="black" 
                        anchorX="center" 
                        anchorY="middle" 
                        letterSpacing={0.02}
                        fontSize={4}
                        position={[0, 0, 5]}
                        outlineWidth={1}
                        outlineColor="#ffffff"
                        matrixWorldAutoUpdate={undefined} getObjectsByProperty={undefined} getVertexPosition={undefined}>
                            {text}
                        </Text>
                        <Html center>
                            <div style={{width:"100px", height:"40px", cursor:"pointer"}} onMouseLeave={() => setHover(false)} onMouseOver={() => setHover(true)} onClick={() => onClick()}></div>
                        </Html>
                    </mesh>
                </group>
            </Interactive>
        )
}

export default PNGMoveInteractive