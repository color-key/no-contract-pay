import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    width: '100%',
    color: '#212121',
    fontWeight: 500,
    fontSize: '1.5rem',
    padding: theme.spacing(2, 1),
    backgroundColor: '#FFFFFF',
    boxShadow: '0 5px 12px rgba(0,0,0,.3)',
    borderRadius: 4
  },
}))

const Images = () => {
  const classes = useStyles();
  return (
    <Box>
      <Box className={classes.title}>全部图片</Box>
    </Box>
  )
}

export default Images;