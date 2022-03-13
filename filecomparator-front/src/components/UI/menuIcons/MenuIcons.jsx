import React from "react";
import classesM from "./MenuIcons.module.css";


const MenuIcons = ({logo, value, border}) => {
    return (
        <div>
            <div style={{borderRight: border}} className={classesM.ColDiv}>
                <img className={classesM.ImageDiv} src={logo} alt={value}/>
                <div className={classesM.HBer}>
                    <h1>{value}</h1>
                </div>
            </div>
        </div>
    );
};

export default MenuIcons;