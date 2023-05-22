export const createHtmlVideo = (videoUrl:string|undefined, setCurrentVideo:(video:HTMLVideoElement|undefined) => void, loop:boolean = false, muted:boolean=false) => {
    if(videoUrl) {
        const vid = document.createElement("video");
        vid.src = videoUrl ? videoUrl : "";
        vid.crossOrigin = "Anonymous";
        vid.loop = loop;
        vid.muted = muted;
        vid.autoplay = true
        setCurrentVideo(vid)
    }
    setCurrentVideo(undefined)
}