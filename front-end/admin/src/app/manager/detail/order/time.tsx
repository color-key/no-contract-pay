import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() =>
  createStyles({
    picker: {
      width: 150,
      marginTop: 4,
    },
    datePicker: {
      display: 'flex'
    },
    title: {
      fontSize: '0.75rem'
    }
  }))
export default ({onChange}: any) => {
  const classes = useStyles({});
  const [leftDate, setLeftDate] = React.useState<Date | null>(null);
  const [rightDate, setRightDate] = React.useState<Date | null>(null);
  const handleDateChange = (date: any, position: any) => {
    if (date) {
      if (position === 'left') {
        setLeftDate(date);
        onChange(date.toISOString(), rightDate && rightDate.toISOString())
      } else {
        setRightDate(date);
        onChange(leftDate && leftDate.toISOString(), date.toISOString())
      }
    }
  };
  return (
    <div className={classes.datePicker}>
      <Box>
        <Typography className={classes.title}>开始时间</Typography>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            autoOk
            disableToolbar
            variant="inline"
            className={classes.picker}
            format="YYYY-MM-DD"
            value={leftDate}
            onChange={e => handleDateChange(e, 'left')}
            animateYearScrolling
            emptyLabel={'请选择'}
            helperText={''}
            error={false}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </Box>
      <Box ml={10}>
        <Typography className={classes.title}>结束时间</Typography>
        <Box display='flex'>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <KeyboardDatePicker
            autoOk
            disableToolbar
            variant="inline"
            className={classes.picker}
            format="YYYY-MM-DD"
            value={rightDate}
            onChange={e => handleDateChange(e, 'right')}
            animateYearScrolling
            emptyLabel={'请选择'}
            helperText={''}
            error={false}
          />
        </MuiPickersUtilsProvider>
        </Box>
      </Box>
    </div>
  )
}