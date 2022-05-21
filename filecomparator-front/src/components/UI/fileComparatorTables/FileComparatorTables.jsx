import React, {useState} from "react";
import classes from "./fileComparatorTables.module.css"
import Replace from "../../../icons/Replace.png";
import DropDownForSave from "./DropDownForSave";

const FileComparatorTables = ({value, statistics, isFirstFile, fileName, isUpload, setComparedFalse}) => {

    const [show, setShow] = useState(false);

    const replaceFile = () => {
        isUpload(false);
        isUpload(false);
        setComparedFalse(false);
    }

    const DropdownEnter = () => {
        setShow(!show)
    }

    const DropdownLeave = () => {
        setShow(false)
    }

    return (
        <div className={value}>
            <table className={classes.tableTable + " " + classes.tableTableStat_1}>
                <tbody>
                    <tr>
                        <th className={classes.thFirstStat}>{typeof(statistics) === 'undefined' ? <div> </div> : <div>К-сть слів:<br/> {isFirstFile ? statistics[0] : statistics[4]} </div>}</th>
                        <th className={classes.thFirstStat}>{typeof(statistics) === 'undefined' ? <div> </div> : <div>К-сть розд. знаків:<br/> {isFirstFile ? statistics[1] : statistics[5]} </div>}</th>
                        <th className={classes.thFirstStat}>{typeof(statistics) === 'undefined' ? <div> </div> : <div>К-сть символів:<br/> {isFirstFile ? statistics[2] : statistics[6]} </div>}</th>
                        <th className={classes.thFirstStat}>{typeof(statistics) === 'undefined' ? <div> </div> : <div>К-сть паліндромів:<br/> {isFirstFile ? statistics[3] : statistics[7]} </div>}</th>
                        <th onMouseEnter={DropdownEnter} onMouseLeave={DropdownLeave}><span className={classes.spanStyle}>Зберегти</span>
                            {show && (<DropDownForSave isFirstFile={isFirstFile}/>)}
                        </th>
                    </tr>
                </tbody>
            </table>
            <table className={classes.tableTable + " " + classes.tableTableStat_2}>
                <tbody>
                    <tr>
                        <th className={classes.thFirst}>1/1</th>
                        <th className={classes.thSecond}>{typeof(fileName) === 'undefined' ? <div> </div> : <div>Назва документа: {fileName} </div>}</th>
                        <th>
                            <div className={classes.thThird}>
                                <img onClick={replaceFile} className={classes.iconTable} src={Replace} alt={"Замінити"}/>
                            </div>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default FileComparatorTables;