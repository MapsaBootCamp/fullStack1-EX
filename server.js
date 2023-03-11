require("dotenv").config();
const express = require("express");
const app = express();
const {userRouter}= require("./routes")
app.use(express.json());

app.use('/user', userRouter);




const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`server run on por ${PORT}`);
});
