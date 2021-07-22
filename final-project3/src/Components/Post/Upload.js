import React, { useState, useEffect } from "react";
import "../../css/Upload.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Editor } from "@tinymce/tinymce-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
function Upload(props) {
  //STATE
  //***data***
  //file state
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState({});
  const [imgURL, setImgURL] = useState([]);
  const [currentFileURL, setCurrentFileURL] = useState({});
  const [imgKey, setImgKey] = useState(0);
  //text state
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [startPrice, setStartPrice] = useState(0);
  const [auctionAt, setAuctionAt] = useState(undefined);
  const [description, setDescription] = useState("");

  //***Event data***
  const [show, setShow] = useState(1);
  const [mode, setMode] = useState("ENABLE");
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
  const post = () => {
    const data = {
      img: files,
      productName: productName,
      productType: productType,
      startPrice: startPrice,
      auctionAt: auctionAt,
      description: description,
    };
    console.log({ data });
  };

  const nullValidate = () => {
    setMode("ENABLE");
    !files && setMode("DISABLE") && setFilesErr(true);
    !productName && setMode("DISABLE") && setProductNameErr(true);
    !productType && setMode("DISABLE") && setProductTypeErr(true);
    !startPrice && setMode("DISABLE") && setStartPriceErr(true);
    !auctionAt && setMode("DISABLE") && setAuctionAtErr(true);
    !description && setMode("DISABLE") && setDescriptionErr(true);
  };

  const resetStatus = () => {
    setMode("ENABLE");
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
  // const handleFile = (e) => {
  //   setCurrentFile(e.target.files[0]);
  //   const arr = [...files];
  //   arr.push(e.target.files[0]);
  //   setFiles(arr);
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       let arr2 = [...imgURL];
  //       arr2.push(reader.result);
  //       setImgURL(arr2);
  //     }
  //   };
  //   reader.readAsDataURL(e.target.files[0]);
  // };

  const handleFile = (e) => {
    const newFile = e.target.files[0];
    setFiles((prevArr) => [...prevArr, newFile]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImgURL((prevArr) => [...prevArr, reader.result]);
        setCurrentFile(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  //choose img
  const chooseImage = (e) => {
    setCurrentFile(e.target.src);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    resetStatus();
    nullValidate();
    mode === "ENABLE" ? post() : setSubmitErr(true);
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
              <span className="text-item-message">
                Please enter your product name and try again!
              </span>
            </div>
          </div>

          <div className="item">
            <span>Product type</span>
            <div>
              <input type="text" onChange={productTypeOnChange}></input>
              <span className="text-item-message">
                Please enter your product type and try again!
              </span>
            </div>
          </div>

          <div className="item">
            <span>Start price</span>
            <div>
              <input className="price" type="number" onChange={startPriceOnChange}></input>
              <span className="text-item-message">
                Please enter your product price and try again!
              </span>
            </div>
          </div>

          <div className="item">
            <span>Auction at</span>
            <div>
              <input type="datetime-local" onChange={auctionAtOnChange}></input>
              <span className="text-item-message">
                Please enter the auction time and try again!
              </span>
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
            <span className="description-message">Please describe your product and try again!</span>
          </div>
        </div>

        <div className="img-area">
          <button className="delete-button">
            <RiDeleteBin6Line />
          </button>
          <div className="main-img">
            <button className="slide-button">
              <FaArrowLeft />
            </button>
            <div className="main-img-background">
              <img src={currentFile} />
            </div>
            <button className="slide-button">
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
          </div>
        </div>
        <span className="">Please provide some images about your product and try again</span>
        <button type="submit">Post</button>
        <span className="post-message">There are some fields need to fill before posting</span>
      </form>
    </div>
  );
}

export default Upload;
