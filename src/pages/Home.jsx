import React, { useState, useEffect } from 'react'
import TextEditor from '../components/TextEditor'
import { io } from 'socket.io-client'
import { Box, Avatar, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getToken, getId } from '../functions/utils';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginLeft: -10,
    background: 'green',
    border: 'solid 2px gray',
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
      zIndex: 100
    }
  }
}));

export default function Home() {
  const style = useStyles();
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const s = io("https://syncdocapi.herokuapp.com", {
      extraHeaders: {
        Authorization: 'Bearer ' + getToken(),
        user_id: getId()
      }
    });
    setSocket(s)
    return () => {
      s.disconnect();
    }
  }, [])

  useEffect(() => {
    if(socket === null) return
    const handler = (users) => {
      setUsers(JSON.parse(users))
      socket.emit("send-online", "true")
    }
    socket.on('online-check', handler)
    return () => socket.off('online-check', handler)
  }, [socket])

  return (
    <Box>
      <Box 
        display="flex" 
        position="absolute" 
        top={4}
        right={10}
        zIndex="10"
        alignItems="center"
      >
        {users.map((user, key) => (
          <Tooltip title={user.username} key={key}>
            <Avatar className={style.avatar}>
              {user.username.slice(0,1)}
            </Avatar>
          </Tooltip>
        ))}
      </Box>
      <TextEditor socket={socket}/>
    </Box>
  )
}
