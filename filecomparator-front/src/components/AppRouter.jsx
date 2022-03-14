import React from "react";
import {useAuth} from "../context/context";
import {Routes, Route} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router/router";

const AppRouter = () => {
    const [auth] = useAuth(useAuth);


    return (
        auth
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route
                        element={route.element}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        element={route.element}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
            </Routes>
    );
};

export default AppRouter;