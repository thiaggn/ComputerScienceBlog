import ViewHeader from "../components/ViewHeader.tsx";
import s from "../styles/DashboardLayout.module.scss";
import {getFormattedDate, getFormattedElapsedTime, getGreeting} from "../lib/Helpers.ts";
import ContainerHeader from "../components/ContainerHeader.tsx";
import {Placeholder} from "../lib/Placeholder.ts";
import GIcon from "../components/GIcon.tsx";
import {RecentCommentData} from "../lib/Types.ts";
export default function DashboardLayout() {



    return <div className={s.dashboard}>
        <ViewHeader title={getGreeting()}>
            <span>{getFormattedDate()}</span>
        </ViewHeader>

        <div className={s.main} onScroll={(e) => {console.log(e)}}>
            <div className={s.columnA}>
                <div className={s.recentWork}>
                    <ContainerHeader  className={s.header} title="Visto por último"/>
                    <div className={s.list}>
                        {Placeholder.recentWork.map((item, index) =>
                            <RecentWork key={index} title={item.title}/>
                        )}
                    </div>
                </div>
                <div className={s.recentComments}>
                    <ContainerHeader className={s.header} icon="chat_bubble" title="Comentários recentes"/>
                    <div className={s.list}>
                        {Placeholder.recentComments.map((item, index)  =>
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