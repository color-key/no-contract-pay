import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@/components/text-field";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { SearchStateType } from './index';
import Box from '@material-ui/core/Box';
import AddDialog from './add';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    justifyContent: 'space-between'
  },
  btn: {
    height: 40,
    marginLeft: theme.spacing(2)
  },
  add: {
    width: 150
  }
}));

interface Props {
  onSearch: (args: SearchStateType) => void
}

export default ({ onSearch }: Props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const initState = { username: '' };
  const [state, setState] = React.useState<SearchStateType>(initState);

  const handleChange = (key: string) => (e: any) => {
    setState({ ...state, [key]: e.target.value })
  }

  const handleSearch = () => {
    onSearch(state);
  }

  const handleReset = () => {
    onSearch(initState);
  }

  return (
    <Paper className={classes.root} elevation={0}>
      <Box>
        <Button variant={"contained"} className={classes.add} onClick={() => setOpen(true)}>
          <Box mr={1}>添加用户</Box>
        </Button>
      </Box>
      <Box >
        <TextField
          size={"small"}
          label="用户名"
          value={state.username}
          onChange={handleChange('username')}
        />
        <Button className={classes.btn} variant={"contained"} color={"primary"} onClick={handleSearch}>查询</Button>
        <Button className={classes.btn} variant={"contained"} onClick={handleReset}>重置</Button>
      </Box>
      <AddDialog open={open} onClose={() => setOpen(false)}/>
    </Paper>
  )
}
