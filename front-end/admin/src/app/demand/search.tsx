import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@/components/text-field";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {SearchStateType} from './index';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.background.default
  },
  btn: {
    height: 40,
    marginLeft: theme.spacing(2)
  }
}));

interface Props{
  onSearch: (args: SearchStateType) => void
}

export default ({onSearch}: Props) => {
  const classes = useStyles();
  const initState = {contactName: '', contactPhone: '', website: ''};
  const [state, setState] = React.useState<SearchStateType>(initState);

  const handleChange = (key: string) => (e: any) => {
    setState({...state, [key]: e.target.value})
  }

  const handleSearch = () => {
    onSearch(state);
  }

  const handleReset = () => {
    onSearch(initState);
  }

  return (
    <Paper className={classes.root} elevation={0}>
      <Grid container item alignItems={"center"}>
        <Box mr={2}>
          <TextField
            label="来源"
            size={"small"}
            value={state.contactName}
            onChange={handleChange('contactName')}
          />
        </Box>
        <Box mr={2}>
          <TextField
            label="联系人手机号"
            size={"small"}
            value={state.contactPhone}
            onChange={handleChange('contactPhone')}
          />
        </Box>
        <Box mr={2}>
          <TextField
            label="网站"
            size={"small"}
            value={state.website}
            onChange={handleChange('website')}
          />
        </Box>
        <Button className={classes.btn} variant={"contained"} color={"primary"} onClick={handleSearch}>查询</Button>
        <Button className={classes.btn} variant={"contained"} onClick={handleReset}>重置</Button>
      </Grid>
    </Paper>
  )
}
