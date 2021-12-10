import firebase from "firebase/app";

const ConfigFirebase = {
	apiKey: "AIzaSyAUcuJ8mlJBjhVrzwn7zOxdWM3XBImxk9o",
	authDomain: "daviddomicilios-2ca2e.firebaseapp.com",
	databaseURL: "daviddomicilios-2ca2e-default-rtdb.firebaseio.com",
	projectId: "daviddomicilios-2ca2e",
	storageBucket: "daviddomicilios-2ca2e.appspot.com",
	messagingSenderId: "438790431527",
	appId: "1:438790431527:web:407a4ca951ddee492cff02",
	measurementId: "G-GX7XBT67CC",
};

export default firebase.initializeApp(ConfigFirebase);
