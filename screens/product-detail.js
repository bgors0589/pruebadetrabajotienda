import {
	Button,
	Input,
	Layout,
	Radio,
	RadioGroup,
	StyleService,
	Text,
	TopNavigation,
	TopNavigationAction,
	useStyleSheet,
} from "@ui-kitten/components";
import React from "react";
import { ImageBackground, SafeAreaView, View } from "react-native";
import HandleBack from "../Back";
import { KeyboardAvoidingView } from "../components/3rd-party";
import { CommentList } from "../components/comments-list";
import { BackIcon } from "../components/icons";

// const keyboardOffset = (height) =>
//   Platform.select({
//     android: 0,
//     ios: height,
//   });

const ProductDetailScreen = ({ navigation, route }) => {
	const { info } = route.params;
	const [comment, setComment] = React.useState();
	const [selectedColorIndex, setSelectedColorIndex] = React.useState();
	const styles = useStyleSheet(themedStyles);

	const onBuyButtonPress = () => {
		// navigation && navigation.navigate("Payment");
	};

	const onAddButtonPress = () => {
		// navigation && navigation.navigate("ShoppingCart");
	};

	const renderColorItem = (color, index) => {
		return (
			<Radio key={index} style={styles.colorRadio}>
				<Text style={{ color: color.value }}>
					{color.description.toUpperCase()}
				</Text>
			</Radio>
		);
	};

	const renderHeader = () => (
		console.log(info),
		(
			<Layout style={styles.header}>
				<ImageBackground
					style={styles.image}
					source={{ uri: info.item.image }}
				/>
				<Layout style={styles.detailsContainer} level="1">
					<Text category="h6" style={{ fontWeight: "normal" }}>
						{info.item.title}
					</Text>
					<Text style={styles.subtitle} appearance="hint" category="p2">
						{info.item.subtitle}
					</Text>
					<Text style={styles.price} category="h4">
						$ {info.item.price}
					</Text>
					<Text style={styles.description} appearance="hint">
						{info.item.description}
					</Text>
					<Text style={styles.sectionLabel} category="h6">
						Size:
					</Text>
					<Text style={styles.size} appearance="hint">
						{info.item.size}
					</Text>
					<Text style={styles.sectionLabel} category="h6">
						Color:
					</Text>
					<RadioGroup
						style={styles.colorGroup}
						selectedIndex={selectedColorIndex}
						onChange={setSelectedColorIndex}
					>
						{info.item.colors.map(renderColorItem)}
					</RadioGroup>
					<View style={styles.actionContainer}>
						<Button
							style={styles.actionButton}
							size="giant"
							status="control"
							onPress={onAddButtonPress}
						></Button>
						<Button
							style={styles.actionButton}
							size="giant"
							onPress={onBuyButtonPress}
						>
							BUY
						</Button>
					</View>
				</Layout>
				<Input
					style={styles.commentInput}
					labelStyle={styles.commentInputLabel}
					label="Commentarios"
					placeholder="Escribe tu comentario"
					value={comment}
					onChangeText={setComment}
				/>
			</Layout>
		)
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
						title="Products Detail"
						alignment="center"
						accessoryLeft={BackAction}
						// rightControls={[overflowMenu()]}
					/>
					<KeyboardAvoidingView style={styles.container}>
						<CommentList
							style={styles.commentList}
							data={info.item.comments}
							ListHeaderComponent={renderHeader}
						/>
					</KeyboardAvoidingView>
				</SafeAreaView>
			</HandleBack>
		</>
	);
};

export default ProductDetailScreen;

const themedStyles = StyleService.create({
	container: {
		flex: 1,
		backgroundColor: "background-basic-color-2",
	},
	commentList: {
		flex: 1,
		backgroundColor: "transparent",
	},
	header: {
		marginBottom: 8,
	},
	image: {
		height: 340,
		width: "100%",
	},
	detailsContainer: {
		paddingVertical: 24,
		paddingHorizontal: 16,
	},
	subtitle: {
		marginTop: 4,
	},
	price: {
		position: "absolute",
		top: 24,
		right: 16,
	},
	description: {
		marginVertical: 16,
	},
	size: {
		marginBottom: 16,
		fontWeight: "normal",
	},
	colorGroup: {
		flexDirection: "row",
		marginHorizontal: -8,
	},
	colorRadio: {
		marginHorizontal: 8,
	},
	actionContainer: {
		flexDirection: "row",
		marginHorizontal: -8,
		marginTop: 24,
	},
	actionButton: {
		flex: 1,
		marginHorizontal: 8,
	},
	sectionLabel: {
		marginVertical: 8,
	},
	commentInputLabel: {
		fontSize: 16,
		marginBottom: 8,
		color: "text-basic-color",
	},
	commentInput: {
		marginHorizontal: 16,
		marginVertical: 24,
	},
});
