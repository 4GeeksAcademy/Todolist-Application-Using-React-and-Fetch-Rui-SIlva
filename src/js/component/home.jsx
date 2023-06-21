import React, { useState, useEffect } from "react";


const Home = () => {
	let [tasks, setTasks] = useState([]);
	let [newTask, setTNewTask] = useState("");
	let [user, setUser] = useState('')

	useEffect(() => {
		getTasks()
	},[])

	const createUser = () => {
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
			method: 'post',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify([])
		}).then((res) => res.json())
		.then(resAsJson => {
			console.log(resAsJson);
			getTasks();
		})
		.catch(error => {
			console.log(error);
		});
	}
	
	const getTasks = () => {
		if(user !== "") {
			fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
				method: 'get',
				headers: {"Content-Type": "application/json"},
			}).then((res) => res.json())
			.then(resAsJson => {
				console.log(resAsJson);
				setTasks(resAsJson);
			})
			.catch((Err) => {
				console.log(Err);
			});
		}
	}

	const updateTasks = () => {
		const newTasks = [...tasks, {label: newTask, done: false}];
		setTasks(newTasks)
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
			method: 'put',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(newTasks)
		}).then((res) => res.json())
		.then(resAsJson => {
			console.log(resAsJson);
		})
		.catch((Err) => {
			console.log(Err);
		});
		setTNewTask("")
	}
	
	const deletetasks = (index) => {
		let reduceList = [...tasks]
		reduceList.splice(index, 1);
		console.log(reduceList);
		setTasks(reduceList);
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
				method: 'put',
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(reduceList)
			}).then((res) => res.json())
			.then(resAsJson => {
				console.log(resAsJson);
			})
			.catch((Err) => {
				console.log(Err);
			});
	}

	const deleteUser = () => {
		fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
			method: 'delete',
			headers: {"Content-Type": "application/json"},
		}).then((res) => res.json())
		.then(resAsJson => {
			console.log(resAsJson);
		})
		.catch(error => {
			console.log(error);
		});
		alert(`${user} is deleted...`)
		setTasks([])
		setUser('')
	}

	return (
		<div className="container pt-3 mt-4">
			<div className="container w-100 text-center pt-3 pb-4">
			<h1 className="title">My ToDo List</h1>
			</div>
			<div className="row">
				<div className="col mb-3 w-50">
					<input 
						className="w-100 ps-3 rounded"
						type="text"
						placeholder="Enter a username"
						value={user}
						onChange={(e) => {
							setUser(e.target.value);
						}}
						onKeyDown={
							(e) => {
								if (e.key === "Enter") {
									createUser();
								}
							}
						}
					/>
				</div>
				<div className="col mb-3 w-50">
					<button 
						type="button" 
						class="btn btn-danger h-100 w-100"
						onClick={deleteUser}
					>Delete User</button>
				</div>
			</div>
			{user === "" ? (<div><p className="ms-1 enterName">Enter a name to show ToDo List</p></div>): (
				<div className="mainContainer">
					<div className="d-flex justify-content-center">
						<input 
							className="w-100 ps-3"
							type="text"
							placeholder="Enter a task"
							value={newTask}
							onChange={(e) => {
								setTNewTask(e.target.value);
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter" && user != "") {
									updateTasks();
								}
							}}
						/>
					</div>
					<div className="d-flex justify-content-center"> 
						<ul className="w-100 p-0 m-0">
							{tasks.map((task) => {
								return <li>
											<div className="d-flex task justify-content-between">
												<div className="todoItem pb-1">{task.label}</div>
												<span><i class="far fa-times-circle fs-5 pb-1 pe-3 delete" onClick={deletetasks}></i></span>
											</div>
										</li>;
							})}
						</ul>
					</div>
					<div className="d-flex justify-content-left taskCounter">
						<p>{tasks.length > 0 ? tasks.length : "" } items left</p>
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
			)}
			
		</div>
	);
};

export default Home;