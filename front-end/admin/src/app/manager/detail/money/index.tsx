import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@/components/table';
import Paper from '@material-ui/core/Paper';
import { getJson, postJson } from '@fay-react/lib/fetch';
import { BASE_URL } from '@/env';
import { getUser } from '@fay-react/lib/user';
import {useRouter} from 'next/router';
import {PATH_PREFIX} from '@/env';
import {datetimeFormat} from '@/lib/date-format';

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
  createtime: string
  cause: number
  changemoney: number
}

const detailMoney = ({ item }: any) => {
  const user = getUser();
  const router = useRouter();
  const classes = useStyles({});
  const [state, setState] = React.useState({ data: { rows: [{}] }, loading: true,});

  React.useEffect(() => {
    getData(item.merchid);
  }, [])

  const getData = (merchid: string) => {
    getJson({
      path: BASE_URL + `/auth/moneybalancedescription?merchid=${merchid}`,
      headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': user.token }
    }).then(res => {
      console.log(res);
      if (res.length > 0) {
        setState({ data: { rows: res }, loading: false });
      }
    })
  }

  const columns = [
    {
      width: '25%',
      title: '变动原因',
      dataIndex: 'cause',
      render: (text: string) => (
        <React.Fragment>
          <div>{text || '-'}</div>
        </React.Fragment>
      )
    },
    {
      width: '25%',
      title: '创建时间',
      dataIndex: 'createtime',
      render: (text: string) => (
        <React.Fragment>
          <div>{datetimeFormat(text) || '-'}</div>
        </React.Fragment>
      )
    },
    {
      width: '25%',
      title: '变动金额',
      dataIndex: 'changemoney',
    },
    {
      width: '25%',
      title: '变动后余额',
      dataIndex: 'blance',
    }
  ];

  return (
    <div>
      <Paper className={classes.root}>
        <Table className={classes.table} columns={columns} dataSource={state.data.rows} rowKey={(row: Org) => JSON.stringify(row)} loading={state.loading} />
      </Paper>
    </div>
  );
}
export default detailMoney;