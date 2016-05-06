Polymer ({
	is : 'x-pizza-toppings',
	properties: {
		model: {
			type: Array,
			value: function() {return [];}
		}
	},

	add: function() {
		this.push('model', this.current);
		this.fire('toppings-change', {action:'add', item: this.current });
	}
});