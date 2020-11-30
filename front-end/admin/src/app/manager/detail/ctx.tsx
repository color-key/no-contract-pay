import React from 'react';

const defaultState = {
  time: 0,
  user: null,
  pic: {
    time: 0,
    money: '',
    accname: '',
    paytype: '0',
  }
}
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'change': {
      return { ...state, time: new Date().getTime() }
    }
    case 'user': {
      return { ...state, user: action.payload }
    }
    case 'pic': {
      return {...state, pic: action.payload}
    }
    default:
      return state;
  }
}

export const Contxt = React.createContext<any | null>(null);
export const ContxtProvider = (props: any) => {
  const [state, dispatch] = React.useReducer(reducer, defaultState);
  return (
    <Contxt.Provider value={{state, dispatch}}>
      {props.children}
    </Contxt.Provider>
  )
}