import React from "react";
import classes from "../../FormStyle/FormStyle.module.css";
import classesM from "../Menu/Menu.module.css";
import classesF from "./FileComparator.module.css";
import Circles from "../../components/UI/circle/Circles";
import MyDropzone from "./Dropzone";
import Logo from "../../icons/File.png";

const FileComparator = () => {



    return (
        <div>
            <div className={classes.MainDiv}>
                <div className={classesM.flexDivMenu}>
                    <Circles/>
                    <div className={classesF.flexDivRow}>
                        <div className={classesF.flexDivCol}>
                            <div>
                                <img className={classesF.FileImage} src={Logo} alt={"Файл"}/>
                            </div>
                            <div className={classesF.firstDrop} >
                                <MyDropzone/>
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