import s from "../../styles/BlueThinButton.module.scss"
import GIcon from "./GIcon.tsx";

type Properties = {
    icon?: string,
    text?: string,
}
export default function BlueThinButton({icon, text}: Properties) {
    return <div className={s.blueThinButton}>
        {icon && <GIcon>{icon}</GIcon>}
        {text && <div className={s.text}>{text}</div>}
    </div>
}