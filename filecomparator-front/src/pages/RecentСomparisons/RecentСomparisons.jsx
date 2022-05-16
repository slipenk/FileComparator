import React from "react";
import classes from "./RecentComparisons.module.css";
import classesF from '../../FormStyle/FormStyle.module.css';
import Circles from "../../components/UI/circle/Circles";
import classesM from "../Menu/Menu.module.css";
import useRecentComparisons from "./useRecentComparisons";
import {ToastContainer} from "react-toastify";


const RecentComparisons = () => {
    const {recentComparisons} = useRecentComparisons();

    const renderedOutput = recentComparisons.map(item => <td key={item.id}> {item.firstFile} </td> )

    return (
        <div className={classesF.MainDiv}>
            <div className={classesM.flexDivMenu}>
                <Circles/>
                <div className={classes.AlignItems}>
                    <div>
                        <h1 className={classes.namePage}>Останні порівняння</h1>
                    </div>
                    <div>
                        <table className={classes.table}>
                            <tbody>
                            <tr className={classes.tableRow}>
                                <th className={classes.tableCol + " " + classes.firstCol}>Дата та час порівняння</th>
                                <th className={classes.tableCol + " " + classes.secondCol}>Назва 1 файлу</th>
                                <th className={classes.tableCol + " " + classes.secondCol}>Назва 2 файлу</th>
                                <th className={classes.tableCol + " " + classes.otherCol}>Кількість змін</th>
                                <th className={classes.tableCol  + " " + classes.otherCol}>Кількість видалень</th>
                                <th className={classes.tableCol  + " " + classes.otherCol}>Кількість додавань</th>
                                <th className={classes.tableCol  + " " + classes.otherCol}>К-сть однакових символів</th>
                            </tr>
                            <tr className={classes.secondTableRow}>
                                {renderedOutput}
                            </tr>
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