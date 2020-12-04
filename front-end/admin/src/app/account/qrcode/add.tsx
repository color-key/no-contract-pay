import React from 'react';
import Dialog from '@/components/dialog';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TF from '@/components/text-field';
import {addMoney} from '@/lib/api';
import {getQueryString} from '@fay-react/lib/router';

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
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  formLableMoney: {
    width: 100
  },
  paper: {
    width: 600
  }
}))

const initData = {amount: ''};
const AddDialog = ({ open, onClose, onRefresh }: any) => {
  const classes = useStyles();
  const [state, setState] = React.useState(initData);
  const [finishText, setFinishText] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = () => {
    setLoading(true);
    const accname = getQueryString('accname');
    const paytype = getQueryString('paytype');
    addMoney(accname!, state.amount, paytype!).then(_res => {
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

  const submitDisabled = state.amount === '';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title='添加金额'
      footer
      buttonVariant={['cancel', 'submit']}
      submitText={'保存'}
      submitDisabled={submitDisabled}
      finishText={finishText}
      loading={loading}
      PaperProps={{className: classes.paper}}
    >
      <Box>
        <Box display='flex' alignItems={'center'}>
          <Box width={120}>
            <Typography>金额：</Typography>
          </Box>
          <Box ml={2} width={300}>
            <TF fullWidth inputProps={{ className: classes.tf }} onChange={handleChange('amount')}/>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default AddDialog;