import React, {useState} from "react";
import classes from "../../FormStyle/FormStyle.module.css";
import classesM from "../Menu/Menu.module.css";
import classesF from "./FileComparator.module.css";
import Circles from "../../components/UI/circle/Circles";
import MyDropzone from "./Dropzone";
import Logo from "../../icons/File.png";
import {ToastContainer} from "react-toastify";
import TextEditorLeft from "../../components/TextEditor/TextEditorLeft";
import TextEditorRight from "../../components/TextEditor/TextEditorRight";

const FileComparator = () => {

    const [isUploadFileFirst, SetIsUploadFileFirst] = useState(false);
    const [isUploadFileSecond, SetIsUploadFileSecond] = useState(false);

    let counter = 0;

    const isUpload = (value) => {
        counter++;
        if(counter === 1)  {
            SetIsUploadFileFirst(value);
        } else if(counter === 2) {
            counter = 0;
            SetIsUploadFileSecond(value);
        }
    }


    return (
        <div>
            <div className={classes.MainDiv + " " + classesF.overMainDiv}>
                <div className={classesM.flexDivMenu}>
                    <Circles/>
                    <div className={classesF.flexDivRow}>
                        <div className={classesF.flexDivCol}>
                            <div className={classesF.tableStat}>

                            </div>
                            <div>
                                {isUploadFileFirst ? <div/> : <img className={classesF.FileImage} src={Logo} alt={"Файл"}/>}
                            </div>
                            <div className={classesF.firstDrop} >
                                {isUploadFileFirst ? <div/> : <MyDropzone isUpload={isUpload}/>}
                                {isUploadFileFirst ? <TextEditorLeft/> : <div/>}
                            </div>
                        </div>
                        <div className={classesF.flexDivCol}>
                            <div>
                                {isUploadFileSecond ? <div/> : <img className={classesF.FileImage} src={Logo} alt={"Файл"}/>}
                            </div>
                            <div className={classesF.secondDrop}>
                                {isUploadFileSecond ? <div/> : <MyDropzone isUpload={isUpload}/>}
                                {isUploadFileSecond ? <TextEditorRight/> : <div/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer className={classes.toast}/>
        </div>
    );
};

export default FileComparator;