import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.scss'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import DashboardPage from "./pages/dashboard/DashboardPage.tsx";
import PostEntriesPage from "./pages/posts/PostEntriesPage.tsx";
import CommentsPage from "./pages/comments/CommentsPage.tsx";
import PeoplePage from "./pages/people/PeoplePage.tsx";
import SettingsPage from "./pages/settings/SettingsPage.tsx";
import EditorPage from "./pages/editor/EditorPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const appRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<App/>}>
            <Route path="blog" element={<DashboardPage/>}/>
            <Route path="blog/posts" element={<PostEntriesPage/>}/>
            <Route path="blog/comments" element={<CommentsPage/>}/>
            <Route path="blog/people" element={<PeoplePage/>}/>
            <Route path="blog/settings" element={<SettingsPage/>}/>
            <Route path="blog/editor" element={<EditorPage/>}/>
        </Route>
    )
);

/* By default, as soon as you successfully fetch data, it imediatelly goes to "stale"
*  instead of staying "fresh", and that's the default behavior. If you don't want that
*  to happen, you cant change how your stale time is set up.*/
const appQueryClient = new QueryClient({
    defaultOptions :{
        queries: {
            // Após quanto tempo o react query vai apagar o cache
            gcTime: 1000 * 60 * 10
        }
    }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={appQueryClient}>
            <RouterProvider router={appRouter}/>
        </QueryClientProvider>
    </React.StrictMode>
)


