// App is started from this module

const app = require("./app");
const kue = require("kue");

const PORT = process.env.PORT || 5090;

// Start the kue ui server
//kue.app.listen(3001, (err) => {
//    console.log("Kue started: ", err || "");
//});

// Run the server
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});