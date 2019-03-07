const { JSDOM } = require("jsdom");
const fetch = require('node-fetch');
let utils = {};

utils.fetchAndDOM = (url) => {
	return fetch(url)
		.then((res) => res.text())
		.then((body) => {
			const searchDom = new JSDOM(body);
			let doc = searchDom.window.document;
			return doc;
		});
};

utils.adequateRegExp = (str, regExp) => {
	// TODO Check this is needed / suitable
	// RegExp/g to get all matches
	// map(regExp) to extract the values
}

module.exports = utils;
