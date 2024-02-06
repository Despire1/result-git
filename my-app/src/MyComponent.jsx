import { useState, useEffect } from 'react';
import styles from './MyComponent.module.css';

export const MyComponent = () => {
	let buttons = [
		{ val: '1' },
		{ val: '2' },
		{ val: '3' },
		{ val: '4' },
		{ val: '5' },
		{ val: '6' },
		{ val: '7' },
		{ val: '8' },
		{ val: '9' },
		{ val: '0' },
		{ val: '+' },
		{ val: '-' },
		{ val: '=' },
		{ val: 'C' },
	];

	const [out, setOut] = useState('0');
	const [firstNumber, setFirstNumber] = useState(null);
	const [operator, setOperator] = useState('');

	const handleOperation = (value) => {
		if (value === 'C') {
			setOut('0');
			setFirstNumber(null);
			setOperator('');
		} else if (value === '+' || value === '-') {
			setFirstNumber(parseFloat(out));
			setOperator(value);
			setOut('');
		} else if (value === '=' || value === 'Enter') {
			if (firstNumber !== null && operator && out) {
				const secondNumber = parseFloat(out);
				const result = operator === '+' ? firstNumber + secondNumber : firstNumber - secondNumber;
				setOut(String(result));
				// Сбросить состояние для новых расчетов
				setFirstNumber(null);
				setOperator('');
			}
		}
	};

	const handleChange = (event) => {
		setOut(event.target.value);
	};

	const handleKeyDown = (e) => {
		if ((e.key >= '0' && e.key <= '9')) {
			takeNumber(e.key);
		} else if (e.key === '+' || e.key === '-' || e.key === 'Enter') {
			handleOperation(e.key);
		}
	};

	const takeNumber = (value) => {
		if (out === '0' || out === '') {
			setOut(value);
		} else {
			setOut((prev) => prev + value);
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [out]);

	return (
		<>
			<input
				className={styles.input}
				onChange={handleChange}
				value={out}
				onKeyDown={handleKeyDown}
			></input>
			<div className={styles.buttonsContainer}>
				{buttons.map((item) => (
					<button
						className={styles.button}
						onClick={() => {
							if (['+', '-', '=', 'C'].includes(item.val)) {
								handleOperation(item.val);
							} else {
								takeNumber(item.val);
							}
						}}
						key={item.val}
					>
						{item.val}
					</button>
				))}
			</div>
		</>
	);
};
