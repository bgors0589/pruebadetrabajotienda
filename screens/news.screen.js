import React from "react";
import { Layout, Button } from "@ui-kitten/components";
import HandleBack from "../Back";

const NewsScreen = ({ navigation }) => {
	return (
		<HandleBack>
			<Layout
				style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
			>
				<Button onPress={() => navigation.navigate("News")} title="News Page">
					Noticias
				</Button>
			</Layout>
		</HandleBack>
	);
};

export default NewsScreen;
