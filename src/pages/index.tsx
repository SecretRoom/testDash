
import { Route, Routes } from "react-router-dom";
import { Login } from "./login";
import { PrivateRoute } from "features/privatRouter";
import {Dashboard} from "./dashboard";
import { withLayout } from "widgets/layout/with-layout";
import { RouteData } from "shared/providers/types";

const Test = () => (
  <>Test</>
)

const routes: RouteData[] =  [
  { path: '/', element: <Dashboard />, key: 'dashboard_page', name: 'Dashboard'  },
  { path: '/test', element: <Test />, key: 'test_page', name: 'test'  },
]

const Routing = () => {

  return (
    <Routes>
      <Route path='/' element={<PrivateRoute/>}>
        {routes.map((props) => <Route {...props}/>)}
        <Route path='/login' element={<Login/>}/>
      </Route>
    </Routes>
  );
};

const LayoutRouting = withLayout(Routing)

export { LayoutRouting as Routing };