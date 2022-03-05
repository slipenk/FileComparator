import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";

export const privateRoutes = [

]

export const publicRoutes = [
    {path: '/login', element: <Login/>, exact: true},
    {path: '/registration', element: <Registration/>, exact: true}
]