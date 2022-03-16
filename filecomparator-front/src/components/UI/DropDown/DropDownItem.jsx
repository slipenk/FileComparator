import React from "react";
import classes from "./DropDown.module.css";
import {Link} from "react-router-dom";

const DropDownItem = ({link, value}) => {
    return (
        <div>
            <Link to={link} className={classes.dropDownItem}>
                {value}
            </Link>
        </div>
    );
};

export default DropDownItem;