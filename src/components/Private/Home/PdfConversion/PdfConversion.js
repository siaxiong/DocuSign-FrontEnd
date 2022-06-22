import React from 'react';


const fileToBase64 = (file, cb) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function () {
    cb(null, reader.result.split(',')[1])
  }
  reader.onerror = function (error) {
    cb(error, null)
  }
}

export const onUploadFileChange = ( {target} ) => {
  if (target.files < 1 || !target.validity.valid) {
    return
  }
  fileToBase64(target.files[0], (err, result) => {
    return result;
  })
}

