import React from "react";
import classesM from "./Circles.module.css";
import LogoName from "../../LogoName/LogoName";
import LogoU from "../../../icons/User.png";
import Logo from "../../../icons/Berulia.png";

const Circles = () => {

    return (
        <div>
            <div className={classesM.circle + " " + classesM.circleRight}>
                {localStorage.setItem('IsMenu', 'true')}
                <div>
                    <LogoName logo={LogoU} value={JSON.parse(localStorage.getItem('user')).username}/>
                </div>
            </div>
            <div className={classesM.circle + " " + classesM.circleLeft}>
                <LogoName logo={Logo} value={"БЕРУЛЯ"}/>
            </div>
        </div>
    );
};

export default Circles;