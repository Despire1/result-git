import { useEffect } from 'react';

const MyComponent = (props) => {
	const date = new Date();

	useEffect(() => {
		console.log(date);
	}, []);

	return (
		<div>{date}</div>
	)
};
