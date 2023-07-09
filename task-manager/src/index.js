import express  from "express";
import chalk from "chalk";
import * as taskMongoose from './db/mongoose.js'
import * as userRoutes from "./routers/user.js"
import * as taskRoutes from "./routers/task.js"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRoutes.router)
app.use(taskRoutes.router)

app.listen(port, () =>{
    console.log(chalk.green('Server is up on port ' + port))
})