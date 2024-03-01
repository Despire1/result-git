export const initialState = {
	user: { name: 'Artem', age: 19, phone: '+7 928 190 60 66', email: 'politanskiy2004@mail.ru' },
	products: []
};

export const reducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'RESET_USER': {
			return {
				...initialState,
				products: []
			}
		}
		case 'UPDATE_USER': {
			return {
				...state,
				user: {
					...state.user,
					...payload
				}
			}
		}
		default:
			return state;
	}
};
