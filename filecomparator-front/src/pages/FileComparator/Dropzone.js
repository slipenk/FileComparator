import React, {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import classes from "./Dropzone.module.css";
import axios from "../../API/axios";
import diffToastError from "../../Toast/ToastError";
import Tippy from "@tippy.js/react";
import 'tippy.js/dist/tippy.css'


export default function MyDropzone({isUpload, setComparedFiles, setFileName, setOriginalFiles, isLeftFile}) {
    const UPLOAD_FILE_URL = "/berulia/uploadFile";
    const UPLOAD_FILE_DOCX = "/berulia/uploadFileDOCX";
    const BORDER = "End File1  bordeeeeeer Start File2";
    const reader = new FileReader();

    const onDropCallback = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        if(acceptedFiles[0].type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            const formData = new FormData();
            formData.append("file", file);

            axios({
                url: UPLOAD_FILE_DOCX,
                method: 'POST',
                data: formData,
                dataType: 'json',
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                    if(response.data) {
                        const object = JSON.stringify(response.data).slice(1, -1);
                        setOriginalFiles(object);
                    } else if(!response.data) {
                        diffToastError("Проблеми з серверною частиною застосунку");
                    }
                }
            ).catch(() => {
                diffToastError("Проблеми з серверною частиною застосунку");
            })

        } else {
            reader.readAsText(acceptedFiles[0], "UTF-8");
            reader.onload = () => {
                if (!!reader.result) {
                    setOriginalFiles(reader.result);
                }
            }
        }

        setFileName(file.path);

        const text  = localStorage.getItem('user');
        const object = JSON.parse(text);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("userEmail", object.email);
        if (isLeftFile) {
            formData.append("selectedOptionCountingRows", localStorage.getItem("selectedOptionRowsLeft"));
        } else {
            formData.append("selectedOptionCountingRows", localStorage.getItem("selectedOptionRowsRight"));
        }
        axios({
            url: UPLOAD_FILE_URL,
            method: 'POST',
            data: formData,
            dataType: 'json',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: () => {
                isUpload(true);
            }
        }).then((response) => {
            if(response.data) {
                const object = JSON.stringify(response.data);
                const files = object.slice(1, -1).replace(/\\"/g, "\"").split(BORDER);
                setComparedFiles(files[0]);
                setComparedFiles(files[1]);
            } else if(!response.data && !isLeftFile) {
                diffToastError("Помилка під час порівняння файлів. Ймовірна причина - формати обох файлів повинні бути однаковими, а от назви - різними");
            }
        }
        ).catch(() => {
            diffToastError("Помилка під час порівняння файлів");
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone( {
        accept: {
            'text/plain': ['.txt'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        maxFiles: 1,
        maxSize: 100000,
        onDrop: onDropCallback
    })


    return (
        <Tippy className={classes.alignTippy} placement="bottom" content="Підтримувані формати файлів - TXT, DOCX. Максимальний розмір файлу - 100KB">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p className={classes.DropZoneItem}>Перетягніть файл сюди ...</p> :
                        <p className={classes.DropZoneItem}>Перетягніть ваш документ<br/> сюди або натисніть на<br/> текст, щоби вибрати файл</p>
                }
            </div>
        </Tippy>
    )
}