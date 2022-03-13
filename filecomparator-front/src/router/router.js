import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Menu from "../pages/Menu/Menu";

export const privateRoutes = [
    {path: '/menu', element: <Menu/>, exact: true}
]

export const publicRoutes = [
    {path: '/login', element: <Login/>, exact: true},
    {path: '/registration', element: <Registration/>, exact: true},
]