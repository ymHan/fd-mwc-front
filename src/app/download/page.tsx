"use client";
import React from "react";
import Popup from "@/app/popup/page";

const download = () => {
    let getParameter = (key: any) => {
        return new URLSearchParams(location.search).get(key);
    }

    const video = getParameter('video') as string;
    const file = video.match(/\/([^\/?#]+)$/)[1]
    const filename = `${file.split('.')[0]}.html`;
    console.log(filename)
    return (
        <>
            <iframe src={filename} width={'100%'}></iframe>
        </>
    )
}
export default download