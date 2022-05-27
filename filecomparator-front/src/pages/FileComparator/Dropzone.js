import React, {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import classes from "./Dropzone.module.css";
import axios from "../../API/axios";
import diffToastError from "../../Toast/ToastError";
import Tippy from "@tippy.js/react";
import 'tippy.js/dist/tippy.css'


export default function MyDropzone({isUpload, setComparedFiles, setFileName, setOriginalFiles, isLeftFile}) {
    const UPLOAD_FILE_URL = "/berulia/uploadFile";
    const BORDER = "End File1  bordeeeeeer Start File2";
    const reader = new FileReader();


    const onDropCallback = useCallback(acceptedFiles => {
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
            } else if(!response.data && !isLeftFile) {
                diffToastError("Помилка при порівнянні файлів. Ймовірна причина - формати обох файлів повинні бути однаковими");
            }
        }
        ).catch(() => {
            diffToastError("Помилка при порівнянні файлів");
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone( {
        accept: {
            'text/plain': ['.txt'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        maxFiles: 1,
        onDrop: onDropCallback
    })


    return (
        <Tippy placement="bottom" content="Підтримувані формати файлів - TXT, DOCX">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p className={classes.DropZoneItem}>Перетягніть файл сюди ...</p> :
                        <p className={classes.DropZoneItem}>Перетягніть ваш документ<br/> сюди або натисність на<br/> текст, щоби вибрати файл</p>
                }
            </div>
        </Tippy>
    )
}