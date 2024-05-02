import s from "./App.module.scss";
import NavBar from "./components/NavBar.tsx";
import {j} from "./lib/Helpers.ts";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    useNavigate,
    useOutlet
} from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import PostEntriesLayout from "./layouts/PostEntriesLayout.tsx";
import SettingsLayout from "./layouts/SettingsLayout.tsx";
import CommentsLayout from "./layouts/CommentsLayout.tsx";
import PeopleLayout from "./layouts/PeopleLayout.tsx";
import {NavOption} from "./lib/Constants.ts";



function App() {
    const view = useOutlet();
    const navigate = useNavigate();
    const handleNavClick = (option: NavOption)=>{
        navigate(option);
        window.scrollTo(0, 0);
    }

    return <div className={j(s.app, 'default-theme')}>
        <div className={s.centralizer}>
            <div className={s.aside}>
                <NavBar onNavClick={handleNavClick}/>
            </div>

            <div className={s.main}>
                {view}
            </div>
        </div>
    </div>
}

export default App
