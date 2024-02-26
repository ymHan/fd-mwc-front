"use client";
import React from "react";
import ReactPlayer from "react-player";
import QRCode from "qrcode.react";

const Popup = () => {
  let getParameter = (key: any) => {
    return new URLSearchParams(location.search).get(key);
  }

  const video = getParameter('video') as string;


  const getVideoPath = (video: string) => {
    return `${video}`;
  };

  const generateQ = (url: string) => {

    const fils = url.match(/\/([^\/?#]+)$/)[1]
    const filename = fils.split('.')[0];
    return `http://mwc.4dist.com/download/${filename}.html`;

    //return `${url}`;
  };

  return (
    <>
      <div className={"Player"} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10000000 }}>
        <ReactPlayer url={getVideoPath(video!)} controls playing={true} loop={true} wrapper={'span'} />
      </div>
      <QRCode value={generateQ(video!)} style={{
        position: 'absolute',
        top: '32px',
        right: '32px',
        background: 'rgb(255, 255, 255)',
        padding: '5px',
        margin: 'auto',
        transition: '0.5s ease',
        zIndex: 10000000
      }} />
    </>
  );
}
export default Popup