import React from 'react';
import Dialog from '@/components/dialog';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { postJson } from '@fay-react/lib/fetch';
import { BASE_URL } from '@/env';
import { getUser } from '@fay-react/lib/user';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 580
  },
  tfDes: {
    display: 'flex',
    alignItems: 'center',
    width: 100
  },
  tfMoney: {
    marginTop: 10,
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  formLable: {
    width: 130,
    fontSize: '0.85rem'
  },
  formLableMoney: {
    width: 100
  }
}))

const ChangeDialog = ({ open, onClose, payFuc, item }: any) => {
  const classes = useStyles();
  const user = getUser();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [state, setState] = React.useState({
    wayList: [],
    picList: [],
    payWay: '',
    payValue: 0,
  });

  React.useEffect(() => getData(), [])

  React.useEffect(() => {
    state.wayList.forEach((i: any) => {
      if (i.aitype === state.payWay) setState({ ...state, picList: i.pList })
    })
  }, [state.payWay])

  const handleError = () => setError('');

  const handleRadioPayway = (e: any) => {
    // @ts-ignore
    setState({ ...state, payWay: Number.parseInt(e.target.value) });
  }
  const handleRadioPayMoney = (e: any) => {
    setState({ ...state, payValue: Number.parseFloat(e.target.value) });
  }

  const callback = (err: string) => {
    setLoading(false);
    if (err) setError(err);
  }

  const handleSubmit = () => {
    const item = state.picList.filter((i: any) => i.money == state.payValue);
    if (item.length) {
      setLoading(true);
      payFuc(state.payWay, item[0], callback);
    } else {
      setError('出错了');
    }
  }

  const getData = () => {
    Promise.all([
      postJson({
        path: BASE_URL + '/auth/queryC',
        headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': user.token }
      }),
      postJson({
        path: BASE_URL + `/auth/query?cus_merchid=${user.merchid}`,
        headers: { "X-PLATFORM": "WEBAPP", 'X-AUTH-TOKEN': user.token }
      })
    ]).then(([res1, res2]: any) => {
      let wayList: any = [], picList: any = [];
      if (res1.code === '0000') wayList = res1.list;
      if (res2.code === '0000') picList = res2.data;
      wayList.sort((i: any, j: any) => {
        if (i.aitype < j.aitype) return -1;
      });
      wayList = wayList.map((k: any) => { k.pList = []; return k });
      picList.forEach((i: any) => {
        wayList.forEach((j: any) => {
          if (i.accpaytype == j.aitype) j.pList.push(i);
          return j;
        })
      });
      wayList.forEach((i: any) => {
        let tempObj: any = {}, changed: any = [];
        changed = i.pList && i.pList.reduce((item: any, current: any) => {
          if (!tempObj[current.money])  {
            tempObj[current.money] = true;
            item.push(current);
          }
          return item
        }, []);
        i.pList = changed;
        i.pList.sort((i: any, j: any) => {
          if (i.money < j.money) return -1;
        })
      })
      setState({ ...state, wayList });
    })
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      onError={handleError}
      onKnow={handleError}
      loading={loading}
      errorText={error && error.length > 0 ? error : undefined}
      title='充值'
      footer
      buttonVariant={['cancel', 'submit']}
      submitText={'充值'}
      PaperProps={{
        className: classes.root
      }}
    >
      <Box>
        <Box display='flex'>
          <Typography className={classes.tfDes}>充值方式:&nbsp;</Typography>
          <RadioGroup value={state.payWay} onChange={handleRadioPayway} className={classes.radioGroup}>
            {state.wayList.map((i: any, idx: any) => <FormControlLabel key={idx} className={classes.formLable} value={i.aitype} control={<Radio color="primary" />} label={`${i.asname}支付`} />)}
          </RadioGroup>
        </Box>
        <Box display='flex' mt={1} alignItems='flex-start' maxHeight='300px'>
          <Typography className={clsx(classes.tfDes, classes.tfMoney)}>充值金额:&nbsp;</Typography>
          <RadioGroup value={state.payValue} onChange={handleRadioPayMoney} className={classes.radioGroup}>
            {state.picList.length ?
              state.picList.map((i: any, idx: any) => <FormControlLabel key={idx} className={classes.formLableMoney} value={i.money} control={<Radio color="primary" />} label={i.money} />) :
              <Box mt={'10px'}>暂无充值金额</Box>
            }
          </RadioGroup>
        </Box>
      </Box>
    </Dialog>
  )
}

export default ChangeDialog;