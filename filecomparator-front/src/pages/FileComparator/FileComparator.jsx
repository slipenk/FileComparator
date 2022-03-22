import React, {useState} from "react";
import classes from "../../FormStyle/FormStyle.module.css";
import classesM from "../Menu/Menu.module.css";
import classesF from "./FileComparator.module.css";
import Circles from "../../components/UI/circle/Circles";
import MyDropzone from "./Dropzone";
import Logo from "../../icons/File.png";
import TextEditor from "../../components/TextEditor/TextEditor";

const FileComparator = () => {

    const [isUploadFile, SetIsUploadFile] = useState(false);

    const isUpload = (value) => {
        SetIsUploadFile(value);
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
                                {isUploadFile ? <div/> : <img className={classesF.FileImage} src={Logo} alt={"Файл"}/>}
                            </div>
                            <div className={classesF.firstDrop} >
                                {isUploadFile ? <div/> : <MyDropzone isUpload={isUpload}/>}
                                {isUploadFile ? <TextEditor/> : <div/>}
                            </div>
                        </div>
                        <div className={classesF.flexDivCol}>
                            <div>
                                <img className={classesF.FileImage} src={Logo} alt={"Файл"}/>
                            </div>
                            <div className={classesF.secondDrop}>
                                <MyDropzone/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileComparator;