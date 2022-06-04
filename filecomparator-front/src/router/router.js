import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Menu from "../pages/Menu/Menu";
import NoPageFound from "../pages/NoPageFound/NoPageFound";
import FileComparator from "../pages/FileComparator/FileComparator";
import PersonalAccount from "../pages/PersonalAccount/PersonalAccount";
import RecentComparisons from "../pages/RecentComparisons/RecentComparisons";
import RegistrationSuccess from "../pages/RegistrationSuccess/RegistrationSuccess";

export const privateRoutes = [
    {path: '/menu', element: <Menu/>, exact: true},
    {path: '/comparator', element: <FileComparator/>, exact: true},
    {path: '/personalAccount', element: <PersonalAccount/>, exact: true},
    {path: '/recentComparisons', element: <RecentComparisons/>, exact: true},
    {path: '*', element: <Menu/>, exact: true}
]

export const publicRoutes = [
    {path: '/login', element: <Login/>, exact: true},
    {path: '/registration', element: <Registration/>, exact: true},
    {path: '/registrationSuccess', element: <RegistrationSuccess/>, exact: true},
    {path: '*', element: <NoPageFound/>, exact: true}
]