const express = require("express");
const router = express.Router();

router.post("/",(req,res)=>{
	let originalString = req.body.name;
	const check = req.body.check;
	//.reverse().join('');
let cryptedString ='';
	const n=originalString.length
	if(check === 0){
		let i=0;
		while(i<n){
			let temp;
			if(57 >= originalString.charCodeAt(i))
			{
				if(originalString.charCodeAt(i) >= 48)
				{
					//console.log('num encry');
				temp = String.fromCharCode(((originalString.charCodeAt(i) + (n-i) -48) % 10+10)%10+48 )
			}}
			else if (122 >= originalString.charCodeAt(i))
			{ 
				if (originalString.charCodeAt(i)  >= 97 )
				{
					temp = String.fromCharCode(((originalString.charCodeAt(i) + (n-i) -97) % 26 + 26)%26+ 97 )
					//console.log('encry '+temp)
				}
			}
			else{
				//console.log('else')
			}
			cryptedString+=temp
			i++;
		}
	}
	else{
		let i=0;
		while(i<n){
			let temp;
			if(57 >= originalString.charCodeAt(i))
			{
				if(originalString.charCodeAt(i) >= 48)
				{
				//console.log('num decry');
				temp = String.fromCharCode(((originalString.charCodeAt(i) - (n-i) -48) % 10+10)%10 +48 )
			}}
			else if (122 >= originalString.charCodeAt(i))
			{ 
				if (originalString.charCodeAt(i)  >= 97 )
				{
					
					temp = String.fromCharCode(((originalString.charCodeAt(i) - (n-i) -97) % 26 + 26)%26 + 97 )
					//console.log('decrypting ' +originalString.charCodeAt(i)+ ' to '+temp)
				}
			}
			else{
				//console.log('decry else')
			}
			cryptedString+=temp
			i++;
		}
	}
	return res.json(cryptedString);
});


module.exports = router;