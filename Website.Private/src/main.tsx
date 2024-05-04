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

const appRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<App/>}>
            <Route  path="blog" element={<DashboardLayout/>}/>
            <Route path="blog/posts" element={<PostEntriesLayout/>}/>
            <Route path="blog/comments" element={<CommentsLayout/>}/>
            <Route path="blog/people" element={<PeopleLayout/>}/>
            <Route path="blog/settings" element={<SettingsLayout/>}/>
            <Route path="blog/editor" element={<EditorLayout/>}/>
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={appRouter}/>
  </React.StrictMode>,
)
