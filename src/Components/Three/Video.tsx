import * as THREE from 'three'
import { useState } from "react";
import { Interactive } from '@react-three/xr';
import visorAlphaInverse from "../../static/visor/visor-alpha-inverse.png"
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useSpring, animated } from '@react-spring/three'

const Video: React.FC<{
    video: HTMLVideoElement|undefined,
    size: [number, number],
    hidden: boolean,
    hideVideo:() => void
}> = ({
    video,
    size,
    hidden = false,
    hideVideo
}) => {
                

        const [playing, setPlaying] = useState(false) 
    
        const visorTextureAlphaInverse = useLoader(TextureLoader, visorAlphaInverse)

        const { scale: videoScale } = useSpring({ scale: !hidden ? 0 : 1 })

        

        if(!video) {
            return null
        }

        const updateVideoState = () => {
            if(!video) {
                return null
            }
            
            video.pause()
            video.currentTime = 0
            setPlaying(false)
            hideVideo()
            return
        }

        return (
            <group position={[0,0,10]}>
                <Interactive onSelect={() => { updateVideoState() }}>
                    <animated.mesh  onClick={updateVideoState} scale={videoScale}>
                        <planeGeometry args={size} />
                        <meshBasicMaterial side={THREE.FrontSide} alphaMap={visorTextureAlphaInverse} transparent={true}>
                            <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} format={THREE.RGBFormat} />  
                        </meshBasicMaterial>
                    </animated.mesh >
                </Interactive>
            </group>
        )
    }

export default Video