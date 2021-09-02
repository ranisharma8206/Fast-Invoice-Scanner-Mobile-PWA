import React, { useEffect, useRef } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Use_user_media } from '../custom_hooks/Use_user_media.js';
const axios = require('axios');


const CAPTURE_OPTIONS = {
    audio: false,
    video: { facingMode: "environment" },
};

function blobToDataURL(blob) {
  return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => fulfill(reader.result);
      reader.readAsDataURL(blob);
  })
}

export function Camera_preview(props) {
  const videoRef = useRef();
  const [mediaStream, imageCapture] = Use_user_media(CAPTURE_OPTIONS);
 
  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
    
    
  }

  function handleCanPlay() {
    videoRef.current.play();
  }


  function postData(data)
  {
    fetch('http://192.168.29.212:5000/uploadImage', {
      method: 'POST', // or 'PUT'
      mode:'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
  function sendData(datauri, username){
    console.log(datauri);
    const data = { username: username, datauri:datauri };
    console.log(data);
    postData(data);
    
  }

  const btn_click = ()=>{
    console.log('snapped');
    console.log(imageCapture)
    imageCapture.takePhoto()
      .then(blob =>  blobToDataURL(blob))
      .then(dataurl => {
        console.log(dataurl);
        sendData(dataurl,props.selected_viewer);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    if(imageCapture != null)
    {
      console.log("setting socket io")
      props.socket.on('send_key_press_signal', function() {
        console.log("Signal Received");
        btn_click();
      });
    }
  }, [imageCapture]);

  return (
      <div>
        <video ref={videoRef} onCanPlay={handleCanPlay} autoPlay playsInline muted style={{position : 'absolute', width : '100%', height : 'auto'}}/>
        <div style={{position : 'absolute', bottom : '30px', width : '100%',display : 'flex', alignItems : 'center'}}>
        <IconButton onClick={btn_click} color="primary" aria-label="upload picture" component="span" style={{margin : 'auto'}}>
          <PhotoCamera fontSize="large" />
        </IconButton>
        </div>
      </div>
  );
}