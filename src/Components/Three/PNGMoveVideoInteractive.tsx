import { useLoader } from "@react-three/fiber"
import { Interactive } from "@react-three/xr"
import { useRef, useState } from "react"
import { TextureLoader } from "three"
import mapPinMarker from "../../static/icons/map-pin-marker.png"
import mapPinMarkerAlpha from "../../static/icons/map-pin-marker-alpha.png"
import movie from "../../static/icons/movie.png"
import { Html, Text } from '@react-three/drei'

import { useSpring, animated } from '@react-spring/three'

const PNGMoveVideoInteractive:React.FC<{ 
    onClickMove: ()=>void,
    setModalData: ()=>void,
    size?: number,
    position: [number, number, number],
    rotation?: number,
    text:string}> = ({ onClickMove, setModalData, position, size=10, rotation=5, text}) => {

        const buttonGroup = useRef<any>()
        const buttonMovement = useRef<any>()
        const buttonVideo = useRef<any>()

        const pinTexture = useLoader(TextureLoader, mapPinMarker)
        const pinTextureAlpha = useLoader(TextureLoader, mapPinMarkerAlpha)
        const movieTexture = useLoader(TextureLoader, movie)

        const [hover, setHover] = useState(false)
        const [active, setActive] = useState(0);

        const { spring } = useSpring({
            spring: active,
            config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 }
        })

        const iconScale = spring.to([0, 1], [0, 1])
        const positionY = spring.to([0, 1], [0, 15])
        const positionXPin = spring.to([0, 1], [0, 12])
        const positionXMovie = spring.to([0, 1], [0, -12])

        const { scale: pinScale } = useSpring({ scale: hover ? 1.2 : 1 })

        //const { position: groupPosition } = useSpring({ position: active ? {x:0, y:15, z:0} : {x:0, y:0, z:0} })
        //const { position: pinPosition } = useSpring({ position: active ? {x:12, y:0, z:0} : {x:0, y:0, z:0} })
        //const { position: moviePosition } = useSpring({ position: active ? {x:-12, y:0, z:0} : {x:0, y:0, z:0} })

        //const { scale: pinScale } = useSpring({ scale: active ? 1 : 0 })


        return (
            <Interactive onSelect={ () => setActive(Number(!active)) } onHover={() => setHover(true)} onBlur={() => setHover(false)}>
                <group ref={buttonGroup} position={position} rotation={[0,rotation,0]}>
                    <animated.group position={[0, 0, 0]} position-y={positionY}>
                        <animated.mesh ref={buttonMovement} scale={iconScale} position={[0,0,0]} position-x={positionXPin}>
                            <planeGeometry args={[size, size]} />                    
                            <meshBasicMaterial map={ pinTexture } alphaMap={pinTextureAlpha} transparent={true}/>
                            <Html center>
                                <div style={{width:"50px", height:"50px", cursor:"pointer", display: active ? "block" : "none"}} onMouseLeave={() => setHover(false)} onMouseOver={() => setHover(true)} onClick={() => onClickMove()}></div>
                            </Html>
                        </animated.mesh >
                        <animated.mesh ref={buttonVideo} scale={iconScale} position={[0,0,0]} position-x={positionXMovie}>
                            <planeGeometry args={[size, size]} />                    
                            <meshBasicMaterial map={ movieTexture } alphaMap={pinTextureAlpha} transparent={true}/>
                            <Html center>
                                <div style={{width:"50px", height:"50px", cursor:"pointer", display: active ? "block" : "none"}} onMouseLeave={() => setHover(false)} onMouseOver={() => setHover(true)} onClick={() => setModalData()}></div>
                            </Html>
                        </animated.mesh>
                    </animated.group>
                    <animated.mesh  scale={pinScale}>
                        <planeGeometry args={[size, size]} />                    
                        <meshBasicMaterial map={ pinTexture } alphaMap={pinTextureAlpha} transparent={true}/>
                        <Html center>
                            <div style={{width:"40px", height:"40px", cursor:"pointer"}} onMouseLeave={() => setHover(false)} onMouseOver={() => setHover(true)} onClick={() => { setActive(Number(!active)) }}></div>
                        </Html>
                    </animated.mesh>
                    <mesh position={[0,-12,0]} scale={[1,1,1]}>    
                        <Text color="black" 
                        anchorX="center" 
                        anchorY="middle" 
                        letterSpacing={0.02}
                        fontSize={hover ? 5 : 4}
                        position={[0, 0, 5]}
                        outlineWidth={1}
                        outlineColor="#ffffff"
                        matrixWorldAutoUpdate={undefined} getObjectsByProperty={undefined} getVertexPosition={undefined}>
                            {text}
                        </Text>
                    </mesh>
                </group>
            </Interactive>
        )
}

export default PNGMoveVideoInteractive