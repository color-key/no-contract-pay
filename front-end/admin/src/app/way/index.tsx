import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Table from './table';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Add from './add';
import Router from 'next/router';
import {PATH_PREFIX} from '@/env';
import { getJson, postJson } from '@fay-react/lib/fetch';
import { BASE_URL } from '@/env';
import { getUser } from '@fay-react/lib/user';

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
    minWidth: 100,
  },
}))

const Way = () => {
  const classes = useStyles();
  const user = getUser();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({ data: { rows: [] }, loading: true});

  const getData = () => {
    setState({...state, loading: true});
    postJson({
      path: BASE_URL + '/auth/queryC',
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': user.token }
    }).then(res => {
      console.log(res);
      if (res.code === '0000') {
        setState({ data: { rows: res.list }, loading: false });
      }
    })
  }

  React.useEffect(() => {
    getData();
  }, [])

  return (
    <Box>
      <Box className={classes.title}>通道</Box>
      <Divider className={classes.divi} />
      <Table data={state.data} loading={state.loading} onRefresh={getData}/>
      <Button variant={"contained"} color={'primary'} className={classes.btn} onClick={() => setOpen(true)}>添加通道</Button>
      <Add open={open} onClose={() => setOpen(false)} onRefresh={getData}/>
    </Box>
  )
}

export default Way;