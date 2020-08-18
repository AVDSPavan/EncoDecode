const express = require("express");
const router = express.Router();

let chartoNum = {};
for (let i = 0; i < 26; i++) {
	//let bin= i.toString(2).padStart(5,'0')
	let ch = String.fromCharCode(97 + i);
	chartoNum[ch] = i;
}
for (let i = 26; i < 52; i++) {
	//let bin= i.toString(2).padStart(5,'0')
	//let ch = parseInt(String.fromCharCode(48+i-27))
	let ch = String.fromCharCode(65 + i - 26);
	chartoNum[ch] = i;
}

s1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
//Base 26 to base 10
const encode = (str) => {
	let len = str.length;
	let result = "";
	result += str.charCodeAt(len - 1) - 97;
	for (let i = len - 2; i >= 0; i--)
		result = result * 26 + (str.charCodeAt(i) - 97);
	console.log(result);
	return encode1(result);
};

//Base 10 to base 52
const encode1 = (str) => {
	let result = "";
	while (str > 0) {
		let r = str % 52;
		result += s1[r];
		str = Math.floor(str / 52);
	}
	return result.split("").reverse().join("");
};

//Base 56 to Base 10
const decode = (str) => {
	let len = str.length;
	let result = s1.indexOf(str[len - 1]);
	for (let i = len - 2; i >= 0; i--) {
		result = result * 52 + s1.indexOf(str[i]);
	}
	console.log(result);
	return decode1(result);
};
//Base 10 to Base 26
const decode1 = (str) => {
	let result = "";
	while (str > 0) {
		let r = str % 26;
		result += s1[r];
		str = Math.floor(str / 26);
	}
	return result.split("").reverse().join("");
};

// let base26 = 'abcdefghijklmnopqrstuvwxyz'
// let base62 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

router.post("/", (req, res) => {
	let originalString = req.body.name;
	const check = req.body.check;
	if (check === 0) {
		return res.json(encode(originalString));
	} else {
		return res.json(decode(originalString));
	}
});

module.exports = router;
