import express from "express"
import {
  isAdmin,
  requireSignIn,
} from "../middlewares/authMiddleware.js"
import {
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  singleProductController,
  updateProductController,
} from "../controllers/productController.js"
import formidable from "express-formidable"

const router = express.Router()

//create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
)

//get products

router.get("/get-product", getProductController)

//get single product

router.get("/get-product/:slug", singleProductController)

//get photo

router.get("/product-photo/:pid", productPhotoController)

//Delete product
router.delete("/delete-product/:pid", deleteProductController)

//Update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
)

//filter product

router.post("/product-filters", productFilterController)

//product count

router.get("/product-count", productCountController)

//product Per Page

router.get("/product-list/:page", productListController)

//search product

router.get("/search/:keyword", searchProductController)

//similar product

router.get("/related-product/:pid/:cid", relatedProductController)

//category wise product
router.get("/product-category/:slug", productCategoryController)

//Product Routes

//token    (braintree token/// for accout verify)
router.get("/braintree/token", braintreeTokenController)

//payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController)
export default router
