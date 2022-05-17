import React from "react";
import classes from "./RecentComparisons.module.css";
import classesF from '../../FormStyle/FormStyle.module.css';
import Circles from "../../components/UI/circle/Circles";
import classesM from "../Menu/Menu.module.css";
import useRecentComparisons from "./useRecentComparisons";
import {ToastContainer} from "react-toastify";


const RecentComparisons = () => {
    const {recentComparisons} = useRecentComparisons();


    const renderedOutput = recentComparisons.map(item => {
            return (
                <tr className={classes.secondTableRow} key={item.id}>
                    <td className={classes.tdStyles + " " + classes.tdStylesF}> {item.dateTimeComparing.slice(0, 19).replace(/T/g, " : ")} </td>
                    <td className={classes.tdStyles + " " + classes.tdStylesM}> {item.firstFile.slice(0, 19)} </td>
                    <td className={classes.tdStyles + " " + classes.tdStylesM}> {item.secondFile.slice(0, 19)} </td>
                    <td className={classes.tdStyles + " " + classes.tdStylesM}> {item.countOfChanges} </td>
                    <td className={classes.tdStyles + " " + classes.tdStylesM}> {item.countOfDeletions} </td>
                    <td className={classes.tdStyles + " " + classes.tdStylesM}> {item.countOfAdditions} </td>
                    <td className={classes.tdStyles + " " + classes.tdStylesM}> {item.countOfSimilarSymbols} </td>
                </tr>
        )
        }
    )

    return (
        <div className={classesF.MainDiv}>
            <div className={classesM.flexDivMenu}>
                <Circles/>
                <div className={classes.AlignItems}>
                    <div>
                        <h1 className={classes.namePage}>Останні порівняння</h1>
                    </div>
                    <div className={classes.scrollableTable}>
                        <table>
                            <tbody>
                            <tr className={classes.tableRow}>
                                <td className={classes.tableCol + " " + classes.tdStylesMFirst}>Дата та час порівняння</td>
                                <td className={classes.tableCol}>Назва 1 файлу</td>
                                <td className={classes.tableCol}>Назва 2 файлу</td>
                                <td className={classes.tableCol}>Кількість змін</td>
                                <td className={classes.tableCol}>Кількість видалень</td>
                                <td className={classes.tableCol}>Кількість додавань</td>
                                <td className={classes.tableCol + " " + classes.tdStylesMLast}>К-сть однакових символів</td>
                            </tr>
                            {renderedOutput}
                            </tbody>
                         </table>
                    </div>
                </div>
            </div>
            <ToastContainer className={classesF.toast}/>
        </div>
    );
};


export default RecentComparisons;