import React from "react";
import {
	Dimensions,
	ImageBackground,
	ListRenderItemInfo,
	View,
	SafeAreaView,
} from "react-native";
import {
	Button,
	Card,
	List,
	StyleService,
	Text,
	useStyleSheet,
	TopNavigation,
	TopNavigationAction,
} from "@ui-kitten/components";
import { CartIcon, BackIcon } from "../components/icons";
import Data from "../redux/data/data.json";
import HandleBack from "../Back";
import { useDispatch } from "react-redux";
import {
	addToCartAction,
	clearCartAction,
	delFromCartAction,
} from "./../redux/cartDucks";

const productSwitch = (category) => {
	switch (category) {
		case "LIBROS":
			return Data.libros;
		case "ROPA":
			return Data.ropa;
		case "ACCESORIOS":
			return Data.accesorios;
		case "LAPTOPS":
			return Data.laptos;
		case "CELULARES":
			return Data.celulares;
		default:
			return Data.libros;
	}
};

const ProductListScreen = ({ navigation, route }) => {
	const dispatch = useDispatch();

	const addToCart = (id) => {
		//console.log(id);
		dispatch(addToCartAction(id));
	};

	/* 2. Get the param */
	const { category } = route.params;

	const styles = useStyleSheet(themedStyles);

	const displayProducts = productSwitch(category);

	const onItemPress = (info) => {
		navigation && navigation.navigate("ProductDetail", { info: info });
	};

	// const onItemCartPress = (id) => {
	// 	// navigation && navigation.navigate("ShoppingCart");
	// };

	const renderItemFooter = (info) => (
		<View style={styles.itemFooter}>
			<Text category="s1"> ${info.item.price}</Text>
			<Button
				style={styles.iconButton}
				size="small"
				accessoryRight={CartIcon}
				onPress={() => addToCart(info.item.id)}
			/>
		</View>
	);

	const renderItemHeader = (info) => (
		<ImageBackground
			style={styles.itemHeader}
			source={{ uri: info.item.image }}
		/>
	);

	const renderProductItem = (info) => (
		<Card
			style={styles.productItem}
			header={() => renderItemHeader(info)}
			footer={() => renderItemFooter(info)}
			onPress={() => onItemPress(info)}
		>
			<Text category="s1">{info.item.title}</Text>
			<Text appearance="hint" category="c1">
				{info.item.category}
			</Text>
		</Card>
	);

	const navigateBack = () => {
		navigation.goBack();
	};

	const BackAction = () => (
		<TopNavigationAction icon={BackIcon} onPress={navigateBack} />
	);

	return (
		<>
			<HandleBack>
				<SafeAreaView style={{ flex: 1, margin: 5 }}>
					<TopNavigation
						title={`Products List`}
						alignment="center"
						accessoryLeft={BackAction}
						// rightControls={[overflowMenu()]}
					/>
					<List
						contentContainerStyle={styles.productList}
						data={(displayProducts.length && displayProducts) || products}
						numColumns={2}
						renderItem={renderProductItem}
					/>
				</SafeAreaView>
			</HandleBack>
		</>
	);
};

export default ProductListScreen;

const themedStyles = StyleService.create({
	container: {
		flex: 1,
		backgroundColor: "background-basic-color-2",
	},
	productList: {
		paddingHorizontal: 8,
		paddingVertical: 16,
	},
	productItem: {
		flex: 1,
		margin: 8,
		maxWidth: Dimensions.get("window").width / 2 - 24,
		backgroundColor: "background-basic-color-1",
	},
	itemHeader: {
		height: 140,
	},
	itemFooter: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
	},
	iconButton: {
		paddingHorizontal: 0,
	},
});
