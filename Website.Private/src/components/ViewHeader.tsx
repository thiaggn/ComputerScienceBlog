import s from "../styles/ViewHeader.module.scss";
import {useEffect, useState} from "react";
import {j} from "../lib/Helpers.ts";
export default function ViewHeader({title, children, className}: {title: string, children?: any, className?: string}) {

    const [isMinimized, setIsMinimized] = useState<boolean>(false);

    useEffect(() => {
    
    }, []);

    return <div className={j(s.viewHeader, isMinimized && s.minimized, className)}>
        <div className={s.main}>
            <h1 className={s.title}>{title}</h1>
            <div className={s.optional}>
                {children}
            </div>
        </div>
    </div>
}