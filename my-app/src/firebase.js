import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyBe9MoCm0T7hGv6wbImx_d8ja6PIIXjs6g',
	authDomain: 'carsproject-38847.firebaseapp.com',
	projectId: 'carsproject-38847',
	storageBucket: 'carsproject-38847.appspot.com',
	messagingSenderId: '93546012757',
	appId: '1:93546012757:web:4a4ac7b08adecb8c0074dc',
	databaseURL: 'https://carsproject-38847-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
