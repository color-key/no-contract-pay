import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Banner from './banner';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Banner/>
    </div>
  )
}

export interface SearchStateType {
  searchText: string
}

export interface BannerType{
  id: number
  banner: string
  createTime: string,
  updateTime: string,
  path: string,
}