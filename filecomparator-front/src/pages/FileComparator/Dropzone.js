import React, {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import "./Dropzone.module.css";

export default function MyDropzone() {
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Перетягніть файл сюди ...</p> :
                    <p>Перетягніть ваш документ<br/> сюди або натисність на<br/> іконку, щоб вибрати файл</p>
            }
        </div>
    )
}