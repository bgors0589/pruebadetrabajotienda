import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "react-native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import "firebase";
import firebase from "./firebase/Config";
import theme from "./theme.json";
import DrawerNavigator from "./components/drawerNavigator";
import { Provider } from "react-redux";
import generateStore from "./redux/store";

const store = generateStore();

export default function App() {
	return (
		<>
			<Provider store={store}>
				<IconRegistry icons={EvaIconsPack} />
				<StatusBar barStyle={"light-content"} />
				<ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
					<NavigationContainer>
						<DrawerNavigator />
					</NavigationContainer>
				</ApplicationProvider>
			</Provider>
		</>
	);
}
