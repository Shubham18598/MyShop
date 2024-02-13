import express from "express"
import {
  isAdmin,
  requireSignIn,
} from "../middlewares/authMiddleware.js"
import {
  categoryController,
  createCategoryController,
  deleteCategory,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js"

const router = express.Router()

//routes
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
)

//update category

router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
)

//get all category

router.get("/get-category", categoryController)

router.get("/single-category/:slug", singleCategoryController)

router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategory)

export default router
