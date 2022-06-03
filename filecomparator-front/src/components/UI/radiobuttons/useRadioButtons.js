import {useEffect} from "react";


const useRadioButtons = () => {

    useEffect( () =>{
        localStorage.setItem("selectedOptionRowsLeft" , "With counting rows");
        localStorage.setItem("selectedOptionRowsRight" , "With counting rows");
    }, [])

    const onValueChange = (event) => {
        if(event.target.name === "nameLeft") {
            localStorage.setItem("selectedOptionRowsLeft" , event.target.value);
        } else {
            localStorage.setItem("selectedOptionRowsRight" , event.target.value)
        }
    }

    return {onValueChange}
}

export default useRadioButtons;