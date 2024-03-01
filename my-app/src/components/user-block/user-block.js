import { UserPersonalInfo, UserContacts } from './components'

export const UserBlock = () => {

	return (
		<>
			<h2>Пользователь:</h2>
			<UserPersonalInfo />
			<UserContacts />
		</>
	)
}
