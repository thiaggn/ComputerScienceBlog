import ViewHeader from "../components/ViewHeader.tsx";
import s from "./DashboardLayout.module.scss";
import {getDateFormatted, getGreeting} from "../lib/Helpers.ts";

export default function DashboardLayout() {
    return <div className={s.dashboard}>
        <ViewHeader title={getGreeting()}>
            <span>{getDateFormatted()}</span>
        </ViewHeader>

        <div className={s.main}>
            <div className={s.columnA}></div>
            <div className={s.columnB}></div>
        </div>
    </div>
}

