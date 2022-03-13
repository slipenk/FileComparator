import React from "react";
import classes from "../../FormStyle/FormStyle.module.css";
import classesM from "./Menu.module.css";
import LogoName from "../../components/LogoName/LogoName";
import OwnName from "../../components/OwnName/OwnName";
import CompareFirst from "../../icons/CompareFirst.png";
import Document from "../../icons/Documents.png";



const Menu = () => {
    return (
        <div className={classes.MainDiv}>
            <div className={classesM.flexDivMenu}>
                <div className={classesM.circle + " " + classesM.circleRight}>
                    <OwnName/>
                </div>
                <div className={classesM.circle + " " + classesM.circleLeft}>
                    {localStorage.setItem('IsMenu', 'true')}
                    <LogoName />
                </div>
                <div className={classesM.flexCol}>
                    <div className={classesM.flexRow}>
                        <div className={classesM.ColDiv}>
                            <img className={classesM.ImageDiv} src={CompareFirst} alt="Порівняння"/>
                            <div className={classesM.HBer}>
                                <h1>Порівняння файлів</h1>
                            </div>
                        </div>
                        <div className={classesM.ColDivTwo}>
                            <img className={classesM.ImageDiv} src={Document} alt="Плагіат"/>
                            <div className={classesM.HBer}>
                                <h1>Перевірка коду на плагіат</h1>
                            </div>
                        </div>
                    </div>
                <div className={classesM.RowDiv}>
                    TEST Row
                </div>
                </div>
            </div>

        </div>
    );
};

export default Menu;