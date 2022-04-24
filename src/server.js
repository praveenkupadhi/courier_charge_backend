const port = 3001;
const connect = require("./configs/db");
const app = require("./index");

app.listen(port, async () => {
	try {
		await connect();
		console.log("listening on port " + port);
	} catch (error) {
		console.log(error.message);
	}
});
