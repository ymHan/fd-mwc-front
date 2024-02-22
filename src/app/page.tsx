"use client";

import TransitionsModal from "./modal";
import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import QRCode from "qrcode.react";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import { positions } from '@mui/system';
import { Link } from 'react-router-dom';

import Popup from './popup';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  //width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Gallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("https://api.4dist.com/v1/mwc");
        const { data } = await res.json();
        const images = data.filter((d: any) => d.thumbnail.includes(".png")).map((d: any) => d.thumbnail);
        setImages(data);

      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleImageClick = (video: string) => {
    //setSelectedImage(video);
    const popup = window.open(`/popup?video=${video}`, 'Popup', `width=${screen.width}, height=${screen.height},fullscreen=yes`);
  };

  const getVideoPath = (video: string) => {
    return `${video}`;
  };

  const generateQ = (video: string) => {
    const parts = video.split("/");
    const filename = parts[parts.length - 1];
    const url = 'https://api.4dist.com/v1/mwc/'
    return `${url}${filename}`;
  };

  const getDates = () => {
    let months = '';
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    if (month < 10) {
      months = `0${month}`;
    }
    const day = date.getDate();
    return `${year}${months}${day}`;
  }
  return (
    <div>
      <ImageList>
        {images.map((item) => (
          <ImageListItem key={item.index}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`http://cdn.4dist.com/mwc/${getDates()}/${item.thumbnail}?w=248&fit=crop&auto=format`}
              alt={item.index}
              loading="lazy"
              onClick={() => {
                handleImageClick(item.download);
                handleOpen();
              }}
              style={{ cursor: 'pointer' }}
            />
            <ImageListItemBar
              title={item.index}
              subtitle={item.download}
              actionIcon={
                <IconButton
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                  aria-label={`info about ${item.index}`}
                >
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};
export default Gallery;
