import React, {useState} from "react";
import classes from "./fileComparatorTables.module.css"
import Replace from "../../../icons/Replace.png";
import Ukraine from "../../../icons/Ukraine.png";
import DropDownForSave from "./DropDownForSave";
import Tippy from "@tippy.js/react";
import 'tippy.js/dist/tippy.css'
import RadioButtons from "../radiobuttons/RadioButtons";

const FileComparatorTables = ({value, statistics, isFirstFile, fileName, isUpload, setComparedFalse, zeroStatistics}) => {

    const [show, setShow] = useState(false);

    const replaceFile = () => {
        isUpload(false);
        isUpload(false);
        setComparedFalse(false);
        zeroStatistics();
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
                        <th className={classes.thSecond}><RadioButtons isFirstFile={isFirstFile}/></th>
                    </tr>
                </tbody>
            </table>
            <table className={classes.tableTable + " " + classes.tableTableStat_2}>
                <tbody>
                    <tr>
                        <th className={classes.thFirst}>
                            <Tippy placement="bottom" content={"Слава Україні!"}>
                                <div className={classes.thThird}>
                                    <img className={classes.iconTable} src={Ukraine} alt={"Україна"}/>
                                </div>
                            </Tippy>
                        </th>
                        <th className={classes.thSecond}>{typeof(fileName) === 'undefined' ? <div> </div> : <div>Назва документа: {fileName} </div>}</th>
                        <th>
                            <Tippy placement="bottom" content={"Замінити документи"}>
                                <div className={classes.thThird}>
                                    <img onClick={replaceFile} className={classes.iconTable} src={Replace} alt={"Замінити"}/>
                                </div>
                            </Tippy>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default FileComparatorTables;