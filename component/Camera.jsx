import React, { useState, useRef } from 'react';
import { PassImg } from '@/request/api'
import { Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
const CameraComponent = () => {
  const [isShowCamera, setIsShowCamera] = useState("none");
  const [photo, setPhoto] = useState();
  const photoRef = useRef(null);
  const width = "400";
  const height = "400";
  const cameraRef = useRef(null);
  const handleOpenCamera = async () => {
    await navigator.mediaDevices.getUserMedia({
      video: {
        width,
        height,
        audio: false,
        deviceId: "default",
        facingMode: "user",
        facingMode: "environment"
      },
    })
      .then((stream) => {
        let video = cameraRef.current;
        video.srcObject = stream;
        setIsShowCamera("block")
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };
  //拍照
  const handleTakePhoto = () => {
    const target = photoRef.current;
    const ctx = target.getContext("2d");
    target.width = width;
    target.height = height;
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(cameraRef.current, 0, 0, width, height);
    console.log(target);
    const imgStr = target.toDataURL();
    console.log(imgStr);
    const base64Img = imgStr.split(';base64,').pop();
    setPhoto(base64Img);
  };


  function base64toFile(base64Data, filename) {
    const arr = base64Data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

  //图片传给后端
  const uploadImg = async () => {
    // let data = new FormData();
    // data.append('img', photo)
    // console.log(photo.length);
    // const file = base64toFile(photo, 'image.jpg');
    // const formData = new FormData();
    // formData.append('img', file);
    // console.log(formData.get("img"));
    try {
      await PassImg(photo).then((res) => {
        console.log(res);
      })
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="w-[100vw]">
      <div
        className='w-[100vw] flex justify-center'>
        <video
          style={{ display: isShowCamera }}
          height={400}
          width={400}
          // style={{ transform: 'rotateY(-180deg)' }}
          ref={cameraRef}
        >
        </video>
      </div>
      <button onClick={() => handleOpenCamera()}>打開相機</button>
      <div
        className='w-[100vw] flex justify-center'
      >
        <canvas
          height={200}
          width={300}
          ref={photoRef}
          style={{ width: '100%', height: '400px' }}
        >
        </canvas>
      </div>
      <button onClick={() => handleTakePhoto()}>拍照</button>
      <LoadingButton
        onClick={() => uploadImg()}
        variant="contained"
        sx={{ width: "15.9rem", height: "2.31rem", borderRadius: "1.125rem" }}
        style={{ backgroundColor: "#050505" }}
      >
        uploadImg
      </LoadingButton>
    </div>
  );
};

export default CameraComponent
