import React, {useState} from "react";
import classes from "./RecentComparisons.module.css";
import classesF from '../../FormStyle/FormStyle.module.css';
import Circles from "../../components/UI/circle/Circles";
import classesM from "../Menu/Menu.module.css";
import useRecentComparisons from "./useRecentComparisons";
import {ToastContainer} from "react-toastify";
import InputOwn from "../../components/UI/input/InputOwn";


const RecentComparisons = () => {
    const {recentComparisons} = useRecentComparisons();

    const [q, setQ] = useState("");
    const labels = ["firstFile", "secondFile", "countOfChanges",
    "countOfDeletions", "countOfAdditions", "countOfSimilarSymbols"];


    const filteredOutput = recentComparisons.filter(item =>
            labels.some((column) => item[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1)
    );

    const renderedOutput = filteredOutput.map(item => {
            return (
                <tr className={classes.secondTableRow} key={item.id}>
                    <td className={classes.tdStyles + " " + classes.tdStylesF}> {item.dateTimeComparing.slice(0, 19).replace(/T/g, " : ")} </td>
                    <td className={classes.tdStyles}> {item.firstFile} </td>
                    <td className={classes.tdStyles}> {item.secondFile} </td>
                    <td className={classes.tdStyles}> {item.countOfChanges} </td>
                    <td className={classes.tdStyles}> {item.countOfDeletions} </td>
                    <td className={classes.tdStyles}> {item.countOfAdditions} </td>
                    <td className={classes.tdStyles}> {item.countOfSimilarSymbols} </td>
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
                    <div className={classes.searchField}>
                        <InputOwn type="text"
                                  placeholder="Пошук"
                                  name="search_field"
                                  value={q}
                                  onChange={(e) => setQ(e.target.value)}
                                  autoComplete="off"
                                  style={{border: '0.3vw solid black', width: '10vw', height: '2vw'}}
                              />
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