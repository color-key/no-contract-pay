import React from 'react';
import Dialog from '@/components/dialog';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme: Theme) => ({
  root: {

  },
  tfDes: {
    display: 'flex',
    alignItems: 'center',
    width: 100
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  formLable: {
    width: 150
  },
  formLableMoney: {
    width: 100
  }
}))

const ChangeDialog = ({ open, onClose, payFuc, item }: any) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [state, setState] = React.useState({
    payWay: '',
    payValue: '',
  });
  const handleError = () => setError('');
  
  const handleRadioPayway = (e: any) => {
    setState({...state, payWay: e.target.value});
  }
  const handleRadioPayMoney = (e: any) => {
    setState({...state, payValue: e.target.value});
  }

  const callback = (err: string) => {
    setLoading(false);
    if(err) setError(err);
  }

  const handleSubmit = () => {
    setLoading(true);
    payFuc(state.payWay, state.payValue, callback);
   }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      onError={handleError}
      onKnow={handleError}
      loading={loading}
      errorText={ error && error.length > 0 ? error : undefined}
      title='充值'
      footer
      buttonVariant={['cancel', 'submit']}
      submitText={'充值'}
    >
      <Box>
        <Box display='flex'>
          <Typography className={classes.tfDes}>充值方式:&nbsp;</Typography>
          <RadioGroup value={state.payWay} onChange={handleRadioPayway} className={classes.radioGroup}>
            <FormControlLabel className={classes.formLable} value="0" control={<Radio color="primary" />} label="支付宝支付" />
            <FormControlLabel className={classes.formLable} value="1" control={<Radio color="primary" />} label="微信支付" />
          </RadioGroup>
        </Box>
        <Box display='flex' mt={1}>
        <Typography className={classes.tfDes}>充值金额:&nbsp;</Typography>
          <RadioGroup value={state.payValue} onChange={handleRadioPayMoney} className={classes.radioGroup}>
            <FormControlLabel className={classes.formLableMoney} value="1000" control={<Radio color="primary" />} label="1000" />
            <FormControlLabel className={classes.formLableMoney} value="2000" control={<Radio color="primary" />} label="2000" />
            <FormControlLabel className={classes.formLableMoney} value="5000" control={<Radio color="primary" />} label="5000" />
          </RadioGroup>
        </Box>
      </Box>
    </Dialog>
  )
}

export default ChangeDialog;