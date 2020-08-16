# Cryptogram

It is a simple web application useful to encrypt and decrypt a string. It is developed using React js in frontend, Node js in backend and Express framework for server. It is deployed to heroku and can accessed through the link given below.

https://cryptogram9.herokuapp.com/

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

In backend, the string is either encrypted or decrypted according to the function that was choosen from frontend. The basic idea of implementing the functions is based on caeser-cipher encryption and decryption algorithms. To know more about caeser cipher <a href="https://www.geeksforgeeks.org/caesar-cipher-in-cryptography/">click here</a>

<img src="https://www.geeksforgeeks.org/wp-content/ql-cache/quicklatex.com-c8ec2929f6200eac3e62ce0606b45a7d_l3.svg" ></img>

<img src="https://www.geeksforgeeks.org/wp-content/ql-cache/quicklatex.com-2fa18340a62f44efc5fc32cb361a047e_l3.svg"><img>

A modified version of caeser-cipher algorithm is used in this project. To make it more secure, ascii value of each letter is combined with total number of letters in the string and subtracted with letter position in the string. It helps to not output same encrypted letter for repetitive letters.

Since the modulo(%) operator in javascript can even return negative values, I did modified it by adding the same number as modulo.

Finally, the backend returns the encrypted or decrypted string to the React frontend and that will be displayed.

### Responsiveness

I had used bootstrap media queries in this project and so, the application is responsive in both mobile and computer screens :+1:.
