import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Table from './table';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Add from './add';

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
  divi: {
    width: '100%',
    height: 1,
    margin: theme.spacing(3, 0)
  },
  btn: {
    background: theme.palette.primary.main,
    color: '#FFFFFF',
    minWidth: 100,
    height: 56,
    padding: '1px 8px',
  },
}))

const Way = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  return (
    <Box>
      <Box className={classes.title}>通道</Box>
      <Divider className={classes.divi} />
      <Table />
      <Button variant={"contained"} color={'primary'} className={classes.btn} onClick={() => setOpen(true)}>添加通道</Button>
      <Add open={open} onClose={() => setOpen(false)}/>
    </Box>
  )
}

export default Way;