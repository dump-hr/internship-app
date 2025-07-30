import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import IconButton from '@mui/material/IconButton';
import { useRef } from 'react';
import Webcam from 'react-webcam';

import styles from './index.module.css';

type WebcameraProps = {
  image: string;
  setImage: (image: string) => void;
};

export const Webcamera = ({ image, setImage }: WebcameraProps) => {
  const videoConstraints = {
    width: 650,
    height: 365,
    aspectRatio: 16 / 9,
  };

  const webRef = useRef<Webcam>(null);

  const handleCapturePicture = () => {
    const imageSrc = webRef.current?.getScreenshot();

    setImage(imageSrc || '');
  };

  const handleDeletePicture = () => {
    setImage('');
  };

  return (
    <div className={styles.camera}>
      {!image && (
        <Webcam
          style={{ display: 'flex' }}
          width={videoConstraints.width}
          height={videoConstraints.height}
          audio={false}
          screenshotFormat="image/png"
          videoConstraints={videoConstraints}
          ref={webRef}
        />
      )}

      <img src={image} style={{ display: image ? 'flex' : 'none' }} />
      <IconButton
        style={{
          color: '#1976d2',
          position: 'absolute',
          bottom: '0',
          marginLeft: 'auto',
        }}
        onClick={image ? handleDeletePicture : handleCapturePicture}
        aria-label="delete"
        size="large"
      >
        {image ? <DeleteIcon color="error" /> : <PhotoCamera />}
      </IconButton>
    </div>
  );
};
