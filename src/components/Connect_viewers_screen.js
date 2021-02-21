import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Connect_icon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles((theme) => ({
  root: {
    height : '100vh',
    display : 'flex',
    flexDirection : 'column',
    alignItems : 'center',
    justifyContent : 'space-between'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Connect_viewers_screen() {
  const classes = useStyles();
  const [selected_viewer, set_selected_viewer] = useState('');
  const [disabled_btn, set_disabled_btn] = useState(true);
  const [available_viewers, set_available_viewers] = useState(['Rani','Abhishek', 'Shalini Shaigal']);
  const Select_viewer = (event) => {
    set_selected_viewer(event.target.value);
    if(event.target.value != ''){
        set_disabled_btn(!disabled_btn);
    }
    else{
        set_disabled_btn(true);
    }
  };
  return (
    <div className={classes.root} style={{backgroundImage: `url("https://t3.ftcdn.net/jpg/03/55/60/70/360_F_355607062_zYMS8jaz4SfoykpWz5oViRVKL32IabTP.jpg")` }}>
      <div style={{textAlign : 'center', marginTop : '100px'}}>
          <h1 style={{marginBottom : '5px'}}>Fast Invoice Scanner</h1>
          <span>Developed by Abhishek & Rani</span>
      </div>
      <div style={{textAlign : 'center'}}>
        <h4>Connect to a viewer : </h4>
        <FormControl variant="filled" className={classes.formControl}>
        <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={selected_viewer}
            onChange={Select_viewer}
        >
            <MenuItem value="">
            <em>None</em>
            </MenuItem>
            {available_viewers.map((viewers, index) => <MenuItem key={index} value={viewers}>{viewers}</MenuItem>)}
        </Select>
        </FormControl>
      </div>
      <div style={{textAlign : 'center', marginBottom : '200px'}}>
        <Button
            variant="contained"
            disabled={disabled_btn}
            color="primary"
            className={classes.button}
            endIcon={<Connect_icon />}
        >
            Connect
        </Button>
        </div>
    </div>
  );
}
