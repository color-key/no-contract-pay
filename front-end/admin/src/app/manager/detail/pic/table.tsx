import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@/components/table';
import Paper from '@material-ui/core/Paper';
import { getJson, postJson } from '@fay-react/lib/fetch';
import { BASE_URL } from '@/env';
import { getUser } from '@fay-react/lib/user';
import {Contxt} from '../ctx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    margin: theme.spacing(1, 0)
  },
  table: {
    minWidth: 700,
    fontSize: '0.75rem'
  },
}))

interface Org {
  blance: number
  createTime: string
  easzadmin: number
  email: string
  merchid: string
  password: string
  phone: string
  qqnm: string
  secret: string
  state: number
  username: string
  uuid: string
  wecahtnm: string
}

export default () => {
  const user = getUser();
  const ctx = React.useContext(Contxt);
  const defaultPage = 1;
  const defaultRowsPerPage = 10000;
  const classes = useStyles({});
  const [state, setState] = React.useState<any>([]);

  React.useEffect(() => {
    getData(defaultPage, defaultRowsPerPage);
  }, [JSON.stringify(ctx.state.pic)])

  const getData = (page: number, rowsPerPage: number) => {
    postJson({
      path: BASE_URL + `auth/fenyequerymeny?money=${ctx.state.pic.money}&accname=${ctx.state.pic.accname}&paytype=${ctx.state.pic.paytype}&pageNum=${page}&pageSize=${rowsPerPage}`,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': user.token }
    }).then(res => {
      console.log(res);
      if (res.code === '0000') {
        setState(res.data.list);
      }
    })
  }
  return (
    <div>
      <Paper className={classes.root}>
        
      </Paper>
    </div>
  );
}
