import s from "../../styles/ContainerHeader.module.scss";
import GIcon from "./GIcon.tsx";

import {join} from "../../lib/utils/join.ts";

type Properties = {
    children?: any;
    title?: string;
    icon?: string;
    className?: string;
}

export default function ContainerHeader(props: Properties) {
    return <div className={join(s.containerHeader, props.className)}>
        <div className={s.static}>
            {props.icon && <GIcon  className={s.icon}>{props.icon}</GIcon>}
            {props.title && <div className={s.title}>{props.title}</div>}
        </div>
        {props.children && props.children}
    </div>
}