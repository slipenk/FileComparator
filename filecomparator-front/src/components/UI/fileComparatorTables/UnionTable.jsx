import React from "react";
import classesT from "./fileComparatorTables.module.css";

const UnionTable = ({statistics}) => {
    return (
        <div className={classesT.unionTable}>
            <table className={classesT.tableTableUnion}>
                <tbody>
                    <tr>
                        <th className={classesT.thFirstTopTable + " " + classesT.thFirstCol}>{typeof(statistics) === 'undefined' ? <div> </div> : <div>Кількість змін:<br/> {statistics[8]}</div>}</th>
                        <th className={classesT.thFirstTopTable}>{typeof(statistics) === 'undefined' ? <div> </div> : <div>Кількість видалень:<br/> {statistics[9]}</div>}</th>
                        <th className={classesT.thFirstTopTable}>{typeof(statistics) === 'undefined' ? <div> </div> : <div>Кількість додавань:<br/> {statistics[10]}</div>}</th>
                        <th className={classesT.thFirstTopTable + " " + classesT.thLastCol}>{typeof(statistics) === 'undefined' ? <div> </div> : <div>К-сть однакових символів:<br/> {statistics[11]}</div>}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UnionTable;