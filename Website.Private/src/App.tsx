import s from "./styles/App.module.scss";
import NavBar from "./common/components/NavBar.tsx";
import {useLocation, useNavigate, useOutlet} from "react-router-dom";
import {NavOption} from "./lib/constants/NavOption.ts";
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
