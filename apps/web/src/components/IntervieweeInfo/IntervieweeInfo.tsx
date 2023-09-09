import { useCallback } from 'react';
import Webcam from 'react-webcam';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRef, useState } from 'react';
import styles from '../IntervieweeInfo/index.module.css';

type IntervieweeInfoProps = {
  setUrl: (image: string) => void;
};

const IntervieweeInfo = ({ setUrl }: IntervieweeInfoProps) => {
  const videoConstraints = {
    width: 650,
    height: 365,
    aspectRatio: 16 / 9,
  };

  const webRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | undefined>(undefined);

  const capturePicture = useCallback(() => {
    const imageSrc = webRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
      setUrl(imageSrc);
    }
  }, [webRef]);

  const deletePicture = useCallback(() => {
    setImage('');
    setUrl('');
  }, [webRef]);

  return (
    <div>
      <Webcam
        style={{ display: image ? 'none' : 'flex' }}
        width={650}
        height={365}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        ref={webRef}
      />

      <img src={image} style={{ display: image ? 'flex' : 'none' }} />
      <IconButton
        style={{
          color: '#1976d2',
          position: 'absolute',
          bottom: '0',
          marginLeft: 'auto',
        }}
        onClick={() => {
          image ? deletePicture() : capturePicture();
        }}
        aria-label="delete"
        size="large"
      >
        {image ? <DeleteIcon /> : <PhotoCamera />}
      </IconButton>
    </div>
  );
};

export default IntervieweeInfo;
