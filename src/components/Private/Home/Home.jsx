import React from 'react'
import HomeCSS from './Home.module.css';
import Action from './Action';
import Upload from './Upload';

export default function Home() {


  return (
    <div>
      <Action/>
      <Upload cname={`${HomeCSS.upload}`}/>    
    </div>
  )
}
