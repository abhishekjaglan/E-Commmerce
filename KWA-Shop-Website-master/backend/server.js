// const express = require('express')
import express from 'express'
// const dotenv = require('dotenv')
import  dotenv from 'dotenv'
// const products = require('./data/products')
//import products from './data/products.js'
import connectdb from './config/db.js'
import colors from 'colors'
import path from 'path'
import morgan from 'morgan'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'


const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

dotenv.config()
const port = process.env.PORT||5000
app.listen(port, () => {
  console.log(`Example app listening on ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold)
})
connectdb()
app.use(express.json())

app.get('/', (req, res) => {
    // get data first 
    res.send(`get request called on PORT....: ${port}`)}
)
app.use('/api/products', productRoutes )
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


// app.get('/api/products', (req, res) => {
//     res.json(products) }
// )
// app.get('/api/products/:id', (req, res) => {
//   const product=products.find(p=>p._id===req.params.id)
//   res.json(product) }
// )
