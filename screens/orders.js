import React from "react";
import { Layout, Button, TopNavigation, Icon } from "@ui-kitten/components";
import HandleBack from "../Back";
import {
	SafeAreaView,
	Text,
	ScrollView,
	StyleSheet,
	View,
	Image,
	TouchableHighlight,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearCartAction, delFromCartAction } from "./../redux/cartDucks";

const OrdersScreen = ({ navigation }) => {
	const cart = useSelector((store) => store.cart.cart);
	console.log(cart.length);
	const dispatch = useDispatch();
	const delFromCart = (id, all) => {
		dispatch(delFromCartAction(id, all));
	};

	const clearCart = () => {
		dispatch(clearCartAction());
	};
	return (
		<HandleBack>
			<SafeAreaView style={{ flex: 1, margin: 5 }}>
				<TopNavigation
					title="Home"
					alignment="center"
					// accessoryLeft={menuRenderer}
					// rightControls={[overflowMenu()]}
				/>
				{cart.length == 0 ? (
					<View
						style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
					>
						<Text
							style={{
								// fontSize: sizes.title,
								fontWeight: "bold",
								textAlign: "center",
							}}
						>
							El carrito esta vacio
						</Text>
					</View>
				) : null}

				<ScrollView>
					{cart.length > 0 &&
						cart.map((item) => {
							return (
								<View key={item.id} style={styles.cartItems}>
									<Image style={styles.image} source={{ uri: item.image }} />
									<View style={{ flex: 1 }}>
										<Text style={styles.title}>
											{item.title.slice(0, 10)}...
										</Text>
										<Text style={styles.text}>Quantity - {item.quantity}</Text>
										<TouchableHighlight
											style={{ ...styles.button }}
											onPress={() => delFromCart(item.id)}
										>
											<Text style={styles.text}>Borrar uno</Text>
										</TouchableHighlight>
									</View>

									<TouchableHighlight
										style={{ ...styles.button }}
										onPress={() => delFromCart(item.id, true)}
									>
										<Icon
											style={{ width: 32, height: 32 }}
											fill="#ff0000"
											animation="zoom"
											name="trash-2-outline"
										/>
									</TouchableHighlight>
								</View>
							);
						})}
				</ScrollView>

				<Button onPress={() => clearCart()} title="Orders Page">
					Vaciar Carrito
				</Button>
			</SafeAreaView>
		</HandleBack>
	);
};

export default OrdersScreen;

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		// paddingHorizontal: sizes.padding,
	},
	text: {
		// paddingHorizontal: sizes.padding,
	},
	image: {
		width: 80,
		height: 80,
	},
	cartItems: {
		flex: 1,
		flexDirection: "row",
		paddingHorizontal: 20,
		marginTop: 20,
	},
});
