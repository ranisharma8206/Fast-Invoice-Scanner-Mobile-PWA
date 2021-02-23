import { useState } from 'react';
import { Camera_preview } from './components/Camera_preview';
import Connect_viewers_screen from './components/Connect_viewers_screen.js'

function App() {
  const [is_connected, set_is_connected] = useState(false);
  const [selected_viewer, set_selected_viewer] = useState('');
  if (is_connected) {
    return(
      <Camera_preview />
    );
  }
  return (
    <Connect_viewers_screen selected_viewer = {selected_viewer}  set_selected_viewer = {set_selected_viewer} set_is_connected = {set_is_connected} /> 
  );
}

export default App;
