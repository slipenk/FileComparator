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
import FileComparatorTables from "../../components/UI/fileComparatorTables/FileComparatorTables";
import classesT from "../../components/UI/fileComparatorTables/fileComparatorTables.module.css"
import UnionTable from "../../components/UI/fileComparatorTables/UnionTable";
import useFileComparator from "./useFileComparator";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";



const FileComparator = () => {

    const {isCompared, leftFile, rightFile, isUploadFileFirst, isUploadFileSecond, isUpload, setComparedFiles, setFileName, statistics, leftFileName, rightFileName, setComparedFalse, leftFileOr, rightFileOr, setOriginalFilesLeft, setOriginalFilesRight, zeroStatistics} = useFileComparator();

    return (
        <div>
            <div className={classes.MainDiv + " " + classesF.overMainDiv}>
                <div className={classesM.flexDivMenu}>
                    <div className={classesF.flexDivRow}>
                        <UnionTable statistics={statistics}/>
                        <div className={classesF.flexDivCol}>
                            <FileComparatorTables value={classesT.tableTableLeft} statistics={statistics} isFirstFile={true} fileName={leftFileName} isUpload={isUpload} setComparedFalse={setComparedFalse} zeroStatistics={zeroStatistics}/>
                            <div className={classesF.flexDivCol}>
                                <div className={classesF.image}>
                                    {isUploadFileFirst ? <div/> : <img className={classesF.FileImage} src={Logo} alt={"Файл"}/>}
                                </div>
                                {isUploadFileFirst ? <div/> : <MyDropzone isUpload={isUpload} setComparedFiles={setComparedFiles} setFileName={setFileName} setOriginalFiles={setOriginalFilesLeft} isLeftFile={true} />}
                                <div className={classesF.firstDrop} >
                                    {isUploadFileFirst && isCompared ? <EditorLeft file={leftFile} fileOr={leftFileOr}/> : <div/>}
                                    {isUploadFileFirst && !isCompared ? <LoadingSpinner/> : <div/>}
                                </div>
                            </div>
                        </div>
                        <div className={classesF.flexDivCol}>
                            <FileComparatorTables value={classesT.tableTableRight} statistics={statistics} isFirstFile={false} fileName={rightFileName}/>
                            <div className={classesF.flexDivCol}>
                                <div className={classesF.image}>
                                 {isUploadFileSecond ? <div/> : <img className={classesF.FileImage} src={Logo} alt={"Файл"}/>}
                                </div>
                                {isUploadFileSecond ? <div/> : <MyDropzone isUpload={isUpload} setComparedFiles={setComparedFiles} setFileName={setFileName} setOriginalFiles={setOriginalFilesRight} isLeftFile={false} />}
                                <div className={classesF.secondDrop}>
                                    {isUploadFileSecond && isCompared ? <EditorRight file={rightFile} fileOr={rightFileOr}/> : <div/>}
                                    {isUploadFileSecond && !isCompared ? <LoadingSpinner/> : <div/>}
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