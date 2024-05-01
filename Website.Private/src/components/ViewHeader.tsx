import s from "./ViewHeader.module.scss";
export default function ViewHeader({title, children}: {title: string, children?: any}) {
    return <div className={s.viewHeader}>
        <div className={s.main}>
            <h1 className={s.title}>{title}</h1>
            {children && <div className={s.optional}>
                {children}
            </div>}
        </div>
    </div>
}