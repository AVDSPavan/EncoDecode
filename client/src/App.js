import React, { useState } from "react";
export const App = () => {
	//const [limit, setLimit] = useState(0);
	const [data, setData] = useState("Result");
	const [body, setBody] = useState({
		OriginalString: "",
		cryptFunction: "0",
	});
	const clicked = (OriginalString, cryptFunction) => {
		return fetch(`/api/`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: OriginalString, check: cryptFunction }),
		})
			.then((res) => {
				console.log(res);
				return res.json();
			})
			.then((res) => setData(res))
			.catch((err) => console.log(err));
	};

	const onValueChange = (event) => {
		setBody({ ...body, cryptFunction: event.target.value });
	};

	const onStringChange = (event) => {
		setBody({ ...body, OriginalString: event.target.value });
	};

	return (
		<div className="container" style={{ position: "relative" }}>
			<p
				className="text bold"
				style={{
					textAlign: "center",
					backgroundColor: "yellow",
					position: "sticky",
					top: "0px",
					zIndex: "1",
					fontSize: "230%",
					fontFamily: "sans-serif",
				}}>
				Cryptogram
			</p>
			<br />
			<br />
			<div className="container">
				<div className="row">
					<div className="col-lg-4 offset-lg-4 col-sm-6 offset-sm-3">
						<form
							onSubmit={(event) => {
								event.preventDefault();
								// setLimit(document.getElementById("limit").value);
								clicked(body.OriginalString, parseInt(body.cryptFunction));
							}}>
							<div className="form-group mb-2">
								<input
									type="text"
									className="form-control"
									placeholder="Enter any String"
									id="input"
									onChange={(e) => onStringChange(e)}
									required
								/>
								<div
									className="container form-control-borderless mt-3"
									style={{ backgroundColor: "black", color: "white" }}>
									<div className="row justify-content-around">
									<div className="col-sm-4">
										<input
											type="radio"
											value="0"
											name="crypto"
											checked={body.cryptFunction === "0"}
											onChange={(e) => onValueChange(e)}
										/>{" "}
										Encrypt
									</div>
									<div className="col-sm-4">
										<input
											type="radio"
											value="1"
											name="crypto"
											checked={body.cryptFunction === "1"}
											onChange={(e) => onValueChange(e)}
										/>{" "}
										Decrypt
									</div>
								</div>
								</div>
								<button className="btn-success form-control mt-3" type="submit">
									Submit
								</button>
								<br/>
								<br/>
							</div>
						</form>
						<div>
							{/* <p className="text-info">Result:</p> */}
							<div className="text-success" style={{backgroundColor:"white", wordWrap: "break-word",fontSize:"140%",borderRadius:"3px"}}>
							{data}
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <div>
				<p className="text-info">{body.OriginalString}</p>
				<p className="text-info">{body.cryptFunction}</p>
			</div> */}
		</div>
	);
};
export default App;
