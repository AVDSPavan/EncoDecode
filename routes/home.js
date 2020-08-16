const express = require("express");
const router = express.Router();


const compressString = str =>{
	let result=''
	let n = str.length
	for(let i=0;i<n;i++){
		let count=1
		while (i<n-1 && str[i]===str[i+1]){
			count++;
			i++;
		}
		if (count>1){
			result=result+str[i]+count.toString();
		}
		else{
			result=result+str[i];
		}
		
	}
	result=result.split('').reverse().join('')
	let i=0
	n=result.length;
	let cryptedString=''
	while(i<n){
	if (122 >= result.charCodeAt(i))
	{
		if (result.charCodeAt(i)  >= 97 )
		{
			temp = String.fromCharCode(((result.charCodeAt(i) + (n-i) -97) % 26 + 26)%26+ 97 )
		}
		else{
			temp=result[i]
		}
	}
	cryptedString+=temp
	i++;
}
	return cryptedString;
}

const decompressString = str =>{
	let i=0,n=str.length;
	let cryptedString=''
	while(i<n){
	if (122 >= str.charCodeAt(i))
	{
		if (str.charCodeAt(i)  >= 97 )
		{
			temp = String.fromCharCode(((str.charCodeAt(i) - (n-i) -97) % 26 + 26)%26+ 97 )
		}
		else{
			temp=str[i]
		}
	}
	cryptedString+=temp
	i++;
}
	str=cryptedString.split('').reverse().join('')
	let result=''
	i=0
	while(i<n-1){
		if(Number.isInteger(parseInt(str[i+1]))){
			let digits=0
			let k=1
			while(Number.isInteger(parseInt(str[i+k])) && i+k<n){
				digits+=1
				k++
			}
			for(let j=0;j<parseInt(str.substring(i+1,i+1+digits));j++){
				result=result+str[i]
			}
			i=i+1;
		}
		else{
			result+=str[i]
		}
		i++;
	}
	if(!Number.isInteger(parseInt(str[n-1]))){
		result+=str[n-1]
	}
	return result
}

router.post("/", (req, res) => {
	let originalString = req.body.name;
	const check = req.body.check;
	if (check === 0) {
		return res.json(compressString(originalString));
	} else {
		
		return res.json(decompressString(originalString));
	}
});

module.exports = router;
