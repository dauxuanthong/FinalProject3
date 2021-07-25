import React, { useState, useEffect } from "react";
import "../../css/Upload.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Editor } from "@tinymce/tinymce-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import postAPI from "../../API/postAPI";
function Upload(props) {
  //STATE
  //***data***
  //file state
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState({});
  const [imgURL, setImgURL] = useState([]);
  //text state
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [startPrice, setStartPrice] = useState(0);
  const [auctionAt, setAuctionAt] = useState(undefined);
  const [description, setDescription] = useState("");

  //***Event data***
  const [show, setShow] = useState(1);
  const [filesErr, setFilesErr] = useState(false);
  const [productNameErr, setProductNameErr] = useState(false);
  const [productTypeErr, setProductTypeErr] = useState(false);
  const [startPriceErr, setStartPriceErr] = useState(false);
  const [auctionAtErr, setAuctionAtErr] = useState(false);
  const [descriptionErr, setDescriptionErr] = useState(false);
  const [submitErr, setSubmitErr] = useState(false);

  //EFFECT
  //slide
  useEffect(() => {
    const slideShow = () => {
      const arr = [...imgURL];
      const arrLength = arr?.length;
      arrLength === 0 ? setShow(show) : arrLength <= 5 ? setShow(arrLength) : setShow(5);
    };
    slideShow();
  }, [imgURL]);

  //FUNCTION
  const post = async () => {
    if (
      files.length == 0 ||
      !productName ||
      !productType ||
      !startPrice ||
      !auctionAt ||
      !description
    ) {
      console.log("POST FALSE");
    } else {
      let formData = new FormData();
      const filesArr = [...files];
      filesArr.map(item=>{
        formData.append("file", item);
      })
      const urlFilesRes =  await postAPI.imgUpload(formData);
      console.log(urlFilesRes);
      // const data = {
      //   img: files,
      //   productName: productName,
      //   productType: productType,
      //   startPrice: startPrice,
      //   auctionAt: auctionAt,
      //   description: description,
      // };
      // console.log({ data });
      // const formData = new FormData();
      // formData.append("files", data.img[0]);

      // try {
      //   // console.log("test", data.img[0]);
      //   await postAPI.test(formData);
      //   // await postAPI.upload(data);
      //   console.log("Already post successfully");
      // } catch (error) {
      //   console.log("ERROR: Can't post");
      // }
    }
  };

  const nullValidate = () => {
    if (files.length === 0) {
      setFilesErr(true);
      setSubmitErr(true);
    }
    if (!productName) {
      setProductNameErr(true);
      setSubmitErr(true);
    }
    if (!productType) {
      setProductTypeErr(true);
      setSubmitErr(true);
    }
    if (!startPrice) {
      setStartPriceErr(true);
      setSubmitErr(true);
    }
    if (!auctionAt) {
      setAuctionAtErr(true);
      setSubmitErr(true);
    }
    if (!description) {
      setDescriptionErr(true);
      setSubmitErr(true);
    }
  };

  const resetStatus = () => {
    // setMode("ENABLE");
    setFilesErr(false);
    setProductNameErr(false);
    setProductTypeErr(false);
    setStartPriceErr(false);
    setAuctionAtErr(false);
    setDescriptionErr(false);
    setSubmitErr(false);
  };

  //EVENT
  const productNameOnChange = (e) => {
    setProductName(e.target.value);
  };
  const productTypeOnChange = (e) => {
    setProductType(e.target.value);
  };
  const startPriceOnChange = (e) => {
    setStartPrice(e.target.value);
  };
  const auctionAtOnChange = (e) => {
    setAuctionAt(e.target.value);
  };
  const descriptionOnChange = (value) => {
    setDescription(value);
  };
  //file
  const handleFile = (e) => {
    const newFile = e.target.files[0];
    //check file is exited
    const filesArr = [...files];
    const exitFileName = filesArr.find((item) => item?.name === newFile.name);
    const exitFileSize = filesArr.find((item) => item?.size === newFile.size);
    if (!exitFileName && !exitFileSize) {
      setFiles((prevArr) => [...prevArr, newFile]);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImgURL((prevArr) => [...prevArr, reader.result]);
          setCurrentFile(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      console.log("FILES: ", files);
      console.log("File already existed");
    }
    //reset value of target
    e.target.value = "";
  };

  //choose img
  const chooseImage = (e) => {
    setCurrentFile(e.target.src);
  };

  //choose remove img
  const removeImg = () => {
    let imgURLArr = [...imgURL];
    let filesArr = [...files];
    const currentIndex = imgURLArr.indexOf(currentFile);
    //remove URL arr
    imgURLArr.splice(currentIndex, 1);
    setImgURL(imgURLArr);
    //remove Files arr
    filesArr.splice(currentIndex, 1);
    setFiles(filesArr);
    //change current Img
    currentIndex === 0
      ? setCurrentFile(imgURLArr[imgURLArr?.length - 1])
      : setCurrentFile(imgURLArr[currentIndex - 1]);
  };

  const leftSwitch = () => {
    const imgURLArr = [...imgURL];
    const currentIndex = imgURLArr.indexOf(currentFile);
    currentIndex === 0
      ? setCurrentFile(imgURLArr[imgURLArr?.length - 1])
      : setCurrentFile(imgURLArr[currentIndex - 1]);
  };

  const rightSwitch = () => {
    const imgURLArr = [...imgURL];
    const currentIndex = imgURLArr.indexOf(currentFile);
    currentIndex === imgURLArr.length - 1
      ? setCurrentFile(imgURLArr[0])
      : setCurrentFile(imgURLArr[currentIndex + 1]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    resetStatus();
    nullValidate();
    post();
  };

  //SLIDE
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: show,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2500,
    arrows: true,
  };

  //RETURN
  return (
    <div>
      <form onSubmit={onSubmit} className="upload-form">
        <div className="text-area">
          <div className="item">
            <span>Product name</span>
            <div>
              <input type="text" onChange={productNameOnChange}></input>
              {productNameErr === false ? null : (
                <span className="text-item-message">
                  Please enter your product name and try again!
                </span>
              )}
            </div>
          </div>

          <div className="item">
            <span>Product type</span>
            <div>
              <input type="text" onChange={productTypeOnChange}></input>
              {productTypeErr === false ? null : (
                <span className="text-item-message">
                  Please enter your product type and try again!
                </span>
              )}
            </div>
          </div>

          <div className="item">
            <span>Start price</span>
            <div>
              <input className="price" type="number" onChange={startPriceOnChange}></input>
              {startPriceErr === false ? null : (
                <span className="text-item-message">
                  Please enter your product price and try again!
                </span>
              )}
            </div>
          </div>

          <div className="item">
            <span>Auction at</span>
            <div>
              <input type="datetime-local" onChange={auctionAtOnChange}></input>
              {auctionAtErr === false ? null : (
                <span className="text-item-message">
                  Please enter the auction time and try again!
                </span>
              )}
            </div>
          </div>

          {/* Tiny text editor */}
          <div className="description">
            <Editor
              onEditorChange={descriptionOnChange}
              outputFormat="html"
              init={{
                resize: false,
                height: 400,
                menubar: false,
                branding: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                  "lists link image paste help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic underline backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            {descriptionErr === false ? null : (
              <span className="description-message">
                Please describe your product and try again!
              </span>
            )}
          </div>
        </div>

        <div className="img-area">
          <button className="delete-button" type="button" onClick={removeImg}>
            <RiDeleteBin6Line />
          </button>
          <div className="main-img">
            <button className="slide-button" type="button" onClick={leftSwitch}>
              <FaArrowLeft />
            </button>
            <div className="main-img-background">
              <img src={currentFile} />
            </div>
            <button className="slide-button" type="button" onClick={rightSwitch}>
              <FaArrowRight />
            </button>
          </div>
          <div className="sub-img">
            <div className="sub-img-background">
              {/* using map to render current sub img} */}
              <Slider {...settings}>
                {imgURL?.map((img) => (
                  <div key={imgURL.indexOf(img)}>
                    <div>
                      <img onClick={chooseImage} src={img} />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="add-file">
            <input type="file" onChange={handleFile}></input>
            {filesErr === false ? null : (
              <span>Please provide some images about your product and try again!</span>
            )}
          </div>
        </div>
        <div className="submit">
          <button type="submit">Post</button>
          {submitErr === false ? null : (
            <span>There are some fields need to fill before posting!</span>
          )}
        </div>
      </form>
    </div>
  );
}

export default Upload;
