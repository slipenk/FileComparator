import React from "react";
import classes from './OwnName.module.css';
import Logo from "../../icons/User.png";

const LogoName = () => {

    return (
        <div className={classes.flexDivCol}>
            <div className={classes.LogoDiv}>
                <img className={classes.ImageDivSmall} src={Logo} alt="Користувач"/>
            </div>
            <div className={classes.HBer}>
                <h1>SLIPENK</h1>
            </div>
        </div>
    );

};


export default LogoName;