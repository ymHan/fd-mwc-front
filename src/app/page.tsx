"use client";

import React, { useState, useEffect } from "react";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';


const Gallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("https://api.4dist.com/v1/mwc");
        const { data } = await res.json();
        console.log(data)
        const images = data.filter((d: any) => d.thumbnail.includes(".png")).map((d: any) => d.thumbnail);
        setImages(data);

      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleImageClick = (video: string) => {
    const popup = window.open(`/popup?video=${video}`, 'Popup', `width=${screen.width}, height=${screen.height},fullscreen=yes`);
  };

  const getDates = () => {
    const date = new Date().toISOString();
    const formattedDate = date.split('T')[0];

    return formattedDate.replace(/-/g, '');
  }
console.log(getDates())
  return (
    <div>
      <ImageList>
        {images.map((item) => (
          <ImageListItem key={item.index}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`http://cdn.4dist.com/de-01/mwc/${getDates()}/${item.thumbnail}?w=248&fit=crop&auto=format`}
              alt={item.index}
              loading="lazy"
              onClick={() => {
                handleImageClick(item.download);
              }}
              style={{ cursor: 'pointer' }}
            />
            <ImageListItemBar
              title={item.index}
              subtitle={item.download}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};
export default Gallery;
