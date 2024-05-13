import ViewHeader from "../../common/components/ViewHeader.tsx";
import s from "../../styles/DashboardPage.module.scss";
import ContainerHeader from "../../common/components/ContainerHeader.tsx";
import GIcon from "../../common/components/GIcon.tsx";
import {RecentCommentData} from "../../lib/Types.ts";
import {RecentWorkDataPlaceholder} from "../../lib/placeholders/RecentWorkDataPlaceholder.ts";
import {RecentCommentsDataPlaceholder} from "../../lib/placeholders/RecentCommentsDataPlaceholder.ts";
import {getFormattedElapsedTime} from "../../lib/utils/getFormattedElapsedTime.ts";

export default function DashboardPage() {

    return <div className={s.dashboard} >
        <ViewHeader
            className={s.mainHeader}
            title={"Oi, Thiago"}
            subtitle={"Sábado, 4 de Maio"}
            lateral={<div className={s.headerButton}>
                <GIcon>more_vert</GIcon>
            </div>}
        />

        <div className={s.main}>
            <div className={s.columnA}>
                <div className={s.recentWork}>
                    <ContainerHeader  className={s.header} title="Visto por último"/>
                    <div className={s.list}>
                        {RecentWorkDataPlaceholder.map((item, index) =>
                            <RecentWork key={index} title={item.title}/>
                        )}
                    </div>
                </div>
                <div className={s.recentComments}>
                    <ContainerHeader className={s.header} icon="chat_bubble" title="Comentários recentes"/>
                    <div className={s.list}>
                        {RecentCommentsDataPlaceholder.map((item, index)  =>
                            <RecentComment key={index} comment={item}/>
                        )}
                    </div>
                </div>
            </div>

            <div className={s.columnB}>
                <div className={s.blogStatistics}>
                    <ContainerHeader className={s.header} icon="bar_chart" title="Estatísticas do blog"/>
                </div>
            </div>
        </div>
    </div>
}

function RecentWork({title}: { title: string }) {
    return <div className={s.item}>
        <GIcon className={s.icon}>sticky_note_2</GIcon>
        <div className={s.title}>
            <span>{title}</span>
        </div>
    </div>
}


function RecentComment({comment}: {comment: RecentCommentData}) {
    return <div className={s.item}>
        <div className={s.details}>
            <div className={s.profile}>
                <div className={s.avatar}></div>
                <div className={s.name}>{comment.author.name}</div>
            </div>
            <div className={s.date}>
                {getFormattedElapsedTime(comment.date)}
            </div>
        </div>
        <div  className={s.content} >
            {comment.content}
        </div>
    </div>
}