import { useState, useEffect } from "react";

export function Use_user_media(requested_media) {
  const [media_stream, set_media_stream] = useState(null);
  const [imageCapture, setImageCapture] = useState(null);
  useEffect(() => {
    async function enable_stream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(requested_media);
        set_media_stream(stream);
        const ic = new ImageCapture(stream.getVideoTracks()[0]);
        setImageCapture(ic);
      } catch(err) {
        // Removed for brevity
      }
    }

    if (!media_stream) {
      enable_stream();
    } else {
      return function cleanup() {
        media_stream.getTracks().forEach(track => {
          track.stop();
        });
      }
    }
  }, [media_stream, requested_media]);

  return [media_stream,imageCapture];
}