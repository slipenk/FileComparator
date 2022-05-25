import React from "react";
import classes from "../DropDown/DropDown.module.css";
import useDropDownForSave from "./useDropDownForSave";

const DropDownForSave = ({isFirstFile}) => {

    const {saveFileFromEditors} = useDropDownForSave(isFirstFile);

    return (
        <div className={classes.dropDownSave + " " + classes.dropDown}>
            <span onClick={() => saveFileFromEditors('txt', 'text/plain')} className={classes.spanStyle}>TXT</span>
            <hr className={classes.lineSave}/>
            <span onClick={() => saveFileFromEditors('docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')} className={classes.spanStyle}>DOCX</span>
            <hr className={classes.lineSave}/>
            <span onClick={() => saveFileFromEditors('html', 'text/html')} className={classes.spanStyle}>HTML</span>
        </div>
    );
};

export default DropDownForSave;