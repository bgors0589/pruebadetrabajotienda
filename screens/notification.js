import React from "react";
import { Layout, Button } from "@ui-kitten/components";
import HandleBack from "../Back";

const NotificationScreen = ({ navigation }) => {
	return (
		<HandleBack>
			<Layout
				style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
			>
				<Button
					onPress={() => navigation.navigate("Home")}
					title="Notification Page"
				>
					NOTIFICATION
				</Button>
			</Layout>
		</HandleBack>
	);
};

export default NotificationScreen;
