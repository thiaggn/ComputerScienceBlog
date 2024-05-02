import s from "../styles/ViewHeader.module.scss";
import {useEffect} from "react";
export default function ViewHeader({title, children}: {title: string, children?: any}) {

    useEffect(() => {
        const onScroll = () => {
            console.log('a');
        }

        window.onscroll = onScroll;

        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, []);

    return <div className={s.viewHeader}>
        <div className={s.main}>
            <h1 className={s.title}>{title}</h1>
            {children && <div className={s.optional}>
                {children}
            </div>}
        </div>
    </div>
}