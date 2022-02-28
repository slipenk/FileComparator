import React from "react";
import classes from './SubmitButtonForm.module.css';
import ButtonOwn from "../UI/button/ButtonOwn";

const SubmitButtonForm = (props) => {
    return (
        <div className={classes.col_input_btn}>
            <ButtonOwn>{props.value}</ButtonOwn>
        </div>
    );
};


export default SubmitButtonForm;