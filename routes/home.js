const express = require("express");
const router = express.Router();

let chartoNum = {};
let numtoChar = {};
for (let i = 0; i < 26; i++) {
	//let bin= i.toString(2).padStart(5,'0')
	let ch = String.fromCharCode(97 + i);
	chartoNum[ch] = i;
	numtoChar[i] = ch;
}
for (let i = 26; i < 52; i++) {
	//let bin= i.toString(2).padStart(5,'0')
	//let ch = parseInt(String.fromCharCode(48+i-27))
	let ch = String.fromCharCode(65 + i - 26);
	chartoNum[ch] = i;
	numtoChar[i] = ch;
}
for (let i = 52; i < 62; i++) {
	let ch = parseInt(String.fromCharCode(48 + i - 52));
	chartoNum[ch] = i;
	numtoChar[i] = ch;
}

const encode = (str) => {
	let encoded = [];
	let res = "";
	let len = str.length;
	for (let i = 0; i < len; i++) {
		encoded.push(chartoNum[str[i]].toString(2).padStart(6, "0"));
	}
	len = encoded.length;
	emptybytes = 8 - (len % 8);
	for (let i = 0; i < emptybytes; i++) {
		encoded.push("xxxxxxxx");
	}
	len = encoded.length;
	encoded = encoded.join("");
	//console.log(encoded)
	len = encoded.length;
	numofchunks = parseInt(len / 8);
	chunks = [];
	let j = 0;
	for (let i = 0; i < numofchunks; i++) {
		chunks.push(encoded.substring(j, j + 8));
		j += 8;
	}
	len = chunks.length;
	for (let i = 0; i < len; i++) {
		if (
			chunks[i][0] !== "x" &&
			(chunks[i][0] === "0" || chunks[i][0] === "1")
		) {
			if (chunks[i][7] === "x") {
				let z = chunks[i];
				let x = z.indexOf("x");
				z = z.substring(0, x);
				x = 8 - x;
				let temparr = "";
				for (let idx = 0; idx < x; idx++) {
					temparr += "0";
				}
				z += temparr;
				chunks[i] = z;
			}
			res += String.fromCharCode(parseInt(chunks[i], 2));
		}
	}
	console.log(chunks);
	console.log(res);
	return res;
};

const decode = (str) => {
	let temparr = [];
	let len = str.length;
	for (let i = 0; i < len; i++) {
		temparr.push(str.charCodeAt(i).toString(2).padStart(8, "0"));
	}
	console.log(temparr);
	temparr = temparr.join("");
	len = temparr.length;
	let decoded = [];
	i = 0;
	while (i < len) {
		decoded.push(temparr.substring(i, i + 6));
		i += 6;
	}
	console.log(decoded);
	len = decoded.length;
	let result = "";
	for (let i = 0; i < len - 1; i++) {
		result += numtoChar[parseInt(decoded[i], 2)];
	}
	console.log(result);
	return result;
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
