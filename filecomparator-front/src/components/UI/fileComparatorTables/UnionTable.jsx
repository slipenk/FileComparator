import React from "react";
import classesT from "./fileComparatorTables.module.css";

const UnionTable = () => {
    return (
        <div className={classesT.unionTable}>
            <table className={classesT.tableTableUnion}>
                <tbody>
                    <tr>
                        <th className={classesT.thFirstTopTable + " " + classesT.thFirstCol}>Кількість змін:<br/> 300</th>
                        <th className={classesT.thFirstTopTable}>Кількість видалень:<br/> 300</th>
                        <th className={classesT.thFirstTopTable}>Кількість додавань:<br/> 300</th>
                        <th className={classesT.thFirstTopTable + " " + classesT.thLastCol}>Однакових символів:<br/> 300</th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UnionTable;