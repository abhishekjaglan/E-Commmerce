import express from "express"
import { getProducts,getProductById,deleteProduct,createProduct,updateProduct,createProductReview,getTopProducts} from '../controllers/productControllers.js'
import { protect, admin } from '../middleware/authMiddleware.js'
// import Product from '../models/productModel.js'
// import asyncHandler from "express-async-handler"

const router = express.Router()

//@desc: fetch all products
// @route: GET api/product
//@access: public

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)

// router.get('/', asyncHandler(async(req, res) => {
//     const products= await Product.find({})
//     res.json(products) })
// )

//@desc: fetch single product
// @route: GET api/product/:id
//@access: public
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

// router.get('/:id', asyncHandler(async(req, res) => {
//   const product=await Product.findById(req.params.id).catch(e => false);

//   //why we use catch
//   //The reason you're not seeing that 404 is, most likely, because you are calling the route with something like /products/dflhdshfd. The problem with that is that findById only accepts strings that can be cast to an ObjectId, which, of course dflhdshfd cannot be. Hence when you call your route with /products/dflhdshfd, your app bombs and throws this error:

//   if(product){
//     res.json(product)
//   }
//   else{
//     res.status(404).json({message:'Product not found'})
//   }
//    })
// )



export default router