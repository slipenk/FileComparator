import React from "react";
import classes from "../../FormStyle/FormStyle.module.css";
import classesM from "./Menu.module.css";
import CompareFirst from "../../icons/CompareFirst.png";
import CompareSecond from "../../icons/CompareSecond.png";
import Circles from "../../components/UI/circle/Circles";
import MenuIcons from "../../components/UI/menuIcons/MenuIcons";



const Menu = () => {
    window.history.replaceState(null, "", "/menu");
    return (
        <div className={classes.MainDiv}>
            <div className={classesM.flexDivMenu}>
                <Circles/>
                <div className={classesM.flexCol}>
                    <div className={classesM.flexRow}>
                        <MenuIcons logo={CompareFirst} value={"Порівняння файлів"} border={'0.3vw solid black'} path={"/comparator"}/>
                        <MenuIcons logo={CompareSecond} value={"Останні порівняння"} border={null} path={"/recentComparisons"}/>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Menu;