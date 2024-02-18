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
        const res = await fetch("http://localhost:3000/v1/mwc");
        const { data } = await res.json();
        const images = data.filter((d: any) => d.thumbnail.includes(".jpg")).map((d: any) => d.thumbnail);
        setImages(data);

      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleImageClick = (video: string) => {
    setSelectedImage(video);
  };

  const getVideoPath = (video: string) => {
    return `${video}`;
  };

  const generateQ = (video: string) => {
    return `${video}`;
  };
  return (
    <div>
      <ImageList>
        {images.map((item) => (
          <ImageListItem key={item.index}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`http://cdn.4dist.com/mwc/20240215/${item.thumbnail}?w=248&fit=crop&auto=format`}
              alt={item.index}
              loading="lazy"
              onClick={() => {
                handleImageClick(item.download);
                handleOpen();
                console.log('clicked')
              }}
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
      {open &&
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <ReactPlayer url={getVideoPath(selectedImage!)} controls playing={true} />
              <QRCode value={generateQ(selectedImage!)} />
            </Box>
          </Fade>
        </Modal>
      }
    </div>
  );
};
export default Gallery;
