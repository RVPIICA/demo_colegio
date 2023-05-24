import { useLoader } from "@react-three/fiber"
import { Interactive } from "@react-three/xr"
import { useEffect, useState } from "react"
import { TextureLoader } from "three"
import movie from "../../static/icons/movie.png"
import mapPinMarkerAlpha from "../../static/icons/map-pin-marker-alpha.png"
import { Html, Text } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import Video from "./Video"

const PNGVRVideoInteractive:React.FC<{
    size?: number,
    videoSize: [number, number],
    position: [number, number, number],
    rotation?: number,
    text:string,
    videoTexture:string|undefined}> = ({ position, size=10, rotation=5, text, videoSize, videoTexture }) => {

        const pinTextureAlpha = useLoader(TextureLoader, mapPinMarkerAlpha)
        const movieTexture = useLoader(TextureLoader, movie)

        const [video, setVideo] = useState<HTMLVideoElement|undefined>(undefined)

        const [hover, setHover] = useState(false)

        const { scale: pinScale } = useSpring({ scale: hover ? 1.2 : 1 })
        const [showVideo, setShowVideo] = useState(false)

        const onIconClick = () => {
            if(!showVideo){
                setShowVideo(true)
                video!.play()
                return
            }

            setShowVideo(false)
        }

        useEffect(() => {
            if(videoTexture) {
                const vid = document.createElement("video");
                vid.src = videoTexture ? videoTexture : "";
                vid.crossOrigin = "Anonymous";
                vid.loop = false;
                vid.muted = false;
                vid.autoplay = false
                setVideo(vid)
            }
        }, [videoTexture])
        
        return (            
                <group position={position} rotation={[0,rotation,0]}>        
                    <Video hidden={showVideo} hideVideo={() => setShowVideo(false)} size={videoSize} video={video} />    
                    <Interactive onSelect={ () => onIconClick() } onHover={() => setHover(true)} onBlur={() => setHover(false)}>
                        <animated.mesh  scale={pinScale}>
                            <planeGeometry args={[size, size]} />                    
                            <meshBasicMaterial map={ movieTexture } alphaMap={pinTextureAlpha} transparent={true}/>
                            <Html center>
                                <div style={{width:"40px", height:"40px", cursor:"pointer"}} onMouseLeave={() => setHover(false)} onMouseOver={() => setHover(true)} onClick={() => onIconClick()}></div>
                            </Html>
                        </animated.mesh>
                    </Interactive>
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
                            <div style={{width:"100px", height:"40px", cursor:"pointer"}} onMouseLeave={() => setHover(false)} onMouseOver={() => setHover(true)} onClick={() => onIconClick()}></div>
                        </Html>
                    </mesh>
                </group>
            
        )
}

export default PNGVRVideoInteractive