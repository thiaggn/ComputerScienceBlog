import s from "./App.module.scss";
import NavBar from "./components/NavBar.tsx";
import {j} from "./lib/Helpers.ts";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useOutlet} from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import PostEntriesLayout from "./layouts/PostEntriesLayout.tsx";
import SettingsLayout from "./layouts/SettingsLayout.tsx";
import CommentsLayout from "./layouts/CommentsLayout.tsx";
import PeopleLayout from "./layouts/PeopleLayout.tsx";



function App() {
    const view = useOutlet();

    return <div className={j(s.app, 'default-theme')}>
        <div className={s.aside}>
            <NavBar/>
        </div>

        <div className={s.main}>
            {view}
        </div>
    </div>
}

export default App
