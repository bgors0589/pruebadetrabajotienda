import { createDrawerNavigator } from "@react-navigation/drawer";
import {
	Divider,
	Drawer,
	DrawerItem,
	Avatar,
	Layout,
} from "@ui-kitten/components";
import React from "react";
import { ImageBackground, StyleSheet, Text } from "react-native";

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

const Header = (props) => {
	const user = useSelector((store) => store.auth.user);
	return (
		<>
			<ImageBackground
				style={[props.style, styles.header]}
				source={require("./../assets/icon-.png")}
			/>
			{user && (
				<Layout style={styles.containerLayout}>
					<Layout style={styles.layout} level="2">
						<Avatar
							size="giant"
							source={{
								uri: user.photoURI
									? user.photoURI
									: "https://akveo.github.io/react-native-ui-kitten/docs/assets/playground-build/static/media/icon.a78e4b51.png",
							}}
						/>
					</Layout>

					<Layout style={styles.layout} level="1">
						<Text>{user.displayName}</Text>
					</Layout>
				</Layout>
			)}

			<Divider />
		</>
	);
};

const DrawerContent = ({ navigation, state }) => {
	const [selectedIndex, setSelectedIndex] = React.useState(null);

	const navigate = async (index) => {
		setSelectedIndex(index);
		console.log("routeNames", state.routeNames);
		console.log("routeNames", index);
		if (index.row == 2) {
			await firebase.auth().signOut();
		}
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
	containerLayout: {
		flex: 1,
		flexDirection: "row",
	},
	layout: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default DrawerNavigator;
