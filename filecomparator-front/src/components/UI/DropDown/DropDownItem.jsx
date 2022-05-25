import React from "react";
import classes from "./DropDown.module.css";
import {Link} from "react-router-dom";
import {useAuth} from "../../../context/context";

const DropDownItem = ({link, value}) => {
    const [, setAuth] = useAuth(useAuth);

    function Logout() {
        if(link === "/login") {
            setAuth(false);
        }
    }

    return (
        <div>
            <Link onClick={() => Logout()} to={link} className={classes.dropDownItem}>
                {value}
            </Link>
        </div>
    );
};

export default DropDownItem;