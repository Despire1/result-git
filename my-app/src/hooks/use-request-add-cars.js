import { useState } from 'react'
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useRequestAddCars = (refreshFlag) => {
	const [isCreating, setIsCreating] = useState(false);

	const addNewCar = () => {
		setIsCreating(true);

		const carsDbRef = ref(db, 'cars')

		push(carsDbRef, )

		fetch('http://localhost:3001/cars', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				car: 'Audi',
				price: 2500000,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((data) => {
				console.log(`Авто добавлен - ответ сервера:`, data);
				refreshFlag();
			});
	};

	return {
		isCreating,
		addNewCar,
		setIsCreating
	}


}
