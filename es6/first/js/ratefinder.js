import * as service from './rate-service-mock'

let url = "https://api.myjson.com/bins/3r5he"

// fetch(url)
// 	.then(response => response.json())
// 	.then( rates=> {
// 		let html = ''
// 		rates.forEach(rate => html += `<tr><td>${rate.name}</td><td>${rate.years}</td><td>${rate.rate}%</td></tr>`);
// 		document.getElementById("rates").innerHTML = html
// 	})
// 	.catch(e => console.log(e))

service.findAll()
	.then(rates => {
		let html = '';
        rates.forEach(rate => html += `<tr><td>${rate.name}</td><td>${rate.years}</td><td>${rate.rate}%</td></tr>`);
		document.getElementById("rates").innerHTML = html
	})
	.catch(e => console.log(e))