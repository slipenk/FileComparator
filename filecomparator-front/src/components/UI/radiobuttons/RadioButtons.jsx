import React from "react";
import useRadioButtons from "./useRadioButtons";
import classes from "./RadioButtons.module.css";
import Tippy from "@tippy.js/react";

const RadioButtons = ({isFirstFile}) => {

    const {onValueChange} = useRadioButtons();

    return (

            <div onChange={onValueChange} className={classes.divStyles}>
                <input type="radio" defaultChecked={true} value="With counting rows" name={isFirstFile ? "nameLeft": "rightLeft"} />
                <Tippy className={classes.alignTippy} placement={"left"} maxWidth={"10vw"} content="Можна вибрати, чи потрібно нумерувати рядки під час порівняння">
                    <label>Із нумеруванням рядків</label>
                </Tippy>
                <input type="radio" value="Without counting rows" name={isFirstFile ? "nameLeft": "rightLeft"}  />
                <Tippy className={classes.alignTippy} placement={"left"} maxWidth={"10vw"} content="Можна вибрати, чи потрібно нумерувати рядки під час порівняння">
                    <label>Без нумерування рядків</label>
                </Tippy>
            </div>
    );
};

export default RadioButtons;