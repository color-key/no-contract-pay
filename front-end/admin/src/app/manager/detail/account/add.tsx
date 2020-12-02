import React from 'react';
import Dialog from '@/components/dialog';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TF from '@/components/text-field';
import {addPayee, getWays} from '@/lib/api';

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

const initData = {name: '', paytype: '', remark: ''};
const AddDialog = ({ open, onClose, onRefresh }: any) => {
  const classes = useStyles();
  const [state, setState] = React.useState(initData);
  const [finishText, setFinishText] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [ways, setWays] = React.useState([]);

  const handleSubmit = () => {
    setLoading(true);
    addPayee(state.name, state.paytype, state.remark).then(_res => {
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

  React.useEffect(() => {
    getWays().then(res => setWays(res));
  }, []);

  const submitDisabled = state.paytype === '' || state.name === '';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title='添加收款账户'
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
            <Typography>账户名称：</Typography>
          </Box>
          <Box ml={2} width={300}>
            <TF fullWidth inputProps={{ className: classes.tf }} onChange={handleChange('name')}/>
          </Box>
        </Box>
        <Box display='flex' mt={1} alignItems={'center'}>
          <Box width={120}>
            <Typography>支付类型：</Typography>
          </Box>
          <Box ml={4}>
            <RadioGroup value={state.paytype} onChange={handleChange('paytype')} className={classes.radioGroup}>
              {
                ways.map((way: any, index: number) => {
                  return (
                    <FormControlLabel
                      key={index}
                      className={classes.formLableMoney}
                      value={""+way.aitype}
                      control={<Radio color="primary" />}
                      label={way.asname}
                    />
                  )
                })
              }
            </RadioGroup>
          </Box>
        </Box>
        <Box display='flex' mt={2} alignItems={'center'}>
          <Box width={120}>
            <Typography>备注说明：</Typography>
          </Box>
          <Box ml={2} width={300}>
            <TF fullWidth inputProps={{ className: classes.tf }} onChange={handleChange('remark')}/>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default AddDialog;