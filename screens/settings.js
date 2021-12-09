import React from "react";
import { Layout, Button } from "@ui-kitten/components";
import HandleBack from "../Back";

const SettingsScreen = ({ navigation }) => {
	return (
		<HandleBack>
			<Layout
				style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
			>
				<Button
					onPress={() => navigation.navigate("Main")}
					title="Settings Page"
				>
					SETTINGS
				</Button>
			</Layout>
		</HandleBack>
	);
};

export default SettingsScreen;
