import React from "react";
import classes from "./fileComparatorTables.module.css"
import Replace from "../../../icons/Replace.png";

const fileComparatorTables = ({value, statistics, isFirstFile, fileName}) => {
    return (
        <div className={value}>
            <table className={classes.tableTable + " " + classes.tableTableStat_1}>
                <tbody>
                    <tr>
                        <th className={classes.thFirstStat}>{typeof(statistics) === 'undefined' ? <div> </div> : <div>К-сть слів:<br/> {isFirstFile ? statistics[0] : statistics[4]} </div>}</th>
                        <th className={classes.thFirstStat}>{typeof(statistics) === 'undefined' ? <div> </div> : <div>К-сть розд. знаків:<br/> {isFirstFile ? statistics[1] : statistics[5]} </div>}</th>
                        <th className={classes.thFirstStat}>{typeof(statistics) === 'undefined' ? <div> </div> : <div>К-сть символів:<br/> {isFirstFile ? statistics[2] : statistics[6]} </div>}</th>
                        <th className={classes.thFirstStat}>{typeof(statistics) === 'undefined' ? <div> </div> : <div>К-сть паліндромів:<br/> {isFirstFile ? statistics[3] : statistics[7]} </div>}</th>
                        <th>Зберегти</th>
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
                                <img className={classes.iconTable} src={Replace} alt={"Замінити"}/>
                            </div>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default fileComparatorTables;