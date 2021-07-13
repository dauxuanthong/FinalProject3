import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import postAPI from "../../API/postAPI";

function testFrom(props) {
  //STATE
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);
  //EFFECT
  useEffect(()=>{
    postAPI.getFiles()
      .then((response)=>{
        setFileInfos(response);
      })
  },[])
  //FUNCTION
  const Upload = async (file, onUploadProgress) => {
    let formData = new FormData();
    formData.append("file", file);
    let res = await postAPI.upload(file, onUploadProgress);
    return res;
  };
  //EVENT
  const selectFile = (e) => {
    setSelectedFiles(e.target.files);
  };
  const handleUpload = (e) => {
    //get file and setup basic state
    let currentFile = e.selectedFiles[0];
    setProgress(0);
    setCurrentFile(currentFile);
    //Call Upload()
    Upload(currentFile, (e) => {
      setProgress(Math.round((100 * e.loaded) / e.total));
    })
      //Receive message from back-end sever
      .then((response) => {
        setMessage(response.message); //response.data.message
        return postAPI.getFiles();
      })
      .then((files) => {
        setFileInfos(files);
      })
      .catch(() => {
        setProgress(0);
        setMessage("Could not upload the file!");
        setCurrentFile(undefined);
      });
    setSelectedFiles(undefined);
  };

  return(
    <div>
      {currentFile && (
        <div className="progress">
          <div
            className="progress-bar progress-bar-info progress-bar-striped"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: progress + "%" }}>
            {progress}%
          </div>
        </div>
      )}
      <label className="btn btn-default">
          <input type="file" onChange={selectFile}/>
      </label>   
      <button className="btn btn-success"
          disabled={!selectedFiles}
          onClick={handleUpload}
        >
          Upload
      </button>
      <div className="alert alert-light" role="alert">
          {message}
      </div>
      <div className="card">
        <div className="card-header">List of Files</div>
        <ul className="list-group list-group-flush">
          {fileInfos && 
            fileInfos.map((file,index) => (
              <li className="list-group-item" key={index}>
                <a href={file.url}>{file.name}</a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default testFrom;
