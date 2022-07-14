import React, {useRef, useEffect, useState} from 'react'
import WebViewer from '@pdftron/webviewer'
// import axios from 'axios';
import axios from 'axios';
import AvailableCSS from './AvailableCSS.module.css';
import {useAuthContext} from 'components/Auth/AuthContext/AuthContext.ts'


function Available() {
  const [base64File, setBase64File] = useState(null);
  const viewerDiv = useRef(null);
  const {myToken} = useAuthContext();
  // console.log("🚀 ---------------------------------------------------------------------🚀");
  // console.log("🚀 -> file: Available.jsx -> line 13 -> Available -> myToken", myToken.files);
  // console.log("🚀 ---------------------------------------------------------------------🚀");

  const files = <ul>
    {myToken.files.map((file, index) => <li className={AvailableCSS["listItem"]} key={index}>{file.fileName}</li>)}
  </ul>
  

  function base64ToBlob(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; ++i) {
      bytes[i] = binaryString.charCodeAt(i);
    }
  
    return new Blob([bytes], { type: 'application/pdf' });
  };

  useEffect(() => {
    WebViewer({
      path: 'lib'
    }, viewerDiv.current).then(async instance =>{  

      await axios('/api/db/getFile', {params: {fileName: 'Sia-Xiong-Resume.pdf'},headers: {"Authorization": `Bearer ${myToken.jwt}`}})
      
      .then(res=>{
      console.log("🚀 -------------------------------------------------------------🚀");
      console.log("🚀 -> file: Available.jsx -> line 41 -> useEffect -> res", res.data);
      console.log("🚀 -------------------------------------------------------------🚀");
        instance.UI.loadDocument(base64ToBlob(res.data), {extension: "pdf"})
        const { documentViewer, annotationManager } = instance.Core;
  
        documentViewer.addEventListener('documentLoaded', () => {
          console.log("documentLoaded event!")
        })      
      })


    })
  
  }, [])



  return (
    <div>
      <div className='webviewer' ref={viewerDiv} style={{height: "100vh"}}></div>
      <div>
        {files}
      </div>
    </div>
  )
}

export default Available