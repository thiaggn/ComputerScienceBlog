import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.scss'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import PostEntriesLayout from "./layouts/PostEntriesLayout.tsx";
import CommentsLayout from "./layouts/CommentsLayout.tsx";
import PeopleLayout from "./layouts/PeopleLayout.tsx";
import SettingsLayout from "./layouts/SettingsLayout.tsx";
import EditorLayout from "./layouts/EditorLayout.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const appRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<App/>}>
            <Route path="blog" element={<DashboardLayout/>}/>
            <Route path="blog/posts" element={<PostEntriesLayout/>}/>
            <Route path="blog/comments" element={<CommentsLayout/>}/>
            <Route path="blog/people" element={<PeopleLayout/>}/>
            <Route path="blog/settings" element={<SettingsLayout/>}/>
            <Route path="blog/editor" element={<EditorLayout/>}/>
        </Route>
    )
);

/* By default, as soon as you successfully fetch data, it imediatelly goes to "stale"
*  instead of staying "fresh", and that's the default behavior. If you don't want that
*  to happen, you cant change how your stale time is set up.*/
const appQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60,
            // refetchInterval: 1000 * 1   // Refetches every 1s
        }
    }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={appQueryClient}>
            <RouterProvider router={appRouter}/>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    </React.StrictMode>
)
