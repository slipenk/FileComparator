import React, {useRef} from "react";
import classesM from "./Circles.module.css";
import LogoName from "../../LogoName/LogoName";
import LogoU from "../../../icons/User.png";
import Logo from "../../../icons/Berulia.png";

const Circles = () => {

    const username = useRef("");

    function getUsername() {
        const user = JSON.parse(localStorage.getItem('user'));
        username.current = user.username;
    }

    return (
        <div>
            {getUsername()}
            <div className={classesM.circle + " " + classesM.circleRight}>
                {localStorage.setItem('IsMenu', 'true')}
                <LogoName logo={LogoU} value={username.current}/>
            </div>
            <div className={classesM.circle + " " + classesM.circleLeft}>
                <LogoName logo={Logo} value={"БЕРУЛЯ"}/>
            </div>
        </div>
    );
};

export default Circles;