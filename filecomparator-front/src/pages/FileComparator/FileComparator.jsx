import React from "react";
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
import useFileComparator from "./useFileComparator";



const FileComparator = () => {

    const {isCompared, leftFile, rightFile, isUploadFileFirst, isUploadFileSecond, isUpload, setComparedFiles} = useFileComparator();

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