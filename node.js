const { JSDOM } = require("jsdom");

const fetch = require('node-fetch');

const {fetchAndDOM} = require("./utils.js");

const host = 'https://www.port.ac.uk';
const queryURL = "https://www.port.ac.uk/study/courses?level=pg-taught&page=1&results=200&sort=AZ";
const linkQuery = '.Content .o-Grid h2>a';

fetchAndDOM(queryURL)
	.then((doc) => {
		return [...doc.querySelectorAll(linkQuery)];
	})
	// Convert to absolute URLs
	.then((links) => links.map(a => `${host}${a.href}`))
	.then((links) => links.slice(0, 2))
	.then((links) =>
		Promise.all(links.map(url =>
			fetchAndDOM(url)
				.then((doc) => {
					// Entry requirements
					// // Get the URLS of courses from search results
					// let occurrences = [...doc.querySelectorAll('h5')].filter((e) => e.textContent === 'Qualifications or experience');
					// console.log(occurrences.length);
					// return occurrences.length === 0 ? url : 'Processed';

					let occurrences = [...doc.querySelectorAll('.o-TextBox>p')];
					occurrences = occurrences.filter((el) => el.textContent.includes('In each year, you need to study'));
					return occurrences.length === 0 ? url : 'Processed';
				})
		)).then(texts => texts.filter((text) => text !== 'Processed'))
		// )).then(texts => texts)
	)
	.then(console.log);
