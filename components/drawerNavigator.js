import { createDrawerNavigator } from "@react-navigation/drawer";
import { Divider, Drawer, DrawerItem } from "@ui-kitten/components";
import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

import { BellIcon, ForwardIcon, HomeIcon, LogoutIcon } from "./icons";

import LoginScreen from "../screens/login";
import NotificationScreen from "../screens/notification";
import SignupScreen from "../screens/signup";
import ForgetPasswordScreen from "../screens/password_reset";

import { useDispatch, useSelector } from "react-redux";
import { obtenerUsuarioAction, limpiarUsuarioAction } from "../redux/authDucks";

import firebase from "./../firebase/Config";

import BottomNavigation from "./bottomNavigator";

const { Navigator, Screen } = createDrawerNavigator();

const Header = (props) => (
	<>
		<ImageBackground
			style={[props.style, styles.header]}
			source={require("./../assets/icon-.png")}
		/>
		<Divider />
	</>
);

const DrawerContent = ({ navigation, state }) => {
	const [selectedIndex, setSelectedIndex] = React.useState(null);

	const navigate = (index) => {
		setSelectedIndex(index);
		console.log("routeNames", state.routeNames);
		console.log("routeNames", index);
		navigation.navigate(state.routeNames[index.row]);
	};
	return (
		<Drawer
			header={Header}
			selectedIndex={selectedIndex}
			onSelect={(index) => navigate(index)}
		>
			<DrawerItem
				title="Home"
				accessoryLeft={HomeIcon}
				accessoryRight={ForwardIcon}
			/>
			<DrawerItem
				title="Notifications"
				accessoryLeft={BellIcon}
				accessoryRight={ForwardIcon}
			/>
			<DrawerItem title="Logout" accessoryLeft={LogoutIcon} />
		</Drawer>
	);
};

const DrawerNavigator = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = React.useState(true);
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			console.log(user);
			dispatch(obtenerUsuarioAction(user));
			setLoading(false);
		} else {
			console.log("nouser");
			dispatch(limpiarUsuarioAction());
			setLoading(false);
		}
	});
	const user = useSelector((store) => store.auth.user);

	if (loading) {
		return null;
	}

	return (
		<Navigator
			initialRouteName={user ? "Home" : "Login"}
			drawerContent={(props) => <DrawerContent {...props} />}
		>
			<Screen name="Home" component={BottomNavigation} />
			<Screen name="Notifications" component={NotificationScreen} />
			<Screen
				name="Login"
				component={LoginScreen}
				options={{ gestureEnabled: false }}
			/>
			<Screen name="SignUp" component={SignupScreen} />
			<Screen name="ForgotPassword" component={ForgetPasswordScreen} />
		</Navigator>
	);
};

const styles = StyleSheet.create({
	header: {
		height: 250,
		flexDirection: "row",
		alignItems: "center",
	},
});

export default DrawerNavigator;
