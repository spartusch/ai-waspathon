import MainLayout from "Frontend/views/MainLayout.js";

import { createBrowserRouter, RouteObject } from "react-router-dom";
import TodosView from "./views/todos/TodosView";
import SettingsView from "./views/settings/SettingsView";
import MailOverview from "./views/mailOverview/mailOverview";
import ActionView from "Frontend/views/action/ActionView";

export const routes = [
  {
    element: <MainLayout />,
    handle: { title: "Dashboard" },
    children: [
      { path: "/", element: <TodosView />, handle: { title: "Todos" } },
      { path: "/action/:name", element: <ActionView />, handle: { title: "Action completed" } },
      {
        path: "/settings",
        element: <SettingsView />,
        handle: { title: "Settings" },
      },
      { path: "/mail", element: <MailOverview />, handle: { title: "Mail" } },
    ],
  },
] as RouteObject[];

export default createBrowserRouter(routes);
