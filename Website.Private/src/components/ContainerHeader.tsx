import s from "../styles/ContainerHeader.module.scss";
import GIcon from "./GIcon.tsx";
import {j} from "../lib/Helpers.ts";

type Properties = {
    children?: any;
    title?: string;
    icon?: string;
    className?: string;
}

export default function ContainerHeader(props: Properties) {
    return <div className={j(s.containerHeader, props.className)}>
        <div className={s.static}>
            {props.icon && <GIcon  className={s.icon}>{props.icon}</GIcon>}
            {props.title && <div className={s.title}>{props.title}</div>}
        </div>
        {props.children && props.children}
    </div>
}