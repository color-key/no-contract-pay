import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import {getJson, postJson} from '@fay-react/lib/fetch';
import {BASE_URL} from '@/env';

export default () => {

  const [files, setFiles] = React.useState<(File | string)[]>([]);
  const [change, setChange] = React.useState(false);
  const [initNo, setInitNo] = React.useState(0);
  const initFiles = React.useRef<any>();

  const handleChange = (_files: File[]) => {
    console.log('Files:', _files)
    files.map((file)=>console.log(typeof file))
    setFiles(_files);
    _files.map((file)=>console.log(typeof file))
  }

  const upload = async (file: any) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'tianlad');
    try {
      const fetchRes = await fetch('/oss', {
        method: 'POST',
        body: formData,
      });
      const result = await fetchRes.json();
      if(result.success){
        return result.result;
      }else{
        console.log('图片上传失败');
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  const onSave = async () => {
    for(let i=0;i<files.length;i++){
      const file: any = files[i];
      if(typeof file !== 'string' && file.path){
        const img = await upload(file);
        console.log(img);
        initFiles.current[i] = img;
      }
    }
    postJson({path: BASE_URL+'/banner/upd', data: {banner: initFiles.current.join(','), id: 1}}).then(res => {
      if(res.success){
        alert('保存成功');
        setChange(false);
      }else{
        alert('更新失败');
      }
    })
  }

  const getData = () => {
    getJson({path: BASE_URL+'/banner/findById', data: {id: 1}}).then(res => {
      if(res.success && res.result[0]){
        initFiles.current = res.result[0].banner.split(',');
        setFiles(initFiles.current);
        setInitNo(initNo+1);
        console.log(initFiles.current);
      }
    })
  }

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    let _change = false;
    for(let i=0;i<files.length;i++){
      const file: any = files[i];
      if(typeof file !== 'string' && file.path){
        _change = true;
        break;
      }
    }
    setChange(_change);
  }, [files.length]);

  const reset = () => {
    setFiles(initFiles.current);
    setInitNo(initNo+1);
  }

  return (
    <>
      <DropzoneArea
        key={initNo}
        dropzoneText={'拖拽图片文件到此处或者点击此处'}
        initialFiles = {files}
        acceptedFiles={['image/*']}
        filesLimit={6}
        previewGridProps={{container: { spacing: 1, direction: 'row' }}}
        onChange={handleChange}
      />
      <Box mt={5}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant={"contained"}
              onClick={reset}
            >
              重置
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              disabled={!change}
              variant={"contained"}
              color={"primary"}
              onClick={onSave}
            >
              保存
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )  
}