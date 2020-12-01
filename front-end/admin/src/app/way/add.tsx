import React from 'react';
import Dialog from '@/components/dialog';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TF from '@/components/text-field';
import {addWay} from '@/lib/api';

const useStyles = makeStyles(() => ({
  root: {

  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 500
  },
  tf: {
    paddingTop: '7px',
  },
  tfDes: {
    fontSize: '0.75rem',
    color: '#757575',
    display: 'flex',
    alignItems: 'center'
  }
}))

const initData = {type: '', name: ''};
const ChangeDialog = ({ open, onClose, onRefresh }: any) => {
  const classes = useStyles();
  const [state, setState] = React.useState(initData);
  const [finishText, setFinishText] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = () => {
    setLoading(true);
    addWay(state.type, state.name).then(_res => {
      setFinishText('添加成功');
      onRefresh();
      setLoading(false);
    })
  }

  const handleClose = () => {
    onClose();
    setState(initData);
    setFinishText('');
    setLoading(false);
  }

  const handleChange = (key: string) => (e: any) => {
    setState({...state, [key]: e.target.value})
  }

  const submitDisabled = state.type === '' || state.name === '';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title='添加通道'
      footer
      buttonVariant={['cancel', 'submit']}
      submitText={'保存'}
      submitDisabled={submitDisabled}
      finishText={finishText}
      loading={loading}
    >
      <Box>
        <Box display='flex' alignItems={'center'}>
          <Typography>渠道类型:&nbsp;</Typography>
          <Box ml={2}>
            <TF inputProps={{ className: classes.tf }} onChange={handleChange('type')}/>
          </Box>
            
        </Box>
        <Box display='flex' mt={2} alignItems={'center'}>
          <Typography>渠道名称:&nbsp;</Typography>
          <Box ml={2}>
            <TF inputProps={{ className: classes.tf }} onChange={handleChange('name')}/>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default ChangeDialog;