import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


function App() {
  return (
    <Box className={useStyles.root}>
      <Router>
        <AppRouter />
      </Router>
    </Box>
  );
}

export default App;
