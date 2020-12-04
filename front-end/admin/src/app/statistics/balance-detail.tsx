import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@/components/table';
import Paper from '@material-ui/core/Paper';
import {datetimeFormat} from '@/lib/date-format';
import {getBalanceDetail} from '@/lib/api';

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
  paper: {
    zIndex: 10,
    width: 100,
    position: 'absolute'
  },
  btn: {
    minWidth: 88,
  }
}))

interface BalanceDetailType {
  cause: number
  changemoney: string
  createtime: number
  blance: string
}

const BalanceDetail = () => {

  const classes = useStyles({});
  const [state, setState] = React.useState({ data: { rows: [], count: 0 }, loading: true});

  React.useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    getBalanceDetail().then(res => {
      console.log(res);
      setState({ data: { rows: res.data || [], count: res.length || 0}, loading: false });
    })
  }

  const columns = [
    // {
    //   width: '15%',
    //   title: '变动原因',
    //   dataIndex: 'cause',
    //   render: (text: string) => (
    //     <React.Fragment>
    //       <div>{text || '-'}</div>
    //     </React.Fragment>
    //   )
    // },
    {
      width: '20%',
      title: '创建时间',
      dataIndex: 'createtime',
      render: (text: string) => (
        <React.Fragment>
          <div>{datetimeFormat(text) || '-'}</div>
        </React.Fragment>
      )
    },
    {
      width: '10%',
      title: '变动后余额',
      dataIndex: 'blance',
    },
    {
      width: '10%',
      title: '金额变化',
      dataIndex: 'changemoney',
    },
  ];

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} columns={columns} dataSource={state.data.rows} rowKey={(row: BalanceDetailType) => JSON.stringify(row)} loading={state.loading} />
    </Paper>
  );
}

export default BalanceDetail;