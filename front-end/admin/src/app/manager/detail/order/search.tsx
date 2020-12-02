import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@/components/text-field";
import Paper from "@material-ui/core/Paper";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Select from './select';
import Time from './time';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.background.default
  },
  btn: {
    width: 150,
    height: 40,
    marginLeft: theme.spacing(5)
  },
  paper: {
    zIndex: 10,
    width: 100,
    position: 'absolute'
  },

}));

export default ({onSearch}: any) => {
  const classes = useStyles();
  const initData = {
    ordernumber: '',
    djmoney: '',
    begintime: '', //2020-11-01+00:00:00
    endtime: '', //2020-12-01+00:00:00
    state: '',
    qrtype: '0',
  };
  const [data, setData] = React.useState(initData);

  const handleChange = (key: string) => (e: any) => {
    setData({ ...data, [key]: e.target.value })
  }

  const handleSelect = ({state, qrtype}: any) => {
    setData({ ...data, state, qrtype  })
  }

  const handleSearch = () => {
    onSearch(data);
  }

  const handleReset = () => {
    onSearch(initData);
  }

  const handleTimeChange = (begin: any, end: any) => setData({ ...data, begintime: begin, endtime: end })

  return (
    <Paper className={classes.root} elevation={0}>
      <Box display='flex'>
        <TextField
          size={"small"}
          label="订单号"
          value={data.ordernumber}
          onChange={handleChange('ordernumber')}
        />
        <Box ml={4}>
          <TextField
            size={"small"}
            label="实价"
            value={data.djmoney}
            onChange={handleChange('djmoney')}
          />
        </Box>
        <Box ml={4} display='flex'>
          <Select onChange={handleSelect}/>
        </Box>
      </Box>
      <Box display='flex' alignItems='center' mt={2}>
        <Time onChange={handleTimeChange}/>
        <Button className={classes.btn} variant={"contained"} color={"primary"} onClick={handleSearch}>查询</Button>
        <Button className={classes.btn} variant={"contained"} onClick={handleReset}>重置</Button>
      </Box>

    </Paper>
  )
}