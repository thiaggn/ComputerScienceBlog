import s from "./NavBar.module.scss";
import GIcon from "./GIcon.tsx";
import {useState} from "react";
import {j} from "../lib/Helpers.ts";
import {useMatch, useNavigate} from "react-router-dom";

type Properties = { label: string, icon: string, active: boolean, onClick: () => void }
function PillButton({label, icon, active, onClick}: Properties) {
    const handleClick = () => {
        window.navigator.vibrate([10]);
        onClick();
    }

    return <div className={j(s.button, active && s.pressed)} onClick={handleClick}>
        <div className={s.pill}>
            <GIcon fill={active} className={s.icon}>{icon}</GIcon>
            <div className={s.hoverable}></div>
            <div className={s.active}></div>
        </div>
        <div className={s.label}>{label}</div>
    </div>
}

export default function NavBar() {

    const [active, setActive] = useState<NavOption>(NavOption.Home);
    const navigate = useNavigate();
    const match = useMatch(active);

    if (!match) {
        navigate(active);
    }

    return <div className={s.navbar}>
        <div className={s.topWrapper}>
            <div className={s.options}>
                <GIcon>menu</GIcon>
            </div>
            <div className={s.compose}>
                <GIcon>edit</GIcon>
            </div>
        </div>
        <div className={s.bottomWrapper}>
            {navButtons.map(({label, icon, key}) =>
                <PillButton
                    key={key} label={label} icon={icon} active={active === key}
                    onClick={() => setActive(key)}
                />
            )}
        </div>
    </div>
}

enum NavOption {
    Home= "/blog",
    Posts = "/blog/posts",
    Comments = "/blog/comments",
    People = "/blog/people",
    Settings = "/blog/settings"
}

const navButtons = [
    {label: "Início", icon: "home", key: NavOption.Home},
    {label: "Postagens", icon: "news", key: NavOption.Posts},
    {label: "Comentários", icon: "chat", key: NavOption.Comments},
    {label: "Pessoas", icon: "person", key: NavOption.People},
    {label: "Ajustes", icon: "settings", key: NavOption.Settings}
]