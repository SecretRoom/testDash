
import { Route, Routes } from "react-router-dom";
import { Login } from "./login";
import { PrivateRoute } from "features/privatRouter";
import { RouteData } from "shared/providers/types";
import Dashboard from "./dashboard";

const routes: RouteData[] = [
  { path: '/', element:<Dashboard />, key: 'dashboard_page', name: 'Dashboard'  },
];

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<PrivateRoute/>}>
        {routes.map((props) => <Route {...props}/>)}
      </Route>
      <Route path='/login' element={<Login/>}/>
    </Routes>
  );
};

export { Routing };