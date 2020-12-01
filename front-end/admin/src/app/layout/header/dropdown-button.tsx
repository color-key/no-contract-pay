import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import clsx from 'clsx';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
    iconBtn: {
      padding: '0px'
    },
    dropdown: {
      position: 'absolute',
      top: 48,
      right: 0,
      zIndex: 20,
    },
  })
);

export default ({ children, dropdownComponent, dropdownStyle }: any) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.root}>
        <Button className={classes.iconBtn} type="button" onClick={handleClick}>
          {children}
        </Button>
        {open && dropdownComponent ? (
          <div className={clsx(classes.dropdown, dropdownStyle)}>
            {dropdownComponent}
          </div>
        ) : null}
      </div>
    </ClickAwayListener>
  );
}