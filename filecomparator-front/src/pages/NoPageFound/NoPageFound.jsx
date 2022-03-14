import React from "react";
import classes from "../../FormStyle/FormStyle.module.css";
import {Link} from "react-router-dom";
import LogoName from "../../components/LogoName/LogoName";
import Logo from "../../icons/Berulia.png";

const NoPageFound = () => {

    return (
        <div className={classes.MainDiv}>
            <div className={classes.flexDiv}>
                {localStorage.setItem('IsMenu', 'false')}
                <LogoName logo={Logo} value={"БЕРУЛЯ"}/>
                <div>
                    <div className={classes.alreadyReg + " " + classes.alreadyRegLogin}>
                        <h1>
                            Такої сторінки не існує :(
                        </h1>
                        <div>
                            <Link to="/login" > <i>Перейти на сторінку входу</i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoPageFound;