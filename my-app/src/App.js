import logo from './logo.svg';
import './App.css';
import date from './index.js';
import { createElement } from 'react';


function App() {
	return createElement(
		'div',
		{className: 'App'},
		createElement(
			'header',
			{className: 'App-header'},
			createElement('img', {src: logo, className: 'App-logo', alt: 'logo'}),
			createElement('p', null,
			'Edit ',
			createElement('code', null, 'src/App.js'),
			' and save to reload 2.'
			),
			createElement(
				'a',
				{className: 'App-link', href: 'https://reactjs.org', target: "_blank", rel: "noopener noreferrer" },
				'Learn React'
			),
			createElement(
				'div',
				null,
				date
			)
		)
	);
}

export default App;
