/**
 * react-navigation 工具
 */

export const getKeyForRouteName = (key, routes) => {
	if (routes && routes instanceof Array) {
		let route = routes.find((route) => route.routeName === key);

		return route.key
	}
	return null;
};
