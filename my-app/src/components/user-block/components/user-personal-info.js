import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../actions";

export const UserPersonalInfo = () => {
	const { name, age } = useSelector((state) => state.user)
	const dispatch = useDispatch()

	const onUserUpdate = () => {
		dispatch(updateUser())
	};

	return (
		<>
			<h3>Персональные данные:</h3>
			<div>Имя: {name} </div>
			<div>Возраст: {age} </div>
			<button onClick={onUserUpdate}>Обновить пользователя</button>
		</>
	);
};
