import React, {useState} from "react";
import classes from "../../FormStyle/FormStyle.module.css";
import classesM from "../Menu/Menu.module.css";
import classesF from "./FileComparator.module.css";
import classesT from "./FileComparatorTable.module.css";
import Circles from "../../components/UI/circle/Circles";
import MyDropzone from "./Dropzone";
import Logo from "../../icons/File.png";
import Replace from "../../icons/Replace.png";
import {ToastContainer} from "react-toastify";
import EditorRight from "../../components/TextEditor/TextEditorRight";
import EditorLeft from "../../components/TextEditor/TextEditorLeft";

const FileComparator = () => {

    const [isUploadFileFirst, SetIsUploadFileFirst] = useState(false);
    const [isUploadFileSecond, SetIsUploadFileSecond] = useState(false);
    const [isCompared, setIsCompared] = useState(false);
    const [leftFile, setLefFile] = useState("");
    const [rightFile, setRightFile] = useState("");

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

    const setComparedFiles = (value) => {
        counter++;
        if(counter === 1)  {
            setLefFile(value.replace(/`/g, '"'));
        } else if(counter === 2) {
            counter = 0;
            setRightFile(value.replace(/`/g, '"'));
            setIsCompared(true);
        }
    }



    return (
        <div>
            <div className={classes.MainDiv + " " + classesF.overMainDiv}>
                <div className={classesM.flexDivMenu}>
                    <Circles/>
                    <div className={classesF.flexDivRow}>
                        <div className={classesF.flexDivCol}>
                            <div>
                                <table className={classesT.tableTable}>
                                    <tr className={classesT.tableRow}>
                                        <th>1/1</th>
                                        <th>Шлях до документа</th>
                                        <th><img className={classesT.iconTable} src={Replace} alt={"Замінити"}/></th>
                                    </tr>
                                </table>
                            </div>
                            <div>
                                {isUploadFileFirst ? <div/> : <img className={classesF.FileImage} src={Logo} alt={"Файл"}/>}
                            </div>
                            <div className={classesF.firstDrop} >
                                {isUploadFileFirst ? <div/> : <MyDropzone isUpload={isUpload} setComparedFiles={setComparedFiles}/>}
                                {isUploadFileFirst && isCompared ? <EditorLeft file={leftFile}/> : <div/>}
                                {isUploadFileFirst && !isCompared ? <div/> : <div/>}
                            </div>
                        </div>
                        <div className={classesF.flexDivCol}>
                            <div className={classesF.tableStat}>

                            </div>
                            <div>
                                {isUploadFileSecond ? <div/> : <img className={classesF.FileImage} src={Logo} alt={"Файл"}/>}
                            </div>
                            <div className={classesF.secondDrop}>
                                {isUploadFileSecond ? <div/> : <MyDropzone isUpload={isUpload} setComparedFiles={setComparedFiles}/>}
                                {isUploadFileSecond && isCompared ? <EditorRight file={rightFile}/> : <div/>}
                                {isUploadFileSecond && !isCompared ? <div/> : <div/>}
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