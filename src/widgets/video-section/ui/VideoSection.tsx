"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import videoThumbnail from "@/shared/assets/images/video-thumbnail.png";
import videoPoster from "@/shared/assets/images/video-poster.png";
import playCircleIcon from "@/shared/assets/icons/play-circle.svg";
import volumeXIcon from "@/shared/assets/icons/volume-x.svg";

export function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleWatch = () => {
    setIsPlaying(true);
    setIsPaused(false);
    setVideoStarted(false);
  };

  const handleClose = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPaused(false);
    } else {
      videoRef.current.pause();
      setIsPaused(true);
    }
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="bg-green-dark pt-[154px] pb-[243px] max-sm:pt-[40px] max-sm:pb-[40px] sm:pt-[60px] sm:pb-[60px] md:pt-[80px] md:pb-[120px] lg:pt-[120px] lg:pb-[180px] xl:pt-[154px] xl:pb-[243px]">
      <AnimatePresence mode="wait">
        {!isPlaying ?
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            {/* Title with masked thumbnail */}
            <div className="relative ml-[100px] h-[135px] w-[911px] max-sm:mr-1 max-sm:ml-[0px] max-sm:h-auto max-sm:w-full max-sm:pr-4 sm:ml-8 md:ml-12 lg:ml-16 xl:ml-[100px] max-lg:w-full max-lg:pr-4 lg:w-[800px] xl:w-[911px]">
              <h2
                className="relative z-10 text-left font-sans text-[150px] font-extrabold uppercase leading-[0.9] tracking-tight max-sm:text-[48px] sm:text-[64px] md:text-[80px] lg:text-[120px] xl:text-[150px]"
                style={{
                  backgroundImage: `url(${videoThumbnail.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                Як це було
              </h2>
            </div>

            {/* Thumbnail strip + watch button */}
            <div className="mx-auto mt-[36px] flex w-full flex-col items-end max-xl:w-full max-xl:px-4">
              <div className="w-full overflow-hidden rounded-lg">
                <Image
                  src={videoPoster}
                  alt="Video preview"
                  width={1533}
                  height={206}
                  className="w-full object-cover object-center grayscale"
                />
              </div>
              <button
                onClick={handleWatch}
                className="mt-2 cursor-pointer font-sans text-[24px] font-normal uppercase tracking-tight text-yellow-accent max-sm:text-[16px]"
                style={{ letterSpacing: "-0.07em" }}>
                [дивитись відео]
              </button>
            </div>
          </motion.div>
        : <motion.div
            key="playing"
            className="relative mx-auto w-full max-w-[1728px]"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}>
            {/* Video */}
            <div className="w-full ">
              <video
                ref={videoRef}
                className={`h-full w-full rounded-lg object-cover relative z-10 ${!videoStarted ? "grayscale" : ""}`}
                poster={videoPoster.src}
                autoPlay
                muted={isMuted}
                playsInline
                onPlaying={() => setVideoStarted(true)}>
                <source
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <div className="absolute top-[86%] z-20 w-full px-[100px] max-sm:px-4 sm:px-8 md:px-12 lg:px-16 xl:px-[100px]">
              <div className="flex items-center justify-between rounded-[48px] bg-yellow-accent px-[33px] py-[8px] max-sm:px-4">
                {/* Left: play/pause + volume */}
                <div className="flex items-center gap-[36px] max-sm:gap-4">
                  <button
                    onClick={handlePlayPause}
                    className="flex cursor-pointer items-center justify-center">
                    <Image
                      src={playCircleIcon}
                      alt={isPaused ? "Play" : "Pause"}
                      width={48}
                      height={48}
                      className="max-sm:h-8 max-sm:w-8"
                    />
                  </button>
                  <button
                    onClick={handleMuteToggle}
                    className="flex cursor-pointer items-center justify-center">
                    <Image
                      src={volumeXIcon}
                      alt={isMuted ? "Unmute" : "Mute"}
                      width={48}
                      height={48}
                      className="max-sm:h-8 max-sm:w-8"
                    />
                  </button>
                </div>

                {/* Right: close button */}
                <button
                  onClick={handleClose}
                  className="cursor-pointer font-sans text-[24px] font-normal uppercase text-green-secondary max-sm:text-[16px]"
                  style={{ letterSpacing: "-0.07em" }}>
                  [закрити]
                </button>
              </div>
            </div>

            {/* Controls bar */}
          </motion.div>
        }
      </AnimatePresence>
    </section>
  );
}
