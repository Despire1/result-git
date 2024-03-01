import { store } from '../../store'
import { CurrentUser } from './components/current-user/current-user'


export const Header = () => {
	const { name } = store.getState()

	return (
		<div>
			<div>Информация в шапке приложения</div>
			<CurrentUser name={name} />
		</div>
	)
}
