/**
 * 路由
 */
import Login from '../containers/Login/App';
import Home from '../containers/Home/App';
import TabNav from '../containers/TabNav/App';
import ListTest from '../containers/ListTest/App';
import Camera from '../containers/Camera/App';

const routesConfig = {
	Login: {
		screen: Login
	},
	Home: {
		screen: Home
	},
	TabNav: {
		screen: TabNav,
	},
	ListTest: {
		screen: ListTest
	},
	Camera: {
		screen: Camera
	}
};

export default routesConfig;
