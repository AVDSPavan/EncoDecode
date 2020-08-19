# EncoDecode

It is a simple web application useful to encode and decode a string by compressing their character count. It is developed using React js in frontend, Node js in backend and Express framework for server. It is deployed to heroku and can accessed through the link given below.

http://encodecode.herokuapp.com/

## Technologies used in this project:

1. React js
2. Node js
3. Express js
4. Bootstrap
5. HTML
6. CSS

### Frontend

It consists of an input text box to get the input string and two radio buttons to choose the encrypt or decrypt operations for the given string and a submit button to process the string.

When input is given and submit button is clicked, the frontend will fire a POST request to node js backend with input string as body.

### Backend

In backend, the string is either encoded or decoded according to the function that was choosen from frontend.


#### Encoding algo

Take ASCII decimal values and convert into binary, taken only 6 bits out of 8 ,as 6 bits will be enough to character values upto 64 characters (our requirement a-zA-Z which are 52)

Step 1: Convert an input byte stream into a group of 6 bytes with .
If there are less than (6 or multiple of 6) bytes, at the end, pad additional empty bytes.

Step 2. Divide this group into multiple of 8 each chunk of 6 bits. 

Step 3. If a chunk has both actual bits and empty bits, replace the empty bits in that chunk with 0’s.

Step 4. Convert each 6 bits chunk to its decimal value

Step 5. In the base-62 symbol chart, map each decimal value to its corresponding character.

#### Decoding algo

Take ASCII decimal values and convert into binary as 8 bits for each character.(Pad '0' to the left if less than 8)

Step 1: Concatenate all the resulted 8 bit binary ascii values.

Step 2: Take exactly 6 bits intervals from the binary array and add it to a list

Step 3: Now, convert the 6 bit binary chunk to decimal value and map it to the base list to get the corresponding characters

Step 4: Return the resulted characters by joining as string

Finally, the backend returns the encrypted or decrypted string to the React frontend and that will be displayed.

### Responsiveness

I had used bootstrap media queries in this project and so, the application is responsive in both mobile and computer screens :+1:.


### Testcases

## Note:
Not able to figure out to map only alphanumeric characters as output. So, Special characters will also result in the encoded string.

#### T1

Input  : helloworld

Output : BË9c,0

#### T2

Input  : smartworld

Output : HÀMc,0

#### T3

Input  : encodecode

Output : Ð@@



## Tried hard based on hints and got the below algorithm..

### Algo :  

Base 26 to Base 10 and then Base 10 to Base 52 for encode


Base 52 to Base 10 and then Base 10 to Base 26 for decode


## Encode

//Base 26 to base 10

const encode = (str) => {
	
  let len = str.length;
	
  let result = "";
	
  result += str.charCodeAt(len - 1) - 97;
	
  for (let i = len - 2; i >= 0; i--){
		
    result = result * 26 + (str.charCodeAt(i) - 97);}

  console.log(result);
	
  return encode1(result);

};

//Base 10 to base 52

const encode1 = (str) => {
	
  let result = "";
	
  while (str > 0) {
		
    let r = str % 52;
		
    result += s1[r];
		
    str = Math.floor(str / 52);}
    
	return result.split("").reverse().join("");

};


## Decode

//Base 56 to Base 10

const decode = (str) => {
	
  let len = str.length;
	
  let result = s1.indexOf(str[len - 1]);
	
  for (let i = len - 2; i >= 0; i--) {
		
    result = result * 52 + s1.indexOf(str[i]);}
    
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

