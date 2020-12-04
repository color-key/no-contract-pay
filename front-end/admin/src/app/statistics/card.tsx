import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
// import Users from './users';
// import Divider from '@material-ui/core/Divider';
// import Button from '@material-ui/core/Button';
import {getOrderStatistics} from '@/lib/api';
import TodayIcon from '@/components/icons/pay/today';
import TodayHoverIcon from '@/components/icons/pay/today-hover';
import HistoryIcon from '@/components/icons/pay/history';
import HistoryHoverIcon from '@/components/icons/pay/history-hover';
import WeekIcon from '@/components/icons/pay/week';
import WeekHoverIcon from '@/components/icons/pay/week-hover';
import MonthIcon from '@/components/icons/pay/month';
import MonthHoverIcon from '@/components/icons/pay/month-hover';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    background: theme.palette.primary.light,
    padding: theme.spacing(4, 8),
    margin: theme.spacing(4),
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

const initData = {
  "yesterday": {
    "ordercount": 0,
    "ordersum": null
  },
  "today": {
    "ordercount": 0,
    "ordersum": null
  },
  "thirtydays": {
    "ordercount": 0,
    "ordersum": null
  },
  "sevendays": {
    "ordercount": 0,
    "ordersum": null
  }
};

const Account = () => {
  const classes = useStyles();
  const [data, setData] = React.useState<any>(initData);

  React.useEffect(() => {
    getOrderStatistics().then(res => {
      setData(res);
    })
    return () => {
      setData(initData);
    }
  }, [])

  return (
    <Box>
      <Box display={'flex'} alignItems={'center'}>
        <Paper className={classes.paper}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Typography variant={'h6'}>今日收入</Typography>
          </Box>
          <Box mt={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <TodayIcon fontSize={"large"}/>
          </Box>
          <Box mt={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Typography variant={'h6'}>￥{data.today.ordersum || '0.00'}</Typography>
          </Box>
        </Paper>
        <Paper className={classes.paper}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Typography variant={'h6'}>昨日收入</Typography>
            </Box>
          <Box mt={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <HistoryIcon fontSize={"large"}/>
          </Box>
          <Box mt={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Typography variant={'h6'}>￥{data.yesterday.ordersum || '0.00'}</Typography>
          </Box>
        </Paper>
        <Paper className={classes.paper}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Typography variant={'h6'}>7天收入</Typography>
          </Box>
          <Box mt={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <WeekIcon fontSize={"large"}/>
          </Box>
          <Box mt={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Typography variant={'h6'}>￥{data.sevendays.ordersum || '0.00'}</Typography>
          </Box>
        </Paper>
        <Paper className={classes.paper}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Typography variant={'h6'}>30天收入</Typography>
          </Box>
          <Box mt={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <MonthIcon fontSize={"large"}/>
          </Box>
          <Box mt={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Typography variant={'h6'}>￥{data.thirtydays.ordersum || '0.00'}</Typography>
          </Box>
        </Paper>
      </Box>
      <Box display={'flex'} alignItems={'center'}>
        <Paper className={classes.paper}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Typography variant={'h6'}>今日订单</Typography>
          </Box>
          <Box mt={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <TodayHoverIcon fontSize={"large"}/>
          </Box>
          <Box mt={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Typography variant={'h6'}>{data.today.ordercount}笔</Typography>
          </Box>
        </Paper>
        <Paper className={classes.paper}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Typography variant={'h6'}>昨日订单</Typography>
          </Box>
          <Box mt={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <HistoryHoverIcon fontSize={"large"}/>
          </Box>
          <Box mt={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Typography variant={'h6'}>{data.yesterday.ordercount}笔</Typography>
          </Box>
        </Paper>
        <Paper className={classes.paper}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Typography variant={'h6'}>7天订单</Typography>
          </Box>
          <Box mt={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <WeekHoverIcon fontSize={"large"}/>
          </Box>
          <Box mt={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Typography variant={'h6'}>{data.sevendays.ordercount}笔</Typography>
          </Box>
        </Paper>
        <Paper className={classes.paper}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Typography variant={'h6'}>30天订单</Typography>
          </Box>
          <Box mt={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <MonthHoverIcon fontSize={"large"}/>
          </Box>
          <Box mt={2} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Typography variant={'h6'}>{data.thirtydays.ordercount}笔</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default Account;