import React from 'react';
import Contact from './Contact';

class ContactsList extends React.Component {
	constructor() {
		super();
		this.state = {
			search: 'ItsABug'
		};
	}

	updateSearch(event) {
		console.log('Yoh ! : ' + event.target.value);
		this.setState({search:event.target.value.substr(0,20)});
	}

	render() {
		console.log(this.props.contacts);
		return (
			<div> 
				<ul>
					{this.props.contacts.map((contact)=> {
						return <Contact contact={contact} key={contact.id} /> 
					})}
				</ul>

				<input type="text" 
					value= {this.state.search} 
					onChange={this.updateSearch.bind(this)} />
			</div>
			)
	}
}

export default ContactsList;