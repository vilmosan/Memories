import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Auth from "./components/Auth/auth";

const App = () => (
	<BrowserRouter>
		<Container maxWidth={"lg"}>
			<Navbar />
			<Switch>
				<Route path={"/"} exact component={Home}/>
				<Route path={"/auth"} exact component={Auth}/>
			</Switch>
		</Container>
	</BrowserRouter>

);

export default App