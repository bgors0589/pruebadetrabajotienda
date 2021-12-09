import React from "react";
import { Layout, Button } from "@ui-kitten/components";
import HandleBack from "../Back";

const OrdersScreen = ({ navigation }) => {
	return (
		<HandleBack>
			<Layout
				style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
			>
				<Button
					onPress={() => navigation.navigate("Orders")}
					title="Orders Page"
				>
					Carrito
				</Button>
			</Layout>
		</HandleBack>
	);
};

export default OrdersScreen;
