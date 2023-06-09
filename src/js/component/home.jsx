import React from "react";
import { useState } from "react";


const Home = () => {
	let [todo, setTodo] = useState('');
	let [todoList, setTodoList] = useState([]);

	const handleSubmit = (e) => {
		if (e.key === "Enter" && todo != "") {
			setTodoList([...todoList, todo]);
			setTodo('');
		}
	}
	
	const deleteItem = (index) => {
		let reduceList = [...todoList]
		reduceList.splice(index, 1);
		setTodoList(reduceList);
	}

	return (
		<div className="container pt-3 mt-4">
			<div className="container w-100 text-center pt-3">
			<h1>My ToDo List</h1>
			</div>
			<div className="mainContainer">
				<div className="d-flex justify-content-center">
					<input 
						className="w-100 ps-3"
						type="text"
						placeholder="Enter a task"
						value={todo}
						onChange={(e) => {
							setTodo(e.target.value);
						}}
						onKeyDown={handleSubmit}
					/>
				</div>
				<div className="d-flex justify-content-center"> 
					<ul className="w-100 p-0 m-0">
						{todoList.length !== 0 && todoList.map((todoItem) => {
							return <li>
										<div className="d-flex task justify-content-between">
											<div className="todoItem pb-1">{todoItem}</div>
											<span><i class="far fa-times-circle fs-5 pb-1 pe-3 delete" onClick={deleteItem}></i></span>
										</div>
									</li>;
						})}
					</ul>
				</div>
				<div className="d-flex justify-content-left taskCounter">
					<p>{todoList.length > 0 ? todoList.length : "" } items left</p>
				</div>
				<div className="CounterDiv1">
					<div className="d-flex taskCounter1">
					</div>
				</div>
				<div className="CounterDiv1">
					<div className="d-flex taskCounter2">
					</div>
				</div>
				
			</div>
		</div>
	);
};

export default Home;