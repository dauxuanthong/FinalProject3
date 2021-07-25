import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

function AnotherTest(props) {
  const [selectedFile, setSelectedFile] = useState(undefined);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files);
  };

  const handleSubmission = () => {
    console.log(selectedFile);
  };

  const { getRootProps, getInputProps } = useDropzone();
  return (
    <div>
      <input type="file" name="file" onChange={changeHandler}/>
      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
      <div {...getRootProps()}>
        <input {...getInputProps()}/>
      </div>
    </div>
  );
}
export default AnotherTest;
