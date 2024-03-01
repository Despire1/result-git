import './App.css';
import { Header, UserBlock } from './components';
import { useDispatch } from 'react-redux';
import { RESET_USER, updateUser } from './actions';

function App() {
	const dispatch = useDispatch();

	const onUserReset = () => {
		dispatch(RESET_USER);
	};

	return (
		<div>
			<div className="App-header">
				<Header />
				<hr />
				<UserBlock />
				<button onClick={onUserReset}>Сбросить пользователя</button>
			</div>
		</div>
	);
}

export default App;
