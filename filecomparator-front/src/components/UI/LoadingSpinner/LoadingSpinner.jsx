import React from "react";
import classes from "./LoadingSpinner.module.css"

const LoadingSpinner = () => {
    return (
        <div className={classes.spinnerContainer}>
            <div className={classes.loadingSpinner}/>
        </div>
    );
};

export default LoadingSpinner;