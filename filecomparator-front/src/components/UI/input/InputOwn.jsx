import React from "react";
import classes from './InputOwn.module.css';

const InputOwn = React.forwardRef((props, ref) => {
    return (
        <input ref={ref} className={classes.myInput} {...props}/>
    );
});

export default InputOwn;