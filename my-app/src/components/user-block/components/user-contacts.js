import { useSelector } from "react-redux";

export const UserContacts = () => {

	const { phone, email } = useSelector((state) => state.user);

	return (
		<>
			<h3>Контакты:</h3>
			<div>Телефон: {phone} </div>
			<div>Почта: {email} </div>
		</>
	);
};
