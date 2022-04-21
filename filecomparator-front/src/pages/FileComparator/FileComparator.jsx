import React, {useState} from "react";
import classes from "../../FormStyle/FormStyle.module.css";
import classesM from "../Menu/Menu.module.css";
import classesF from "./FileComparator.module.css";
import Circles from "../../components/UI/circle/Circles";
import MyDropzone from "./Dropzone";
import Logo from "../../icons/File.png";
import {ToastContainer} from "react-toastify";
import EditorRight from "../../components/TextEditor/TextEditorRight";
import EditorLeft from "../../components/TextEditor/TextEditorLeft";
import FileComparatorTables from "../../components/UI/fileComparatorTables/fileComparatorTables";
import classesT from "../../components/UI/fileComparatorTables/fileComparatorTables.module.css"
import UnionTable from "../../components/UI/fileComparatorTables/UnionTable";

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
                    <div className={classesF.flexDivRow}>
                        <UnionTable/>
                        <div className={classesF.flexDivCol}>
                            <FileComparatorTables value={classesT.tableTableLeft}/>
                            <div className={classesF.flexDivCol}>
                                <div className={classesF.image}>
                                    {isUploadFileFirst ? <div/> : <img className={classesF.FileImage} src={Logo} alt={"Файл"}/>}
                                </div>
                                {isUploadFileFirst ? <div/> : <MyDropzone isUpload={isUpload} setComparedFiles={setComparedFiles}/>}
                                <div className={classesF.firstDrop} >
                                    {isUploadFileFirst && isCompared ? <EditorLeft file={leftFile}/> : <div/>}
                                    {isUploadFileFirst && !isCompared ? <div/> : <div/>}
                                </div>
                            </div>
                        </div>
                        <div className={classesF.flexDivCol}>
                            <FileComparatorTables value={classesT.tableTableRight}/>
                            <div className={classesF.flexDivCol}>
                                <div className={classesF.image}>
                                 {isUploadFileSecond ? <div/> : <img className={classesF.FileImage} src={Logo} alt={"Файл"}/>}
                                </div>
                                {isUploadFileSecond ? <div/> : <MyDropzone isUpload={isUpload} setComparedFiles={setComparedFiles}/>}
                                <div className={classesF.secondDrop}>
                                    {isUploadFileSecond && isCompared ? <EditorRight file={rightFile}/> : <div/>}
                                    {isUploadFileSecond && !isCompared ? <div/> : <div/>}
                                </div>
                            </div>
                        </div>
                        <Circles/>
                    </div>
                </div>
            </div>
            <ToastContainer className={classes.toast}/>
        </div>
    );
};

export default FileComparator;