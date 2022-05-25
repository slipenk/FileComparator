import React from "react";
import classes from "./DropDown.module.css";
import DropDownItem from "./DropDownItem";


const DropDown = () => {
    return (
        <div className={classes.dropDown}>
            <DropDownItem value="Особистий кабінет" link="/personalaccount"/>
            <hr className={classes.line}/>
            <DropDownItem value="Вихід" link="/login"/>
        </div>
    );
};

export default DropDown;