require('dotenv').config()
// async errors
require('express-async-errors')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/product">Products API</a>');
})

app.use('/api/v1/products',productsRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

//product routes
const start = async()=>{
    try {
        //connection
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server is listening port: ${port}...`))
    } catch (error) {
        console.log(error);
    }
}


start()