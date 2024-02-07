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
	const [takeGreenText, setTakeGreenText] = useState(false);

	const handleOperation = (value) => {
		if (value === 'C') {
			setTakeGreenText(false);
			setOut('0');
			setFirstNumber(null);
			setOperator('');
		} else if (value === '+' || value === '-') {
			setTakeGreenText(false);
			setFirstNumber(parseFloat(out));
			setOperator(value);
			setOut('');
		} else if (value === '=' || value === 'Enter') {
			if (firstNumber !== null && operator && out) {
				setTakeGreenText(true);
				const secondNumber = parseFloat(out);
				const result =
					operator === '+'
						? firstNumber + secondNumber
						: firstNumber - secondNumber;
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
		if (e.key >= '0' && e.key <= '9') {
			takeNumber(e.key);
		} else if (e.key === '+' || e.key === '-' || e.key === 'Enter') {
			handleOperation(e.key);
		} else if (e.key === 'Backspace') {
			out.length > 1 ? setOut(out.slice(0, -1)) : setOut('0');
			setTakeGreenText(false);
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
				className={
					styles.input + ' ' + (takeGreenText ? styles.green : styles.black)
				}
				onChange={handleChange}
				value={out}
				onKeyDown={handleKeyDown}
			/>
			<div className={styles.buttonsContainer}>
				{buttons.map((item) => (
					<button
						className={styles.button}
						onClick={() => {
							if (['+', '-', '=', 'C'].includes(item.val)) {
								handleOperation(item.val);
							} else {
								setTakeGreenText(false);
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
