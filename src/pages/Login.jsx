import React, { useState } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom';
import { setId, setToken } from '../functions/utils';
import { 
  Card, 
  Box, 
  TextField, 
  Button, 
  Grid, 
  Typography 
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  margin_20: {
    margin: 20
  },
  container: {
    textAlign: 'center',
    marginTop: 200,
    width: 450,
    padding: 30
  }
}));

export default function Login() {
  const style = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPasswrod] = useState("");

  const onLogin = () => {
    Axios.post("https://syncdocapi.herokuapp.com/api/login", {
      "username": username,
      "password": password
    }).then((res) => {
      const { id, token } = res.data
      setToken(token)
      setId(id)
      history.push("/")
    })
  }

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Card variant="outlined" justifyContent="center" className={style.container}>
      <Typography variant="h4" component="h2">
        Log In
      </Typography>
        <Box className={style.margin_20}>
          <TextField 
            size="small"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.vaule)}
            id="outlined-basic" 
            label="Username" 
            variant="outlined" 
          />
        </Box>
        <Box className={style.margin_20}>
          <TextField 
            size="small"
            fullWidth
            value={password}
            type="password"
            onChange={(e) => setPasswrod(e.target.vaule)}
            id="outlined-basic" 
            label="Password" 
            variant="outlined" 
          />
        </Box>
        <Button 
          onClick={onLogin} 
          variant="contained" 
          color="primary"
          fullWidth
        >
          Login
        </Button>
      </Card>
    </Grid>
  )
}
