"use client";
import React from "react";
import Popup from "@/app/popup/page";

const download = () => {
    let getParameter = (key: any) => {
        return new URLSearchParams(location.search).get(key);
    }

    const video = getParameter('video') as string;

    return (
        <>
            <h1><a href={video}>Download</a></h1>
        </>
    )
}
export default download