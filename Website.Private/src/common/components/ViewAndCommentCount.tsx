import s from '../../styles/ViewAndCommentCount.module.scss'
import GIcon from "./GIcon.tsx";

type Properties = {
    viewCount: number,
    commentCount: number
}
export default function ViewAndCommentCount(props: Properties) {
    return <>
        <div className={s.countDisplay}>
            <GIcon fill={true} size={16}>bar_chart</GIcon>
            <span className={s.text}>{props.viewCount}</span>
        </div>

        <div className={s.countDisplay}>
            <GIcon fill={true} size={16}>chat</GIcon>
            <span className={s.text}>{props.commentCount}</span>
        </div>
    </>
}