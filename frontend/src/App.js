import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import CoverScreen from "./components/CoverScreen";
import MainInvitation from "./components/MainInvitation";
import MusicPlayer from "./components/MusicPlayer";
import { Toaster } from "./components/ui/toaster";
import { INVITATION_DATA } from "./mock";
import { fetchWishes } from "./api";

function getInitialGuestName() {
  if (typeof window === "undefined") return "Kıymetli Dostlarımız";
  const params = new URLSearchParams(window.location.search);
  const to = params.get("to");
  return to ? decodeURIComponent(to) : "Kıymetli Dostlarımız";
}

function App() {
  const [opened, setOpened] = useState(false);
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const musicRef = useRef(null);
  const guestName = getInitialGuestName();

  const reloadWishes = async () => {
    try {
      const data = await fetchWishes();
      setWishes(data);
    } catch (e) {
      console.error("fetchWishes failed:", e?.message);
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchWishes();
        if (!cancelled) setWishes(data);
      } catch (e) {
        console.error("fetchWishes failed:", e?.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Lock scroll while cover is visible
  useEffect(() => {
    document.body.classList.toggle("no-scroll", !opened);
  }, [opened]);

  const handleOpen = () => {
    // Trigger music play synchronously inside the user click handler
    if (musicRef.current) {
      try {
        musicRef.current.play();
      } catch (e) {
        /* noop */
      }
    }
    setOpened(true);
  };

  return (
    <div className="App">
      {!opened && (
        <CoverScreen
          guestName={guestName}
          hafizName={INVITATION_DATA.hafizName}
          eventDate={INVITATION_DATA.eventDate}
          venueShort="Hamidiye Mahallesi"
          onOpen={handleOpen}
        />
      )}
      <MainInvitation
        data={INVITATION_DATA}
        wishes={wishes}
        loading={loading}
        onWishSubmitted={reloadWishes}
        guestName={guestName}
      />
      <MusicPlayer ref={musicRef} visible={opened} />
      <Toaster />
    </div>
  );
}

export default App;
