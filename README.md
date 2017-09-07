# react-native-project
#### 引入antd-mobile
```text
1.npm install react-dom --save
2.npm install antd-mobile --save
3.npm install babel-plugin-import --save-dev
4.在.babelrc中加入如下代码：
{
  "plugins": [["import", { "libraryName": "antd-mobile" }]],
  "presets": ["react-native"]
}
```
#### 初始化修改react-navigation 中的addNavigationHelper文件
```text
export default function<S: *>(navigation: NavigationProp<S, NavigationAction>) {
	// 添加点击判断
	let debounce = true;
	return {
		...navigation,
		goBack: (key?: ?string): boolean =>
			navigation.dispatch(
				NavigationActions.back({
					key: key === undefined ? navigation.state.key : key,
				}),
			),
		navigate: (routeName: string,
				   params?: NavigationParams,
				   action?: NavigationAction,): boolean => {
			if (debounce) {
				debounce = false;
				navigation.dispatch(
					NavigationActions.navigate({
						routeName,
						params,
						action,
					}),
				);
				setTimeout(
					() => {
						debounce = true;
					},
					500,
				);
				return true;
			}
			return false;
		},
		/**
		 * For updating current route params. For example the nav bar title and
		 * buttons are based on the route params.
		 * This means `setParams` can be used to update nav bar for example.
		 */
		setParams: (params: NavigationParams): boolean =>
			navigation.dispatch(
				NavigationActions.setParams({
					params,
					key: navigation.state.key,
				}),
			),
	};
}
```
####使用navigation.goBack注意
```text
跨页面回退时，注意goBack(key)中的key值是目标页面的前一个页面的key值
```
