import {
	List,
	Text,
	TopNavigation,
	TopNavigationAction,
} from "@ui-kitten/components";
import React from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";

import CategoryCard from "../components/category-card";
import Data from "../redux/data/data.json";
import { MenuIcon } from "../components/icons";
import HandleBack from "../Back";

const categories = Data.categories;

const HomeScreen = ({ navigation }) => {
	const displayTrainings = Data.categories;
	const renderHeader = () => (
		<>
			<Text style={styles.headerTitle} appearance="hint">
				MÁS POPULAR
			</Text>
			<List
				contentContainerStyle={styles.horizontalList}
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				data={displayTrainings.reverse()}
				renderItem={renderHorizontalTrainingItem}
			/>
		</>
	);

	const renderHorizontalTrainingItem = (info) => (
		<CategoryCard
			style={styles.horizontalItem}
			category={info.item}
			navigation={navigation}
		/>
	);

	const renderVerticalTrainingItem = (info) => (
		<CategoryCard
			style={styles.verticalItem}
			category={info.item}
			navigation={navigation}
		/>
	);

	const toggleDrawer = () => {
		navigation.toggleDrawer();
	};

	const menuRenderer = () => (
		<TopNavigationAction icon={MenuIcon} onPress={toggleDrawer} />
	);

	return (
		<>
			<HandleBack>
				<StatusBar barStyle={"light-content"} />
				<SafeAreaView style={{ flex: 1, margin: 5 }}>
					<TopNavigation
						title="Home"
						alignment="center"
						accessoryLeft={menuRenderer}
						// rightControls={[overflowMenu()]}
					/>
					<List
						contentContainerStyle={styles.list}
						data={categories}
						renderItem={renderVerticalTrainingItem}
						ListHeaderComponent={renderHeader}
					/>
				</SafeAreaView>
			</HandleBack>
		</>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	list: {
		paddingVertical: 10,
	},
	headerTitle: {
		marginHorizontal: 16,
	},
	horizontalList: {
		marginVertical: 16,
		paddingHorizontal: 8,
	},
	verticalItem: {
		marginVertical: 8,
		marginHorizontal: 16,
	},
	horizontalItem: {
		width: 256,
		marginHorizontal: 8,
	},
});
