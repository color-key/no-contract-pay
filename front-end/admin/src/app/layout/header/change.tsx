import React from 'react';
import Dialog from '@/components/dialog';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TF from '@/components/text-field';
import {updPwd} from '@/lib/api';

const useStyles = makeStyles(() => ({
  root: {

  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 500
  },
  des: {
    width: 80
  },
  tf: {
    paddingTop: '7px'
  },
  tfDes: {
    fontSize: '0.75rem',
    color: '#757575',
    display: 'flex',
    alignItems: 'center'
  }
}))

const initData = {oldPwd:'', newPwd:'', newPwdAgain:''};
const ChangeDialog = ({ open, onClose }: any) => {
  const classes = useStyles();
  const [data, setData] = React.useState(initData);
  const [finishText, setFinishText] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [errText, setErrText] = React.useState('');

  const handleSubmit = () => {
    setLoading(true);
    updPwd(data.oldPwd, data.newPwd).then(res => {
      setLoading(false);
      if(res.code === '0000'){
        setFinishText('修改成功');
      }else{
        setErrText('旧密码输入有误');
      }
    })
  }

  const handleClose = () => {
    onClose();
    setFinishText('');
    setData(initData);
    setErrText('');
  }

  const handleChange = (key: string) => (e: any) => {
    setErrText('');
    setData({...data, [key]: e.target.value});
  }

  const disabled = data.oldPwd.length === 0 || data.newPwd.length === 0 || data.newPwd !== data.newPwdAgain;
  const againError = data.newPwdAgain.length > 0 && data.newPwd !== data.newPwdAgain;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title='修改密码'
      footer
      buttonVariant={['cancel', 'submit']}
      submitText={'保存'}
      finishText={finishText}
      submitDisabled={disabled}
      loading={loading}
      errorText={errText}
    >
      <Box>
      <Box display='flex' alignItems='center'>
          <Typography className={classes.des}>原密码:&nbsp;</Typography>
            <TF
              value={data.oldPwd}
              inputProps={{ className: classes.tf }}
              onChange={handleChange('oldPwd')}
            />
        </Box>
        <Box display='flex' mt={1} alignItems='center'>
          <Typography className={classes.des}>新密码:&nbsp;</Typography>
            <TF
              value={data.newPwd}
              inputProps={{ className: classes.tf }}
              onChange={handleChange('newPwd')}
            />
        </Box>
        <Box display='flex' mt={1} alignItems='center'>
          <Typography className={classes.des}>确认密码:&nbsp;</Typography>
            <TF
              value={data.newPwdAgain}
              inputProps={{ className: classes.tf }}
              onChange={handleChange('newPwdAgain')}
              error={againError}
              helperText={againError ?  '两次密码输入不一致' : undefined}
            />
        </Box>
      </Box>
    </Dialog>
  )
}

export default ChangeDialog;