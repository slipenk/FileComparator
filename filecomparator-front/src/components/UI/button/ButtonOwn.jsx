import React from "react";
import classes from './ButtonOwn.module.css';

const ButtonOwn = ({children, ...props}) => {
    return (
        <button {...props} className={classes.myBtn}>
            {children}
        </button>
    );
};

export default ButtonOwn;