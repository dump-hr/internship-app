import React, { useCallback } from "react";
import Webcam from "react-webcam";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRef, useState } from "react";

type Info = {
    fullName: string,
    email: string,
    phone: string,
    dateOfBirth: string,
    workingStatus: "Učenik" | "Student" | "Nezaposlen" | "Zaposlen",
    institutionName: string,
    yearOfStudy: number,
    field: "Dev" | "Design" | "Marketing" | "Multimedija",
    referral: "Društvenih mreža" | "Predstavljanja na fakultetima/školama" | "Medija" | "Prijatelja ili poznanika" | "Ostalo"
    applicationMotivation: string
}

type IntervieweeInfoProps = {
    setUrl: (image: string) => void,
    info: Info
}

const IntervieweeInfo = ({ setUrl, info }: IntervieweeInfoProps) => {
    const videoConstraints = {
        width: 650,
        height: 365,
        aspectRatio: 16 / 9,
    }

    const webRef = useRef<Webcam>(null);
    const [image, setImage] = useState<string | undefined>(undefined);

    const capturePicture = useCallback(() => {
        const imageSrc = webRef.current?.getScreenshot();
        if (imageSrc) {
            setImage(imageSrc);
            setUrl(imageSrc)
        }
    }, [webRef]);

    const deletePicture = useCallback(() => {
        setImage("");
        setUrl("")
    }, [webRef]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                width: "650px",
                margin: "auto",
                marginBottom: "50px",
                fontFamily: '"Roboto","Helvetica","Arial"'
            }}>

            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                padding: "10px 0px",
                boxSizing: "border-box"
            }}>

                <h1>{info.fullName}</h1>
                <div>
                    <div>
                        <div>Email: {info.email}</div>
                        <div>Mobitel: {info.phone} </div>
                        <div>Datum rođenja: {info.dateOfBirth}</div>
                        <div>{info.workingStatus}, {info.institutionName}, {info.yearOfStudy}</div>

                        <div>Područje: {info.field}
                        </div>
                        <div>Kako si saznao/la za internship: {info.referral}</div>
                        <div>Zašto se prijavljujes na internships: {info.applicationMotivation}</div>
                    </div>
                </div>
            </div>

            <Webcam
                style={{ display: image ? "none" : "flex" }}
                width={650}
                height={365}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                ref={webRef}
            />

            <img src={image} style={{ display: image ? "flex" : "none" }} />
            <IconButton style={{
                color: "#1976d2",
                position: "absolute",
                bottom: "0",
                marginLeft: "auto"
            }}
                onClick={() => { image ? deletePicture() : capturePicture() }} aria-label="delete" size="large">
                {image ? <DeleteIcon /> : <PhotoCamera />}
            </IconButton>
        </div>
    );
};

export default IntervieweeInfo;
