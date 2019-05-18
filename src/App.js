import React, { Component } from 'react';

import logo from './0xu.png';
import './App.css';
import Modal from './components/Modal/Modal';


class App extends Component {
	
	constructor() {
		super();
		
		this.state = {
			isShowing: false
		}
	}
	
	openModalHandler = () => {
		this.setState({
			isShowing: true
		});
	}
	
	closeModalHandler = () => {
		this.setState({
			isShowing: false
		});
	}
	
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<input type='text' placeholder='Long URL' />
	
					{ this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }
					
					<button className="open-modal-btn" onClick={this.openModalHandler}>Shorten</button>
					
					<Modal
						className="modal"
						show={this.state.isShowing}
						close={this.closeModalHandler}>
						How would you like to pay?
					</Modal>
					
					
					
					<a
						className="App-link"
						href="https://ethereum.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn More
					</a>
				</header>
			</div>
		);
	}
}
export default App;
