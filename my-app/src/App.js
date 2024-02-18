import './App.css';
import { useState } from 'react';
import { useRef } from 'react';

let validateData = {
	login: '',
	password: '',
}

function App() {
	const [login, setLogin] = useState('')
	const [loginError, setLoginError] = useState(null)
	const [password, setPassword] = useState('')
	const [passwordError, setPasswordError] = useState(null)
	const [doublePassword, setDoublePassword] = useState('')
	const [doublePasswordError, setDouoblePasswordError] = useState(null)
	const submitButtonRef = useRef(null)

	const onLoginChange = ({ target }) => {
		setLogin(target.value)

		let error = null;

		if (!/^[\w_]*$/.test(target.value)) {
			error = "Неверный логин. Допустимые символы - буквы, цифры и нижнее подчеркивание"

		} else if (target.value.length > 20) {
			error = "Неверный логин. Допустимо не более 20 символов"

		}

		if (target.value.length === 20 && password.length === 18 && password === doublePassword) {
			submitButtonRef.current.focus()
		}

		setLoginError(error)
	}

	const onLoginBlur = ({ target }) => {
		let error = null;

		if (target.value.length < 3) {
			error = "Неверный логин. Допустимо не менее 3 символов"
		}

		setLoginError(error)

	}

	const onPasswordChange = ({ target }) => {
		setPassword(target.value)

		let error = null;

		if (target.value.length > 18) {
			error = "Недопустимый пароль. Введите не более 18 символов"
		}

		if (target.value.length === 18 && login.length === 20 && target.value === doublePassword) {
			submitButtonRef.current.focus()
		}

		setPasswordError(error)
	}

	const onPasswordBlur = ({ target }) => {

		let error = null;

		if (!/^(?=.*[A-Z])[\w_]+$/.test(target.value)) {
			error = "Недопустимый пароль. Пароль должен содержать хотя бы одну заглавную букву. Допустимы буквы, цифры и нижнее подчеркивание"

		}

		setPasswordError(error)

	}

	const onDoublePasswordChange = ({ target }) => {
		setDoublePassword(target.value)
		if (password.length === 18 && login.length === 20 && target.value === password) {
			submitButtonRef.current.focus()
		}
	}

	const onDoublePasswordBlur = ({ target }) => {
		setDoublePassword(target.value)
		let error = null;


		if (target.value !== password) {
			error = 'Пароли не совпадают'
		}

		setDouoblePasswordError(error)
	}

	const onSubmit = (e) => {
		e.preventDefault()
		validateData = {...validateData, login: login, password: password }
		console.log(validateData)
	}

	return (
		<div className='App'>
			<header className='App-header'>
				<form onSubmit={onSubmit}>
					{loginError && <div className='ErrorText'>{loginError}</div>}
					<input name='login' type='text' value={login} placeholder='Логин' onChange={onLoginChange} onBlur={onLoginBlur}/>
					{passwordError && <div className='ErrorText'>{passwordError}</div>}
					<input name='password' type='password' value={password} placeholder='Пароль' onChange={onPasswordChange} onBlur={onPasswordBlur}/>
					{doublePasswordError && <div className='ErrorText'>{doublePasswordError}</div>}
					<input name='doublePassword' type='password' placeholder='Повторите пароль' value={doublePassword} onChange={onDoublePasswordChange} onBlur={onDoublePasswordBlur}/>
					<button ref={submitButtonRef} type='submit' disabled={loginError !== null || passwordError !== null || doublePasswordError !== null}>Зарегистрироваться</button>
				</form>
			</header>
		</div>
	)

}

export default App;


// const [login, setLogin] = useState('');
// 	const [loginError, setLoginError] = useState(null);
// 	const submitButtonRef = useRef(null)

// 	const onInputChange = ({ target }) => {
// 		setLogin(target.value);

// 		let error = null;

// 		if (!/^[\w_]*$/.test(target.value)) {
// 			error =
// 				'Неверный логин. Допустимые символы - буквы, цифры и нижнее подчеркивание';
// 		} else if (target.value.length > 20) {
// 			error = 'Неверный логин. Допустимыо не более 20 символов';
// 		}

// 		if (target.value.length === 20) {
// 			submitButtonRef.current.focus()
// 		}

// 		setLoginError(error);
// 	};

// 	const onSubmit = (event) => {
// 		event.preventDefault()
// 		console.log(login)
// 	};

// 	const onBlur = ({ target }) => {
// 		if (target.value.length < 3) {
// 			setLoginError("Неверный логин. Допускается не меньше 3 символом")
// 		}

// 	}

// 	return (
// 		<div className="App">
// 			<header className="App-header">
// 				<form onSubmit={onSubmit}>
// 					{loginError && <div className='ErrorText'>{loginError}</div>}
// 					<input
// 						type="text"
// 						name="login"
// 						value={login}
// 						placeholder='Логин'
// 						onChange={onInputChange}
// 						onBlur={onBlur}
// 					/>
// 					<button ref={submitButtonRef} type="submit" disabled={loginError !== null}>
// 						Отправить
// 					</button>
// 				</form>
// 			</header>
// 		</div>
// 	);
