import React from 'react'
import {Component} from 'react-native'

export const buttonBack = {
      width:40,
      height:35,
      padding:1,
      borderRadius:5,
      elevation:5,
};

export const small = {
  paddingHorizontal: 10,
  paddingVertical: 12,
    width: 75
  };  
  
  export const rounded = {
    borderRadius: 50
  };  
  export const mediumRounded = {
    borderRadius: 5
  };  
  export const contentRounded = {
    borderRadius: 10
  };  
  
  export const smallRounded = {
    ...small,
    ...rounded
  };  

  export const roundedCircle = {
    // borderRadius:100,
    // width:30,
    // height:80
  //   width: 44,
  //  height: 44,
  //  borderRadius: 44/2
  width: 60,
  height: 60,
  justifyContent: "center",
  borderRadius: 60 / 2,
  };  

