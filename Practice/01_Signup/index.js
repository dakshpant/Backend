import express from "express";
import HomeRoute from  './route/user.route.js'
const app = express();
const port = 3000;
app.listen(port, ()=>{
    console.log(`Server Listening to port ${port}`);
})

app.use('/', HomeRoute);
