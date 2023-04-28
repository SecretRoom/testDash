
import { Route, Routes } from "react-router-dom";
import { Login } from "./login";
import { PrivateRoute } from "features/privatRouter";
import { Dashboards } from "./dashboards";
import { withLayout } from "widgets/layout/with-layout";
import { RouteData } from "shared/providers/types";

const Test = () => (
  <>Test</>
)

const routes: RouteData[] =  [
  { path: '/', element: <Dashboards />, key: 'dashboard_page', name: 'Dashboards'  },
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