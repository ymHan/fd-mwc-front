/*
"use client";
import React from "react";
import Popup from "@/app/popup/page";

const download = () => {
    let getParameter = (key: any) => {
        return new URLSearchParams(location.search).get(key);
    }

    const video = getParameter('video') as string;
    const file = video.match(/\/([^\/?#]+)$/)[1]
    const filename = `${file.split('.')[0]}`;
    console.log(filename)
    return (
        <>
            <iframe src={filename } width={'100%'}></iframe>
        </>
    )
}
export default download*/
'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { iframeCode } from './iframe';

const page = () => {
    const searchParams = useSearchParams();
    const url = searchParams.get('video') as string;
    const pid = url.match(/\/([^\/?#]+)$/)[1];

    return (
      <div>
          <li>
              <div
                dangerouslySetInnerHTML={{
                    __html: iframeCode(pid),
                }}
              />
          </li>
      </div>
    );
};

export default page;