import { useState } from "react";

// Fixed, dim, full-bleed video that sits behind the whole app.
export default function VideoBackdrop({ src, poster, opacity = 0.16 }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="video-backdrop" aria-hidden>
      {!failed && (
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setFailed(true)}
          style={{ opacity }}
        />
      )}
      {failed && poster && (
        <img src={poster} alt="" style={{ opacity }} />
      )}
    </div>
  );
}
