"use client";

import { getAnalytics, logEvent } from "firebase/analytics";
import { useEffect, useRef } from "react";

export default function VideoPopUp({ url }: { url: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    const videoElement = videoRef.current;

    const screenListerner = (videoElement.onfullscreenchange = () => {
      if (!document.fullscreenElement) {
        videoElement!.pause();
        videoElement!.currentTime = 0;
      } else {
        const analytics = getAnalytics();
        logEvent(analytics, "url");
      }
    });

    return () => {
      videoElement?.removeEventListener("fullscreenchange", screenListerner);
    };
  }, [videoRef, url]);

  return (
    <>
      <div
        className="w-full h-fit flex justify-center items-center p-2 relative cursor-pointer"
        title="Play video in full screen"
      >
        <video
          ref={videoRef}
          src={url}
          muted
          className="rounded-md object-cover border-black border-2 w-full"
          onClick={(e) => {
            e.currentTarget.requestFullscreen();
            e.currentTarget.play();
          }}
        />
        <div
          className="size-8 aspect-square bg-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ clipPath: "polygon(80% 50%, 0 0, 0 100%)" }}
        ></div>
      </div>
    </>
  );
}
