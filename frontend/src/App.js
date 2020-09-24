import React from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import './main.css'

function App() {
	return <>
		<Navbar></Navbar>
		<Switch>
			<Route exact path="/">
				<Home></Home>
			</Route>
			<Route>
				<NotFound></NotFound>
			</Route>
		</Switch></>
}

export default App