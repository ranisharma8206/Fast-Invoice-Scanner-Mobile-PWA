import { useEffect, useState } from 'react';
import { Camera_preview } from './components/Camera_preview';
import Connect_viewers_screen from './components/Connect_viewers_screen.js'
// import { io } from "socket.io-client";
import {socket} from './services/socket';
// const socket = io("http://192.168.29.212:5000/");

function App() {
  const [is_connected, set_is_connected] = useState(false);
  const [selected_viewer, set_selected_viewer] = useState('');
  const [available_viewers, set_available_viewers] = useState([]);

  useEffect(() => {
    socket.emit("scanner_found");
    socket.on("send_viewers_list", (connected_viewers_username_list) => {
      set_available_viewers(connected_viewers_username_list['connected_viewers_username_list']);
    });
  }, []);

  if (is_connected) {
    return(
      <Camera_preview socket={socket} selected_viewer={selected_viewer} />
    );
  }
  return (
      <Connect_viewers_screen socket={socket} selected_viewer = {selected_viewer}  set_selected_viewer = {set_selected_viewer} set_is_connected = {set_is_connected} available_viewers = {available_viewers} />
  );
}

export default App;
