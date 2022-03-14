import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Menu from "../pages/Menu/Menu";
import NoPageFound from "../pages/NoPageFound/NoPageFound";

export const privateRoutes = [
    {path: '/menu', element: <Menu/>, exact: true},
    {path: '*', element: <Menu/>, exact: true}

]

export const publicRoutes = [
    {path: '/login', element: <Login/>, exact: true},
    {path: '/registration', element: <Registration/>, exact: true},
    {path: '*', element: <NoPageFound/>, exact: true}
]