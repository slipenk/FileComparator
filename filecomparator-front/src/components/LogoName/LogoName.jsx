import React, {useRef, useState} from "react";
import classes from './LogoName.module.css';
import DropDown from "../UI/DropDown/DropDown";
import LogoU from "../../icons/User.png";
import {useNavigate} from "react-router-dom";


const LogoName = ({logo, value}) => {
    const inputEl = useRef(false);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    function setLogo() {
        if(localStorage.getItem('IsMenu')) {
            inputEl.current = localStorage.getItem('IsMenu') === 'true';
        }
    }

    const DropdownEnter = () => {
        if(logo === LogoU) {
            setShow(!show)
        }
    }

    const DropdownLeave = () => {
        if (logo === LogoU) {
            setShow(false)
        }
    }

    function goToMenu() {
        if(value === "БЕРУЛЯ") {
            navigate("/menu");
        }
    }

    return (
        <div className={classes.flexDivCol}>
            <div onMouseLeave={DropdownLeave}>
                {setLogo()}
                <div className={classes.LogoDiv} onMouseEnter={DropdownEnter}>
                    <img className={inputEl.current ? classes.ImageDivSmall : classes.ImageDivBig} onClick={() => goToMenu()} src={logo} alt={value}/>
                </div>
                <div className={inputEl.current ? classes.HBer + " " + classes.HBerSmall : classes.HBer + " " + classes.HBerBig}>
                    <h1 className={classes.overDiv}>{value}</h1>
                </div>
                {show && (<DropDown/>)}
            </div>
        </div>
    );

};


export default LogoName;