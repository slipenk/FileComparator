import React, {useRef} from "react";
import classes from './LogoName.module.css';
import DropDown from "../UI/DropDown/DropDown";
import LogoU from "../../icons/User.png";


const LogoName = ({logo, value}) => {
    const inputEl = useRef(false);
    const isActive = useRef(false);

    function setLogo() {
        if(localStorage.getItem('IsMenu')) {
            inputEl.current = localStorage.getItem('IsMenu') === 'true';
        }
    }

    const Dropdown = () => {
        if(logo === LogoU) {
            isActive.current = !isActive.current;
            //onMouseEnter={Dropdown} onMouseLeave={Dropdown}
            //{isActive.current && (<DropDown/>)}
        }
    }

    return (
        <div className={classes.flexDivCol}>
            {setLogo()}
            <div className={classes.LogoDiv}>
                <img className={inputEl.current ? classes.ImageDivSmall : classes.ImageDivBig} src={logo} alt={value}
                     />
            </div>
            <div className={inputEl.current ? classes.HBer + " " + classes.HBerSmall : classes.HBer + " " + classes.HBerBig}>
                <h1>{value}</h1>
            </div>
            <DropDown/>
        </div>
    );

};


export default LogoName;