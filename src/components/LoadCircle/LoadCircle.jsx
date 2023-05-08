import css from './LoadCircle.module.css'
import {ColorRing} from 'react-loader-spinner'
import React from 'react';
export const LoadTable = ()=>{
    return(
       <div className={css.colorRing} > 
       <ColorRing
       className='colorRing'
       visible={true}
       height="80"
       width="80"
       ariaLabel="blocks-loading"
       wrapperStyle={{}}
       wrapperClass="blocks-wrapper"
       colors={['#bada55', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
       </div>
   )
}