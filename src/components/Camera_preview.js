import React, { useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Use_user_media } from '../custom_hooks/Use_user_media.js';

const CAPTURE_OPTIONS = {
    audio: false,
    video: { facingMode: "environment" },
};

export function Camera_preview() {
  const videoRef = useRef();
  const mediaStream = Use_user_media(CAPTURE_OPTIONS);

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  function handleCanPlay() {
    videoRef.current.play();
  }

  return (
      <div>
        <video ref={videoRef} onCanPlay={handleCanPlay} autoPlay playsInline muted style={{position : 'absolute', width : '100%', height : 'auto'}}/>
        <div style={{position : 'absolute', bottom : '30px', width : '100%',display : 'flex', alignItems : 'center'}}>
        <IconButton color="primary" aria-label="upload picture" component="span" style={{margin : 'auto'}}>
          <PhotoCamera fontSize="large" />
        </IconButton>
        </div>
      </div>
  );
}