import React, { useState } from "react";
import "../../css/FormUpLoad.css";

function FormUpLoad(props) {
  //STATE
  const [img, setImg] = useState({
    profileImg: "https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-de-thuong.jpg",
  });
  const [imgArr, setImgArr] = useState([]);

  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  //FUNCTION
  const imageHandle = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImg({ profileImg: reader.result });
        // let Arr = imgArr.push({profileImg: reader.result});
        // setImgArr(Arr);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const prNameOnChange = (e) => {
    setProductName(e.target.value);
  };
  const prTypeOnChange = (e) => {
    setProductType(e.target.value);
  };
  const desOnChange = (e) => {
    setDescription(e.target.value);
  };
  const timeOnChange = (e) => {
    setTime(e.target.value);
  };
  const priceOnChange = (e) => {
    setPrice(e.target.value);
  };

  const post = () => {
    const data = {
      img: img,
      productName: productName,
      productType: productType,
      description: description,
      dateTime: time,
      price: price,
    };
    console.log(data);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    post();
  };

  console.log("OUT: ",imgArr);
  return (
    <div className="illustration">
      <form encType="multipart/form-data" onSubmit={onSubmit}>
        <div className="img-area">
          <div className="main-img">
            <img src={img.profileImg}/>
          </div>
          {/* <div className="sub-img">
            {imgArr?.map((img)=>(
              <div key={imgArr.indexOf(img)}>
                <input
                  type="button"
                  onClick="">
                    <img src={img.profileImg}/>
                </input>
              </div>
            ))}
          </div> */}
          <input type="file" name="imgs" onChange={imageHandle} />
        </div>
        <div className="information">
          <div className="info-item">
            <span>Product name</span>
            <input required type="text" name="productName" onChange={prNameOnChange}></input>
          </div>
          <div className="info-item">
            <span>Product type</span>
            <input required type="text" name="productType" onChange={prTypeOnChange}></input>
          </div>
          <div className="description">
            <input required type="text" name="description" onChange={desOnChange}></input>
          </div>
          <div className="info-auction">
            <div className="item-auction">
              <span>Start at</span>
              <input
                required
                type="datetime-local"
                name="startAt"
                onChange={timeOnChange}
              />
            </div>
            <div className="item-auction">
              <span>Starting price</span>
              <input
                required
                type="number"
                min="1"
                name="startingPrice"
                onChange={priceOnChange}
              ></input>
            </div>
          </div>
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default FormUpLoad;
