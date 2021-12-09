import React from "react";
import { View } from "react-native";
import {
	Button,
	CheckBox,
	Datepicker,
	Divider,
	Input,
	StyleService,
	Text,
	useStyleSheet,
} from "@ui-kitten/components";
import { ImageOverlay } from "../components/image-overlay";
import {
	FacebookIcon,
	GoogleIcon,
	StarIcon,
	HeartIconFill,
	TwitterIcon,
	ArrowForwardIcon,
} from "../components/icons";
import { KeyboardAvoidingView } from "../components/3rd-party";
import HandleBack from "../Back";

const SignupScreen = ({ navigation }) => {
	const [firstName, setFirstName] = React.useState();
	const [lastName, setLastName] = React.useState();
	const [email, setEmail] = React.useState();
	const [password, setPassword] = React.useState();
	const [dob, setDob] = React.useState();
	const [termsAccepted, setTermsAccepted] = React.useState(false);

	const styles = useStyleSheet(themedStyles);

	const validate = (email) => {
		const expression =
			/(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

		return expression.test(String(email).toLowerCase());
	};

	const onSignUpButtonPress = async () => {
		let emailValid = await validate(email);
		if (emailValid !== 1) {
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
		if (!termsAccepted) {
			Alert.alert("Informacion", "Debe aceptar los terminos y servicios", [
				{ text: "intente de nuevo", onPress: () => null },
			]);
			return;
		}
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((snap) => {
				console.log(snap);
				// snap.user.updateProfile({
				// 	displayName: firstName + " " + lastName,
				// })
				// .then(function () {})
				// .catch((e)=>{console.log(e)})
				// navigation && navigation.navigate("Home");
			})
			.catch((error) => {
				Alert.alert("Error", "Ocurrio un error", [
					{ text: "intente de nuevo", onPress: () => null },
				]);
			});
	};

	const onSignInButtonPress = () => {
		navigation && navigation.navigate("Login");
	};

	return (
		<HandleBack>
			<KeyboardAvoidingView style={styles.container}>
				<ImageOverlay
					style={styles.headerContainer}
					source={require("./../assets/image-background.jpg")}
				>
					<View style={styles.signUpContainer}>
						<Text style={styles.signInLabel} category="h4" status="control">
							REGISTRARSE
						</Text>
						<Button
							style={styles.signInButton}
							appearance="ghost"
							status="control"
							size="giant"
							accessoryLeft={ArrowForwardIcon}
							onPress={onSignInButtonPress}
						>
							Ingresar
						</Button>
					</View>
				</ImageOverlay>
				<View style={styles.socialAuthContainer}>
					<Text style={styles.socialAuthHintText}>
						Ingresa con tu red social
					</Text>
					<View style={styles.socialAuthButtonsContainer}>
						<Button
							appearance="ghost"
							size="giant"
							status="basic"
							accessoryLeft={GoogleIcon}
						/>
						<Button
							appearance="ghost"
							size="giant"
							status="basic"
							accessoryLeft={FacebookIcon}
						/>
						<Button
							appearance="ghost"
							size="giant"
							status="basic"
							accessoryLeft={TwitterIcon}
						/>
					</View>
				</View>
				<View style={styles.orContainer}>
					<Divider style={styles.divider} />
					<Text style={styles.orLabel} category="h5">
						O
					</Text>
					<Divider style={styles.divider} />
				</View>
				<Text style={styles.emailSignLabel}>Registrate con tu email</Text>
				<View style={[styles.container, styles.formContainer]}>
					<Input
						placeholder="Bryan"
						label="NOMBRES"
						autoCapitalize="words"
						value={firstName}
						onChangeText={setFirstName}
					/>
					<Input
						style={styles.formInput}
						placeholder="Gonzalez Orostegui"
						label="APELLIDOS"
						autoCapitalize="words"
						value={lastName}
						onChangeText={setLastName}
					/>
					{/* <Datepicker
					style={styles.formInput}
					placeholder="18/10/1995"
					label="Date of Birth"
					date={dob}
					onSelect={setDob}
				/> */}
					<Input
						style={styles.formInput}
						placeholder="bryandgonz@gmail.com"
						label="EMAIL"
						value={email}
						onChangeText={setEmail}
					/>
					<Input
						style={styles.formInput}
						label="CONTRASEÑA"
						placeholder="**************"
						secureTextEntry={true}
						value={password}
						onChangeText={setPassword}
					/>
					<CheckBox
						style={styles.termsCheckBox}
						// textStyle={}
						checked={termsAccepted}
						onChange={(checked) => setTermsAccepted(checked)}
					>
						<Text style={styles.termsCheckBoxText}>
							{
								"Si crea una cuenta acepta la Politica de privacidad y los Terminos de Uso"
							}
						</Text>
					</CheckBox>
				</View>
				<Button
					style={styles.signUpButton}
					size="large"
					onPress={onSignUpButtonPress}
				>
					REGISTRARSE
				</Button>
			</KeyboardAvoidingView>
		</HandleBack>
	);
};

const themedStyles = StyleService.create({
	container: {
		backgroundColor: "background-basic-color-1",
	},
	headerContainer: {
		minHeight: 216,
		paddingHorizontal: 16,
		paddingTop: 24,
		paddingBottom: 44,
	},
	signUpContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 32,
	},
	socialAuthContainer: {
		marginTop: 24,
	},
	socialAuthButtonsContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	socialAuthHintText: {
		alignSelf: "center",
		marginBottom: 16,
	},
	formContainer: {
		marginTop: 24,
		paddingHorizontal: 16,
	},
	evaButton: {
		maxWidth: 150,
		marginTop: 50,
		paddingHorizontal: 10,
	},
	signInLabel: {
		flex: 1,
	},
	signInButton: {
		flexDirection: "row-reverse",
		paddingHorizontal: 0,
	},
	signUpButton: {
		marginVertical: 24,
		marginHorizontal: 16,
	},
	socialAuthIcon: {
		tintColor: "text-basic-color",
	},
	orContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 16,
		marginTop: 24,
	},
	divider: {
		flex: 1,
	},
	orLabel: {
		marginHorizontal: 8,
	},
	emailSignLabel: {
		alignSelf: "center",
		marginTop: 8,
	},
	formInput: {
		marginTop: 16,
	},
	termsCheckBox: {
		marginTop: 20,
	},
	termsCheckBoxText: {
		fontSize: 12,
		lineHeight: 14,
		color: "text-hint-color",
	},
});

export default SignupScreen;
