import React, {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import classes from "./Dropzone.module.css";
import axios from "../../API/axios";
import diffToastError from "../../Toast/ToastError";


export default function MyDropzone({isUpload, setComparedFiles, setFileName, setOriginalFiles}) {
    const UPLOAD_FILE_URL = "/berulia/uploadFile";
    const BORDER = "End File1  bordeeeeeer Start File2";
    const reader = new FileReader();

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        reader.readAsText(acceptedFiles[0], "UTF-8")
        reader.onload = () => {
            if (!!reader.result) {
                setOriginalFiles(reader.result);
            }
        }

        setFileName(file.path);

        const text  = localStorage.getItem('user');
        const object = JSON.parse(text);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("userEmail", object.email);

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
        ).catch(() => {
            diffToastError("Помилка при порівнянні файлів");
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