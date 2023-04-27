import { Navbar } from 'widgets/navbar/model'
import compose from "compose-function";
import style from './style.module.scss'

const Layout = (component: () => React.ReactNode) => () => (
  <div className={style["workspace"]}>
		<Navbar />      
    {component()}
	</div>
);

export const withLayout = compose(Layout)
