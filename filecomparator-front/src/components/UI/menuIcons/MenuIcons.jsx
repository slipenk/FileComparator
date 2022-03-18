import React from "react";
import classesM from "./MenuIcons.module.css";
import {Link} from "react-router-dom";


const MenuIcons = ({logo, value, border, path}) => {
    return (
        <div>
            <div style={{borderRight: border}} className={classesM.ColDiv}>
                <img className={classesM.ImageDiv} src={logo} alt={value}/>
                <div className={classesM.HBer}>
                    <h1><Link to={path}>{value}</Link></h1>
                </div>
            </div>
        </div>
    );
};

export default MenuIcons;