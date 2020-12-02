import React from 'react';
import Dialog from '@/components/dialog';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TF from '@/components/text-field';
import {editAccount} from '@/lib/api';

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

const EditDialog = ({ open, onClose, item={accname: '', state: '0', node: ''}, onRefresh }: any) => {
  const classes = useStyles();
  const [data, setData] = React.useState({accname: item.accname, state: item.state+'', node: item.node});
  const [finishText, setFinishText] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = () => {
    setLoading(true);
    editAccount(item.uuid, data.accname, data.state, data.node).then(_res => {
      setFinishText('编辑成功');
      onRefresh();
      setLoading(false);
    })
  }

  React.useEffect(() => {
    setData({accname: item.accname, state: item.state+'', node: item.node});
  }, [JSON.stringify(item)]);

  const handleClose = () => {
    onClose();
    setFinishText('');
    setLoading(false);
  }

  const handleChange = (key: string) => (e: any) => {
    setData({...data, [key]: e.target.value})
  }

  const submitDisabled = data.accname === '';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title='编辑收款账户'
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
            <TF value={data.accname} fullWidth inputProps={{ className: classes.tf }} onChange={handleChange('accname')}/>
          </Box>
        </Box>
        <Box display='flex' mt={1} alignItems={'center'}>
          <Box width={120}>
            <Typography>支付类型：</Typography>
          </Box>
          <Box ml={4}>
            <RadioGroup value={data.state} onChange={handleChange('state')} className={classes.radioGroup}>
              <FormControlLabel
                  className={classes.formLableMoney}
                  value={"0"}
                  control={<Radio color="primary" />}
                  label={'启用'}
                />
                <FormControlLabel
                  className={classes.formLableMoney}
                  value={"1"}
                  control={<Radio color="primary" />}
                  label={'禁用'}
                />
            </RadioGroup>
          </Box>
        </Box>
        <Box display='flex' mt={2} alignItems={'center'}>
          <Box width={120}>
            <Typography>备注说明：</Typography>
          </Box>
          <Box ml={2} width={300}>
            <TF value={data.node} fullWidth inputProps={{ className: classes.tf }} onChange={handleChange('node')}/>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

export default EditDialog;