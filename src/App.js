/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { useState, useEffect } from "react";
import { tableData } from "./data";
// import avatar from "./Avatar.png";
function App() {
	let [reserv, setReserv] = useState(tableData);
	let [data, setData] = useState(tableData);
	let [pressedCount, setPressedCount] = useState({ st: "", action: false });
	let [pressedPrice, setPressedPrice] = useState({ st: "", action: false });
	const [isCheckedCount, setCheckedCount] = useState(false);
	const [isCheckedIns, setCheckedIns] = useState(false);
	useEffect(() => {
		console.log("changes ", isCheckedCount, isCheckedIns, pressedCount, data);
		globalFilter();
		if (pressedCount.st === "pressed") {
			sortByType(pressedCount,"count");
		}
		if (pressedPrice.st === "pressed") {
			sortByType(pressedPrice,"price");
		}
	}, [isCheckedCount,isCheckedIns,pressedCount,pressedPrice]);

	function filterCount() {
		console.log(!isCheckedCount);

		setCheckedCount((isCheckedCount) => !isCheckedCount);
		
	}
	function filterInstallment() {
		setCheckedIns((isCheckedIns) => !isCheckedIns);
	}
	function globalFilter() {
		if (isCheckedCount && !isCheckedIns) {
			let filteredData = reserv.filter((x) => x.count > 0);
			setData(filteredData);
		} else if (isCheckedCount && isCheckedIns) {
			let filteredData = reserv.filter((x) => x.count > 0 && x.instalment);
			setData(filteredData);
		} else if (!isCheckedCount && isCheckedIns) {
			let filteredData = reserv.filter((x) => x.instalment);
			setData(filteredData);
		} else if (!isCheckedCount && !isCheckedIns) {
			setData([...reserv]);

		}
	}
	function sortByType(type, column) {
		console.log(type,column)
		if (type.action) {
			setReserv(tableData.sort((a, b) => a[column] - b[column]))
			globalFilter();
		} else {
			setReserv(tableData.sort((a, b) => b[column] - a[column]))
			globalFilter();
		}
	}
	function sortCount() {
		setPressedCount({ st: "pressed", action: !pressedCount.action });
		setPressedPrice({ st: "", action: !pressedPrice.action });
	}
	function sortPrice() {
		setPressedPrice({ st: "pressed", action: !pressedPrice.action });
		setPressedCount({ st: "", action: !pressedCount.action });
	}
	return (
		<div className="App">
			<div className="top">
				<div className="divCheck">
					<input
						type="checkbox"
						id="instalment"
						name="instalment"
						value="instalment"
						onClick={filterInstallment}
					/>
					<label htmlFor="instalment">Только в рассрочку</label>
				</div>
				<div className="divCheck">
					<input
						type="checkbox"
						id="exist"
						name="exist"
						value="exist"
						onClick={filterCount}
					/>
					<label htmlFor="exist">Есть в наличии</label>
				</div>
			</div>
			<table>
				<thead>
					<tr>
						<th>№</th>
						<th className="col_title">Название</th>
						<th onClick={sortPrice} id="col_price">Цена</th>
						<th onClick={sortCount} id="col_count">
							Количество
						</th>
						<th id="col_instalment">В рассрочку</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => {
						return (
							<tr key={index} className={`${item.count < 5 ? "orange" : "" }`}>
								<td>{index + 1}</td>
								<td>
									<div className="titleText">{item.name}</div>
								</td>
								<td>{item.price} т</td>
								<td>{item.count}</td>
								<td>{item.instalment ? "✅" : " "}</td>
							</tr>
						);
					})}
				</tbody>
			</table>

			{/* task1
			<div className="box">
				<div className="header">
					<img src={avatar} alt="Avatar" />
					<div className="headerContent">
						<div
							className="username"
							title="Shrek Ogrbekuly ibnShrek Ogrbekuly  asdShrek Ogrbekuly Shrek Ogrbekuly"
						>
							Shrek Ogrbekuly ibnShrek Ogrbekuly asdShrek Ogrbekuly Shrek
							Ogrbekuly Shrek Ogrbekuly ibnShrek Ogrbekuly asdShrek Ogrbekuly Shrek
							Ogrbekuly
						</div>
						<a href="#">@shrek</a>
					</div>
				</div>
				<p className="content">
					Всем привет, я живу на болоте! Вот мой адрес:
					<a href="https://2gis.kz/nur_sultan">https://2gis.kz/nur_sultan</a>
				</p>
				<div className="bottom">
					<p className="hint">11:32 • 2 марта 2022г</p>
					<p className="hint">Нравится: 255 • Комментарии: 7 • Репост: 3</p>
				</div>
			</div> */}
		</div>
	);
}

export default App;
