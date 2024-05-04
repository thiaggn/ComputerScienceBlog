import s from "./App.module.scss";
import NavBar from "./components/NavBar.tsx";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider, useLocation, useMatch,
    useNavigate,
    useOutlet
} from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import PostEntriesLayout from "./layouts/PostEntriesLayout.tsx";
import SettingsLayout from "./layouts/SettingsLayout.tsx";
import CommentsLayout from "./layouts/CommentsLayout.tsx";
import PeopleLayout from "./layouts/PeopleLayout.tsx";

import {NavOption} from "./lib/constants/NavBarConstants.ts";
import {join} from "./lib/utils/join.ts";



function App() {
    const view = useOutlet();
    const navigate = useNavigate();
    const location = useLocation();
    const handleNavClick = (option: NavOption)=>{
        navigate(option);
        window.scrollTo(0, 0);
    }

    return <div className={join(s.app, 'default-theme')}>
        <div className={s.centralizer}>
            <div className={s.aside}>
                <NavBar currentOption={location.pathname} onNavClick={handleNavClick}/>
            </div>

            <div className={s.main}>
                {view}
            </div>
        </div>
    </div>
}

export default App
