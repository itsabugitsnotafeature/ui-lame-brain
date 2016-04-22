import React from 'react';
import ContactsList from './ContactsList';

let contacts = [{
	id: 1,
	name: 'ItsABug',
	phone: '555 333 7777'
}, {
	id: 2,
	name: 'ItsNot',
	phone: '111 222 3333'
}, {
	id: 3,
	name: 'Afeature',
	phone: '444 555 6666'
}];

class App extends React.Component {
	render() {
		
		return (
				<div>
					<h1>Contacts List</h1>
					<ContactsList contacts={this.props.contacts} />
				</div>
			)
	}
}

React.render(<App contacts={contacts}/>, document.getElementById('app'))