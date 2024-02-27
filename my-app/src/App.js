import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, NavLink, Outlet, useParams, useNavigate, Navigate } from 'react-router-dom';

const database = {
	productList: [
		{ id: 1, name: 'Audi' },
		{ id: 2, name: 'BMW' },
		{ id: 3, name: 'Mercedes' },
	],
	products: {
		1: { id: 1, name: 'Audi', price: 3600, amount: 21 },
		2: { id: 2, name: 'BMW', price: 4600, amount: 13 },
		3: { id: 3, name: 'Mercedes', price: 7600, amount: 20 },
	},
};

const generateProducts = () => database.productList;
const fetchProducts = (id) =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(database.products[id]);
		}, 2000);
	});

const MainPage = () => <div>Контент главной страницы</div>;
const Catalog = () => (
	<div>
		<h3>Контент страницы каталога</h3>
		<ul>
			{generateProducts().map(({ id, name }) => (
				<li key={id}>
					<ExtendedLink to={`product/${id}`}>{name}</ExtendedLink>
				</li>
			))}
		</ul>
		<Outlet />
	</div>
);
const Contacts = () => <div>Контент страницы "О нас"</div>;
const NotFound = () => <div>Такой страницы не существует</div>;
const ProductNotFound = () => <div>Такой страницы не существует</div>;
const ProductLoadError = () => <div>Произошла ошибка при загрузке данных</div>;
const Product = () => {
	const params = useParams();
	const navigate = useNavigate();

	const [product, setProduct] = useState(null);

	useEffect(() => {
		let isLoadingTimeout = false;

		setTimeout(() => {
			isLoadingTimeout = true;

			navigate('/product-load-error');
		}, 5000);

		fetchProducts(params.id).then((loadedData) => {
			if (!isLoadingTimeout) {
				setProduct(loadedData);
			}
		});
	}, []);

	if (!product) {
		return <ProductNotFound />;
	}

	const { name, price, amount } = product;

	return (
		<>
			<h3>Товар - {name}</h3>
			<p>Цена - {price}</p>
			<p>Количество - {amount}</p>
		</>
	);
};

const ExtendedLink = ({ to, children }) => (
	<NavLink to={to}>
		{({ isActive }) =>
			isActive ? (
				<>
					<span>{children}</span>
					<span>*</span>
				</>
			) : (
				<div>{children}</div>
			)
		}
	</NavLink>
);

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<div>
					<h3>Меню</h3>
					<ul>
						<li>
							<ExtendedLink to="/">Главная</ExtendedLink>
						</li>
						<li>
							<ExtendedLink to="/catalog">Каталог</ExtendedLink>
						</li>
						<li>
							<ExtendedLink to="/about">О нас</ExtendedLink>
						</li>
					</ul>
				</div>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/catalog" element={<Catalog />}>
						<Route path="product/:id" element={<Product />} />
					</Route>
					<Route path="/product-load-error" element={<ProductLoadError />} />
					<Route path="/404" element={<NotFound />} />
					<Route path="/about" element={<Contacts />} />
					<Route path="*" element={<Navigate to="/404" />} />
				</Routes>
			</header>
		</div>
	);
}

export default App;
