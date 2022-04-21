import React from "react";
import classesT from "./fileComparatorTables.module.css";

const UnionTable = () => {
    return (
        <div className={classesT.unionTable}>
            <table className={classesT.tableTableUnion}>
                <tr className={classesT.tableRow}>
                    <th className={classesT.thFirstTopTable}>300 змін</th>
                    <th>Однаково - 70%; зміни - 20%</th>
                </tr>
            </table>
        </div>
    );
};

export default UnionTable;