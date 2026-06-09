import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

// YouTube IFrame API based music player (audio-only via 1px iframe)
// Track: Mohamed Youssef - Hadul El Quran
const VIDEO_ID = "7kh1jZGTR_I";
const CONTAINER_ID = "yt-music-container";

const MusicPlayer = forwardRef(function MusicPlayer({ visible }, ref) {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const playerRef = useRef(null);
  const wantPlayRef = useRef(false);

  useEffect(() => {
    // Load YouTube IFrame API once
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      if (playerRef.current) return;
      playerRef.current = new window.YT.Player(CONTAINER_ID, {
        height: "1",
        width: "1",
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: VIDEO_ID,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            setReady(true);
            try {
              playerRef.current.setVolume(50);
            } catch (e) {
              /* noop */
            }
            // If a play request came in before ready, fulfil it now
            if (wantPlayRef.current) {
              try {
                playerRef.current.playVideo();
              } catch (e) {
                /* noop */
              }
            }
          },
          onStateChange: (e) => {
            // 1 = playing, 2 = paused, 0 = ended
            if (e.data === 1) setPlaying(true);
            else if (e.data === 2 || e.data === 0) setPlaying(false);
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prev === "function") prev();
        initPlayer();
      };
    }
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => {
      wantPlayRef.current = true;
      if (ready && playerRef.current) {
        try {
          playerRef.current.playVideo();
        } catch (e) {
          /* noop */
        }
      }
    },
    pause: () => {
      wantPlayRef.current = false;
      if (ready && playerRef.current) {
        try {
          playerRef.current.pauseVideo();
        } catch (e) {
          /* noop */
        }
      }
    },
  }));

  const toggle = () => {
    if (!ready || !playerRef.current) return;
    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  return (
    <>
      {/* 1x1 hidden YouTube iframe container (always mounted) */}
      <div
        style={{
          position: "fixed",
          left: -9999,
          top: -9999,
          width: 1,
          height: 1,
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <div id={CONTAINER_ID} />
      </div>

      {visible && (
        <button
          onClick={toggle}
          aria-label="Müziği aç/kapa"
          className={`fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full btn-gold flex items-center justify-center shadow-lg ${
            playing ? "animate-spin-slow" : "music-btn-pulse"
          }`}
        >
          {playing ? (
            <Music className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </button>
      )}
    </>
  );
});

export default MusicPlayer;
