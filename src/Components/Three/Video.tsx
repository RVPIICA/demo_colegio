import * as THREE from 'three'
import { useEffect, useState } from "react";
import { Interactive } from '@react-three/xr';
import visorAlphaInverse from "../../static/visor/visor-alpha-inverse.png"
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useSpring, animated } from '@react-spring/three'

const Video: React.FC<{
    videoUrl?: string,
    size: [number, number],
    loop?: boolean,
    muted?: boolean,
    hidden: boolean,
    hideVideo:() => void
}> = ({
    videoUrl,
    size,
    loop = false,
    muted = false,
    hidden = false,
    hideVideo
}) => {
        const [video, setVideo] = useState<HTMLVideoElement|undefined>(undefined)        

        const [playing, setPlaying] = useState(false) 
    
        const visorTextureAlphaInverse = useLoader(TextureLoader, visorAlphaInverse)

        const { scale: videoScale } = useSpring({ scale: !hidden ? 0 : 1 })

        useEffect(() => {
            if(videoUrl) {
                const vid = document.createElement("video");
                vid.src = videoUrl ? videoUrl : "";
                vid.crossOrigin = "Anonymous";
                vid.loop = loop;
                vid.muted = muted;
                vid.autoplay = true
                setVideo(vid)
            }
        }, [videoUrl])

        if(!video) {
            return null
        }

        const updateVideoState = () => {
            if(!video) {
                return null
            }
            
            if (playing) {
                video.pause()
                video.currentTime = 0
                setPlaying(false)
                hideVideo()
                return
            }
            video.play()
            setPlaying(true)
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