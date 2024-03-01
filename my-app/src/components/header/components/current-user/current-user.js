import { useSelector } from "react-redux"


export const CurrentUser = () => {
	const name  = useSelector((state) => state.user.name)

	return (
		<div>
			Пользователь: {name}
		</div>
	)
}
