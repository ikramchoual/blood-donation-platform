
const express = require("express");
const app = express();

app.use(express.json());

const donorRoutes = require("./routes/donorRoutes");
app.use("/donors", donorRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});