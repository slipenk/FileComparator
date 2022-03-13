import React, {useRef} from "react";
import classes from './LogoName.module.css';


const LogoName = ({logo, value}) => {
    const inputEl = useRef(false);

    function setLogo() {
        if(localStorage.getItem('IsMenu')) {
            inputEl.current = localStorage.getItem('IsMenu') === 'true';
        }
    }

    return (
        <div className={classes.flexDivCol}>
            {setLogo()}
            <div className={classes.LogoDiv}>
                <img className={inputEl.current ? classes.ImageDivSmall : classes.ImageDivBig} src={logo} alt={value}/>
            </div>
            <div className={inputEl.current ? classes.HBer + " " + classes.HBerSmall : classes.HBer + " " + classes.HBerBig}>
                <h1>{value}</h1>
            </div>
        </div>
    );

};


export default LogoName;