/**
 * 路由
 */
import Login from '../containers/Login/App';
import Home from '../containers/Home/App';
import TabNav from '../containers/TabNav/App';

const routesConfig = {
	Login: {
		screen: Login
	},
	Home: {
		screen: Home
	},
	TabNav: {
		screen: TabNav,
	}
};

export default routesConfig;
