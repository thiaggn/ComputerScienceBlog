import ViewHeader from "../components/ViewHeader.tsx";
import s from "../styles/PostEntriesLayout.module.scss";
import GIcon from "../components/GIcon.tsx";

export default function PostEntriesLayout() {
    return <div className={s.postEntries}>
        <ViewHeader className={s.mainHeader} title="Postagens"/>

        <div className={s.body}>
            <div className={s.main}>
               <SearchBox/>
            </div>
            <div className={s.aside}></div>
        </div>
    </div>
}

function SearchBox() {
    return <div className={s.searchBox}>
        <GIcon>search</GIcon>
        <input className={s.input} type="text" placeholder="Pesquisar postagens"/>
    </div>
}