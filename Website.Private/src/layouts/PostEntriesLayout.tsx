import ViewHeader from "../components/ViewHeader.tsx";
import s from "../styles/PostEntriesLayout.module.scss";
import GIcon from "../components/GIcon.tsx";
import {useEffect, useState} from "react";
import ContainerMenu from "../components/ContainerMenu.tsx";
import {postVisibilityOptions} from "../lib/Constants.ts";
import {PostEntryData, TopicEntryData} from "../lib/Types.ts";
import {Placeholder} from "../lib/Placeholder.ts";
import {getFormattedElapsedTime, j} from "../lib/Helpers.ts";
import ContainerHeader from "../components/ContainerHeader.tsx";
import ViewAndCommentCount from "../components/ViewAndCommentCount.tsx";
import BlueThinButton from "../components/BlueThinButton.tsx";

export default function PostEntriesLayout() {

    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 520);

    const handleVisibilitySelect = (key: any) => {

    }


    useEffect(() => {
        const callback = () => {
            setIsMobile(window.innerWidth <= 520);
        }

        window.addEventListener("resize", callback);

        return () => window.removeEventListener("resize", callback);
    }, []);

    return <div className={s.postEntries}>

        <ViewHeader
            className={s.mainHeader}
            title="Postagens"
            lateral={isMobile && <div className={s.buttonList}>
                <HeaderButton icon="search"/>
                <HeaderButton icon="swap_vert"/>
            </div>}>
        </ViewHeader>

        <div className={s.body}>
            <div className={s.main}>
                <div className={s.topWrapper}>
                    <div className={s.headerWrapper}>
                        <ContainerHeader className={s.postEntriesListHeader} icon='newsmode' title="Postagens">

                        </ContainerHeader>
                        <ContainerMenu className={s.menu} items={postVisibilityOptions} onSelect={handleVisibilitySelect}/>
                    </div>
                    <SearchBox/>
                </div>
                <div className={s.postEntriesList}>
                    {Placeholder.postEntries.map((post, index) => <PostEntry key={index} post={post}/>)}
                </div>
            </div>
            <div className={s.aside}>
                <ContainerHeader className={s.topicEntriesListHeader} icon='label' title="Tópicos">
                    <BlueThinButton icon="add" text="Novo tópico"/>
                </ContainerHeader>
                <div className={s.topicEntriesList}>
                    {Placeholder.topicEntries.map((topic, index) => <TopicEntry key={index} topic={topic}/>)}
                </div>
            </div>
        </div>
    </div>
}

function SearchBox() {
    return <div className={s.searchBox}>
        <GIcon>search</GIcon>
        <input className={s.input} type="text" placeholder="Pesquisar postagens"/>
    </div>
}

function HeaderButton({icon}: { icon: string }) {
    return <div className={s.button}><GIcon>{icon}</GIcon></div>
}

function PostEntry({post}: { post: PostEntryData }) {
    return <div className={s.postEntryItem}>
        <div className={s.title}>{post.title}</div>
        <div className={s.postIntrisic}>
            <div className={s.tags}>
                <div className={s.text}>{post.topic}</div>
                <span>-</span>
                <div className={s.text}>{post.section}</div>
            </div>
            <div className={s.stats}>
                <ViewAndCommentCount viewCount={post.views} commentCount={post.comments}/>
            </div>
        </div>
    </div>
}

function TopicEntry({topic}: { topic: TopicEntryData }) {
    return <div className={s.topicEntryItem}>
        <div className={s.name}>{topic.name}</div>
        <div className={s.stats}>
            <div className={s.articleCount}>{topic.contentCount} artigos</div>
        </div>
    </div>
}