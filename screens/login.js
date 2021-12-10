import { Button, Input, Text } from "@ui-kitten/components";
import React from "react";
import { StatusBar, StyleSheet, View, Alert } from "react-native";
import { KeyboardAvoidingView } from "../components/3rd-party";
import { ImageOverlay } from "../components/image-overlay";
import {
	ArrowForwardIcon,
	FacebookIcon,
	GoogleIcon,
	TwitterIcon,
} from "../components/icons";
import * as WebBrowser from "expo-web-browser";
import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import HandleBack from "../Back";
import * as firebase from "firebase";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
	const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
		clientId:
			"438790431527-ifoib2a2kut25v9sk6fkd0qh6f60db5l.apps.googleusercontent.com",
	});

	React.useEffect(() => {
		// console.log(response);
		if (response?.type === "success") {
			const { id_token } = response.params;
			var provider = new firebase.auth.GoogleAuthProvider();
			const credential = provider.credential(id_token);
			// const credential = firebase.auth.GoogleAuthProvider.credential(
			// 	// authentication.idToken,
			// 	null,
			// 	authentication.accessToken
			// );
			firebase
				.auth()
				.signInWithCredential(credential)
				.then((userCredential) => {
					// Signed in
					var user = userCredential.user;
					navigation && navigation.navigate("Home");
					// ...
				})
				.catch((error) => {
					console.log(error);
					var errorCode = error.code;
					var errorMessage = error.message;
					// ...
				});
		}
	}, [response]);
	const [email, setEmail] = React.useState();
	const [password, setPassword] = React.useState();
	const validate = (email) => {
		const expression =
			/(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

		return expression.test(String(email).toLowerCase());
	};
	const onSignInButtonPress = async () => {
		let emailValid = await validate(email);
		if (!emailValid) {
			Alert.alert(
				"Informacion",
				"Ha ocurrido un error, revise todos los campos e intente nuevamente",
				[{ text: "intente de nuevo", onPress: () => null }]
			);
			return;
		}
		if (password.lenght < 6) {
			Alert.alert(
				"Informacion",
				"Ha ocurrido un error, revise todos los campos e intente nuevamente",
				[{ text: "intente de nuevo", onPress: () => null }]
			);
			return;
		}
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((snap) => {
				navigation && navigation.navigate("Home");
			})
			.catch((error) => {
				Alert.alert("Error", "Ocurrio un error", [
					{ text: "intente de nuevo", onPress: () => null },
				]);
			});
	};

	const onSignUpButtonPress = () => {
		navigation && navigation.navigate("SignUp");
	};

	const onForgotPasswordButtonPress = () => {
		navigation && navigation.navigate("ForgotPassword");
	};

	return (
		<>
			<HandleBack>
				<StatusBar barStyle={"light-content"} />
				<KeyboardAvoidingView>
					<ImageOverlay
						style={styles.container}
						source={require("./../assets/image-background.jpg")}
					>
						<View style={styles.signInContainer}>
							<Text style={styles.signInLabel} status="control" category="h4">
								INGRESAR
							</Text>
							<Button
								style={styles.signUpButton}
								appearance="ghost"
								status="control"
								size="giant"
								accessoryLeft={ArrowForwardIcon}
								onPress={onSignUpButtonPress}
							>
								Registrarse
							</Button>
						</View>
						<View style={styles.formContainer}>
							<Input
								label="EMAIL"
								placeholder="Email"
								status="control"
								value={email}
								onChangeText={(e) => setEmail(e)}
							/>
							<Input
								label="CONTRASEÑA"
								style={styles.passwordInput}
								status="control"
								placeholder="Contraseña"
								value={password}
								secureTextEntry={true}
								onChangeText={(e) => setPassword(e)}
							/>
							<View style={styles.forgotPasswordContainer}>
								<Button
									style={styles.forgotPasswordButton}
									appearance="ghost"
									status="control"
									onPress={onForgotPasswordButtonPress}
								>
									Olvidaste tu contraseña?
								</Button>
							</View>
						</View>
						<Button status="control" size="large" onPress={onSignInButtonPress}>
							ENTRAR
						</Button>
						<View style={styles.socialAuthContainer}>
							<Text style={styles.socialAuthHintText} status="control">
								Ingresa con tu red social
							</Text>
							<View style={styles.socialAuthButtonsContainer}>
								<Button
									appearance="ghost"
									size="giant"
									status="control"
									accessoryLeft={GoogleIcon}
									onPress={() => {
										promptAsync();
									}}
								/>
								<Button
									appearance="ghost"
									size="giant"
									status="control"
									accessoryLeft={FacebookIcon}
								/>
								<Button
									appearance="ghost"
									size="giant"
									status="control"
									accessoryLeft={TwitterIcon}
								/>
							</View>
						</View>
					</ImageOverlay>
				</KeyboardAvoidingView>
			</HandleBack>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 24,
		paddingHorizontal: 16,
	},
	signInContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 100,
	},
	socialAuthContainer: {
		marginTop: 48,
	},
	evaButton: {
		maxWidth: 72,
		paddingHorizontal: 0,
	},
	formContainer: {
		flex: 1,
		marginTop: 50,
		paddingHorizontal: 16,
	},
	passwordInput: {
		marginTop: 16,
	},
	signInLabel: {
		flex: 1,
	},
	signUpButton: {
		flexDirection: "row-reverse",
		paddingHorizontal: 0,
	},
	socialAuthButtonsContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	socialAuthHintText: {
		alignSelf: "center",
		marginBottom: 16,
	},
	forgotPasswordContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	forgotPasswordButton: {
		paddingHorizontal: 0,
	},
});

export default LoginScreen;
