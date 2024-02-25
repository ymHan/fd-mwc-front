"use client";
import React from "react";
import Popup from "@/app/popup/page";

const download = () => {
    let getParameter = (key: any) => {
        return new URLSearchParams(location.search).get(key);
    }

    const video = getParameter('video') as string;

    return (
        <div>
            <a href={video} download={video}><h1>Download File</h1></a>
        </div>
    )
}
export default download