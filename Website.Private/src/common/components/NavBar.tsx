import s from "../../styles/NavBar.module.scss";
import GIcon from "./GIcon.tsx";
import {useState} from "react";

import {navButtons, NavOption} from "../../lib/constants/NavBarConstants.ts";
import {join} from "../../lib/utils/join.ts";

type PillButtonProperties = { label: string, icon: string, active: boolean, onClick: () => void }
function PillButton({label, icon, active, onClick}: PillButtonProperties) {
    const handleClick = () => {
        window.navigator.vibrate([10]);
        onClick();
    }

    return <div className={join(s.button, active && s.pressed)} onClick={handleClick}>
        <div className={s.pill}>
            <GIcon fill={active} className={s.icon}>{icon}</GIcon>
            <div className={s.hoverable}></div>
            <div className={s.active}></div>
        </div>
        <div className={s.label}>{label}</div>
    </div>
}

type Properties = {
    onNavClick: (option: NavOption) => void;
    currentOption: any;
}
export default function NavBar({onNavClick, currentOption}: Properties) {

    const [currentNavOption, setCurrentNavOption] = useState<NavOption>(currentOption);

    return <div className={s.navbar}>
        <div className={s.topWrapper}>
            <div className={s.options}>
                <GIcon>menu</GIcon>
            </div>
            <div className={s.compose} onClick={()=> {
                setCurrentNavOption(NavOption.Editor);
                onNavClick(NavOption.Editor);
            }}>
                <GIcon>edit</GIcon>
            </div>
        </div>

        <div className={s.bottomWrapper}>
            {navButtons.map(({label, icon, key}) =>
                <PillButton
                    key={key} label={label} icon={icon} active={currentNavOption === key}
                    onClick={() => {
                        setCurrentNavOption(key);
                        onNavClick(key);
                    }}
                />
            )}
        </div>
    </div>
}
