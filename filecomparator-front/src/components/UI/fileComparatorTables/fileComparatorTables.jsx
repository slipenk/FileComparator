import React from "react";
import classes from "./fileComparatorTables.module.css"
import Replace from "../../../icons/Replace.png";

const fileComparatorTables = ({value}) => {
    return (
        <div className={value}>
            <table className={classes.tableTable}>
                <tbody>
                    <tr className={classes.tableRow}>
                        <th className={classes.thFirst}>300 слів</th>
                        <th className={classes.thFirst}>300 розділових знаків</th>
                        <th className={classes.thFirst}>300 символів</th>
                        <th className={classes.thFirst}>300 паліндромів</th>
                        <th>Зберегти</th>
                    </tr>
                </tbody>
            </table>
            <table className={classes.tableTable}>
                <tbody>
                    <tr className={classes.tableRow}>
                        <th className={classes.thFirst}>1/1</th>
                        <th className={classes.thSecond}>Шлях до документа</th>
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