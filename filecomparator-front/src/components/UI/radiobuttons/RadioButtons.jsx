import React from "react";
import useRadioButtons from "./useRadioButtons";
import "./RadioButtons.module.css";

const RadioButtons = ({isFirstFile}) => {

    const {onValueChange} = useRadioButtons();

    return (
        <div onChange={onValueChange}>
            <input type="radio" defaultChecked={true} value="With counting rows" name={isFirstFile ? "nameLeft": "rightLeft"} /> Із нумеруванням рядків
            <input type="radio" value="Without counting rows" name={isFirstFile ? "nameLeft": "rightLeft"}  /> Без нумерування рядків
        </div>
    );
};

export default RadioButtons;