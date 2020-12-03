import React from 'react';
import Dialog from '@/components/dialog';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {uploadQrcode} from '@/lib/api';

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
  input: {
    display: 'none',
  },
}))

const EditDialog = ({ open, onClose, item, onRefresh }: any) => {
  const classes = useStyles();
  const [file, setFile] = React.useState('');
  const [finishText, setFinishText] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleChange = () => {
    const fileDom: any = document.getElementById("upload-qrcode");
    setFile(fileDom.files[0].name);
  }

  const handleSubmit = () => {
    setLoading(true);
    const fileDom: any = document.getElementById("upload-qrcode");
    const formData = new FormData();
    formData.append('accountname', item.acaccname);
    formData.append('amount', item.acamount);
    formData.append('accpaytype', item.acpaytype);
    formData.append('head_img', fileDom.files[0]);
    uploadQrcode(formData).then(_res => {
      setFinishText('上传成功');
      onRefresh();
      setLoading(false);
    })
  }

  const handleClose = () => {
    onClose();
    setFinishText('');
    setLoading(false);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title='上传二维码'
      footer
      buttonVariant={['cancel', 'submit']}
      submitText={'保存'}
      finishText={finishText}
      loading={loading}
    >
      <Box display='flex' alignItems={'center'}>
        <input
          accept="image/*"
          className={classes.input}
          id="upload-qrcode"
          multiple
          type="file"
          onChange={handleChange}
        />
        <label htmlFor="upload-qrcode">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
        <Box ml={2}>
          <Typography>{file}</Typography>
        </Box>
      </Box>
    </Dialog>
  )
}

export default EditDialog;