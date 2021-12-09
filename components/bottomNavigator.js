import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	BottomNavigation,
	BottomNavigationTab,
	Icon,
} from "@ui-kitten/components";
import React from "react";
import HomeScreen from "../screens/home";
import NewsScreen from "../screens/news.screen";
import OrdersScreen from "../screens/orders";
import ProductDetailScreen from "../screens/product-detail";
import ProductListScreen from "../screens/product-list";
import SettingsScreen from "../screens/settings";
import { CartScreen } from "../screens/cart";

const { Navigator, Screen } = createBottomTabNavigator();

const PersonIcon = (props) => <Icon {...props} name="home-outline" />;

const OrdersIcon = (props) => <Icon {...props} name="shopping-cart-outline" />;

const NewsIcon = (props) => <Icon {...props} name="globe-outline" />;

const SettingsIcon = (props) => <Icon {...props} name="settings-outline" />;

const BottomTabBar = ({ navigation, state }) => (
	<BottomNavigation
		selectedIndex={state.index}
		onSelect={(index) => navigation.navigate(state.routeNames[index])}
	>
		<BottomNavigationTab title="Home" icon={PersonIcon} />
		<BottomNavigationTab title="Carrito" icon={OrdersIcon} />
		<BottomNavigationTab title="Noticias" icon={NewsIcon} />
		<BottomNavigationTab title="Configuración" icon={SettingsIcon} />
	</BottomNavigation>
);

const BottomNavigator = () => {
	return (
		<Navigator
			initialRouteName="Main"
			tabBar={(props) => <BottomTabBar {...props} />}
		>
			{/* Bottom Menus */}
			<Screen name="Main" component={HomeScreen} />
			<Screen name="Orders" component={OrdersScreen} />
			<Screen name="News" component={NewsScreen} />
			<Screen name="Settings" component={SettingsScreen} />
			{/* Pages */}
			<Screen name="ProductList" component={ProductListScreen} />
			<Screen name="ProductDetail" component={ProductDetailScreen} />
			<Screen name="Cart" component={CartScreen} />
			<Screen name="Checkout" component={SettingsScreen} />
			<Screen name="Payment" component={SettingsScreen} />
			<Screen name="AddNewCard" component={SettingsScreen} />
		</Navigator>
	);
};

export default BottomNavigator;
