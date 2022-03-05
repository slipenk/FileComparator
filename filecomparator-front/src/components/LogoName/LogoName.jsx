import React from "react";
import classes from './LogoName.module.css';
import Logo from "../../icons/Berulia.png";

const LogoName = () => {
    return (
        <div className={classes.flexDivCol}>
            <div>
                <img className={classes.ImageDiv} src={Logo} alt="БЕРУЛЯ"/>
            </div>
            <div className={classes.HBer}>
                <h1>БЕРУЛЯ</h1>
            </div>
        </div>
    );

};


export default LogoName;