"use client";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import QRCode from "qrcode.react";
//import { URLSearchParams } from "url-search-params";
const Popup = (props) => {
  let getParameter = (key) => {
    return new URLSearchParams(location.search).get(key);
  }

  const video = getParameter('video') as string;
  const parts = video.split("/");
  const filename = parts[parts.length - 1];



  const getVideoPath = (video: string) => {
    return `${video}`;
  };

  const generateQ = (filename: string) => {
    return `${filename}`;
  };

  async function getFile() {
    con
  }

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