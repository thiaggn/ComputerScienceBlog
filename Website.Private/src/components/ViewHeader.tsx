import s from "../styles/ViewHeader.module.scss";
import {useEffect, useState} from "react";

import {join} from "../lib/utils/join.ts";

type Properties = {
    title: string,
    subtitle?: string,
    children?: any,
    className?: string,
    lateral?: any
}
export default function ViewHeader({title, children, className, subtitle, lateral}: Properties) {

    const [isMinimized, setIsMinimized] = useState<boolean>(false);

    useEffect(() => {

    }, []);

    return <div className={join(s.viewHeader, isMinimized && s.minimized, lateral && s.lateral, className)}>
        {!children && <div className={s.main}>
            <h1 className={s.title}>{title}</h1>
            <div className={s.subtitle}>
                {subtitle}
            </div>
        </div>}

        {(!children && lateral) && lateral}

        {children && <div className={s.main}>
            {children}
        </div>}
    </div>
}