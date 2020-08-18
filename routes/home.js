const express = require("express");
const router = express.Router();

let base26 = "abcdefghijklmnopqrstuvwxyz";
let base62 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

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

	// let i=0
	// while(i<len){
	// 	let temp =encoded.substring(i,i+8)

	// 	if(temp.length === 8){
	// 		//console.log(temp)
	// 		//res=res+binChar[parseInt(temp,2)]
	// 		res+=String.fromCharCode(parseInt(temp,2))
	// 		console.log('8 bit: ' + temp)
	// 	}
	// 	else{
	// 		let less= 8-temp.length
	// 		temp+='1'
	// 		less-1;
	// 		if (less!=0)
	// 		{
	// 			for(let x=1;x<less;x++){
	// 				temp+='0'
	// 			}
	// 		}
	// 		//temp=temp.padStart(8,'0')
	// 		console.log('less:  ' + temp)
	// 		//res=res+binChar[parseInt(temp,2)]
	// 		res+=String.fromCharCode(parseInt(temp,2))
	// 	}
	// 	i+=8
	// }
	// return res
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

	// let decoded1=''
	// let decoded2=''
	// let res=''
	// len = str.length;
	// for(let i=0;i<len;i++){
	// 	//decoded+= binChar[str.substring(i,i+8)]
	// 	decoded1+= parseInt(str.charCodeAt(i)).toString(2)
	// }
	// console.log(decoded1)
	// for(let i=0;i<len;i++){
	// 	//decoded+= binChar[str.substring(i,i+8)]
	// 	decoded2+= parseInt(str.charCodeAt(i)).toString(2).padStart(8,'0')
	// }
	// //decoded2.slice(0,-8).concat(decoded1.slice(-8))
	// len=decoded2.length
	// i=0
	// while(i<len){
	// 	let temp = decoded2.substring(i,i+5)
	// 	res+=binChar[parseInt(temp,2)]
	// 	i+=5
	// }
	// res=res.slice(0,-3)
	// len=decoded1.length
	// let last=decoded1.slice(-10,)
	// console.log(last)
	// i=0
	// while(i<10){
	// 	let temp = last.substring(i,i+5)
	// 	res+=binChar[parseInt(temp,2)]
	// 	i+=5
	// }
	// return res
};

// const enc = (str) => {
// 	let asc = "";
// 	for (let i = 0; i < str.length; i++) {
// 		asc = asc + (str.charCodeAt(i) - 97).toString(16);
// 	}
// 	console.log(asc);
// 	let enc = "";
// 	while (asc > 0) {
// 		let r = parseInt(asc % 62);
// 		asc = parseInt(asc / 62);
// 		console.log(asc);
// 		enc = enc + base62[r];
// 	}
// 	console.log(enc);
// };
// const dec = (str) => {};

// const compressString = (str) => {
// 	let result = "";
// 	let n = str.length;
// 	for (let i = 0; i < n; i++) {
// 		let count = 1;
// 		while (i < n - 1 && str[i] === str[i + 1]) {
// 			count++;
// 			i++;
// 		}
// 		if (count > 1) {
// 			result = result + str[i] + count.toString();
// 		} else {
// 			result = result + str[i];
// 		}
// 	}
// 	result = result.split("").reverse().join("");
// 	let i = 0;
// 	n = result.length;
// 	let cryptedString = "";
// 	while (i < n) {
// 		if (122 >= result.charCodeAt(i)) {
// 			if (result.charCodeAt(i) >= 97) {
// 				temp = String.fromCharCode(
// 					((((result.charCodeAt(i) + (n - i) - 97) % 26) + 26) % 26) + 97
// 				);
// 			} else {
// 				temp = result[i];
// 			}
// 		}
// 		cryptedString += temp;
// 		i++;
// 	}
// 	return cryptedString;
// };

// const decompressString = (str) => {
// 	let i = 0,
// 		n = str.length;
// 	let cryptedString = "";
// 	while (i < n) {
// 		if (122 >= str.charCodeAt(i)) {
// 			if (str.charCodeAt(i) >= 97) {
// 				temp = String.fromCharCode(
// 					((((str.charCodeAt(i) - (n - i) - 97) % 26) + 26) % 26) + 97
// 				);
// 			} else {
// 				temp = str[i];
// 			}
// 		}
// 		cryptedString += temp;
// 		i++;
// 	}
// 	str = cryptedString.split("").reverse().join("");
// 	let result = "";
// 	i = 0;
// 	while (i < n - 1) {
// 		if (Number.isInteger(parseInt(str[i + 1]))) {
// 			let digits = 0;
// 			let k = 1;
// 			while (Number.isInteger(parseInt(str[i + k])) && i + k < n) {
// 				digits += 1;
// 				k++;
// 			}
// 			for (let j = 0; j < parseInt(str.substring(i + 1, i + 1 + digits)); j++) {
// 				result = result + str[i];
// 			}
// 			i = i + 1;
// 		} else {
// 			result += str[i];
// 		}
// 		i++;
// 	}
// 	if (!Number.isInteger(parseInt(str[n - 1]))) {
// 		result += str[n - 1];
// 	}
// 	return result;
// };

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
