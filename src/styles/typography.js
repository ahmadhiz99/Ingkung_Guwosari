import React, { Component } from 'react';
import { primary } from './colors';

export const extraBig={
    fontSize:40
};
export const big={
    fontSize:28
};
export const medium={
    fontSize:20,
};
export const mid={
    fontSize:16,
};
export const small={
    fontSize:13,
};
export const extraSmall={
    fontSize:12,
};
export const superSmall={
    fontSize:10,
};


export const fontThin={
    fontFamily:'Poppins-Thin'
};
export const fontRegular={
    fontFamily:'Poppins-Regular'  
};
export const fontMedium={
    fontFamily:'Poppins-Medium'
};
export const fontBold={
    fontFamily:'Poppins-Bold'
};
export const fontExtraBold={
    fontFamily:'Poppins-ExtraBold'
};


// --------------------------------


export const textBigTitle={
    ...extraBig,
    ...fontExtraBold
};

export const textTitle={
    ...big,
    ...fontExtraBold
};

export const smallBoldTitle={
    ...medium,
    ...fontExtraBold
};

export const normalText={
    fontSize:17,
    ...fontRegular

};

export const extraSmallBoldTitle={
    fontSize:15,
    ...fontExtraBold
};

export const textNormal={
    ...small,
    ...fontRegular
};

export const Heading1 ={ 
    ...extraBig,
    ...fontRegular
};
export const Heading2 ={ 
    ...big,
    ...fontRegular
};
export const Heading3 ={ 
    ...medium,
    ...fontRegular
};
export const Heading4 ={ 
    ...small,
    ...fontRegular
};
export const Heading5 ={ 
    ...extraSmall,
    ...fontRegular
};
export const Heading6 ={ 
    ...superSmall,
    ...fontRegular
};


export const HeadingBold1 ={ 
    ...extraBig,
    ...fontBold
};
export const HeadingBold2 ={ 
    ...big,
    ...fontBold
};
export const HeadingBold3 ={ 
    ...medium,
    ...fontBold
};
export const HeadingBold4 ={ 
    ...small,
    ...fontBold
};
export const HeadingBold5 ={ 
    ...extraSmall,
    ...fontBold
};
export const HeadingBold6 ={ 
    ...superSmall,
    ...fontBold
};


