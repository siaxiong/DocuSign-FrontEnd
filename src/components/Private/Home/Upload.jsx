import React from 'react';
import UploadCSS from './Upload.module.css'

export default function Upload(props) {

  return (
    <div className={UploadCSS.module}>
      <div className={`${UploadCSS.box} ${props.cname}`}>
        <p>Upload a document to get started</p>
        <input type="file" id='uploadInput' name="filetobase64" className={UploadCSS.uploadInput}  />
        <label className={UploadCSS.uploadLabel} htmlFor="uploadInput">Upload file</label>
        </div>
    </div>
  )
}
