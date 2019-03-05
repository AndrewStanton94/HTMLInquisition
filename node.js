const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const fetch = require('node-fetch');

const host = 'https://www.port.ac.uk';
const queryURL = "https://www.port.ac.uk/study/courses?level=pg-taught&page=1&results=200&sort=AZ";
const linkQuery = '.Content .o-Grid h2>a';

fetch(queryURL)
	.then((res) => res.text())
	.then((body) => {
		// Get the URLS of courses from search results
		const searchDom = new JSDOM(body);
		let doc = searchDom.window.document;
		return [...doc.querySelectorAll(linkQuery)];
	})
	// Convert to absolute URLs
	.then((links) => links.map(a => `${host}${a.href}`))
	// Subset to test
	.then((links) => links.slice(0, 2))
	.then((links) =>
		Promise.all(links.map(url =>
			fetch(url)
				.then(resp => resp.text())
				.then((body) => {
					// Get the URLS of courses from search results
					console.log(body);
					const searchDom = new JSDOM(body);
					let doc = searchDom.window.document;
					let occurrences = [...doc.querySelectorAll('h5')].filter((e) => e.textContent === 'Qualifications or experience');
						return occurrences ? undefined : 'todo'
				})
		)).then(texts => {
			return texts
		})
	)
	.then(console.log);
