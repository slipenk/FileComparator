import React, {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import classes from "./Dropzone.module.css";
import axios from "../../API/axios";
import diffToast from "../../Toast/Toast";


export default function MyDropzone({isUpload, setComparedFiles}) {
    const UPLOAD_FILE_URL = "/berulia/uploadFile";
    const BORDER = "End File1  bordeeeeeer Start File2";

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        const formData = new FormData();
        formData.append("file", file);

        axios({
            url: UPLOAD_FILE_URL,
            method: 'POST',
            data: formData,
            dataType: 'json',
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            isUpload(true);
            if(response.data) {
                const object = JSON.stringify(response.data);
                const files = object.slice(1, -1).split(BORDER);
                setComparedFiles(files[0]);
                setComparedFiles(files[1]);
            }
        }
        ).catch((err) => {
            console.log(err.response.data)
            /*if(err.response.data) {
                const object = JSON.stringify(err.response.data);
                const message = object.split(":")[1];
                diffToast(message.slice(1, -2));
            } else { */
                diffToast("Помилка при порівнянні файлів");
           // }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p className={classes.DropZoneItem}>Перетягніть файл сюди ...</p> :
                    <p className={classes.DropZoneItem}>Перетягніть ваш документ<br/> сюди або натисність на<br/> іконку, щоб вибрати файл</p>
            }
        </div>
    )
}