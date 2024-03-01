const fetchRequestUserMock = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				name: 'Sergey',
				age: 30,
			});
		}, 1500);
	});
};

export const updateUser = () => {
	return (dispatch) => {
		fetchRequestUserMock().then((newUserData) => {
			dispatch({
				type: 'UPDATE_USER',
				payload: newUserData,
			});
		});
	};
};
