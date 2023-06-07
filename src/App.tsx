import React from 'react';
import './App.css'
import MainRoute from "./Routes";

//import BackLayout from "./components/layouts/BackLayout";
import FrontLayout from "./components/layouts/FrontLayout";

function App() {
  return (
		<>
		<div className="App">
			<FrontLayout />
	    </div>
		  <MainRoute/>
		</>
  );
}

export default App;
