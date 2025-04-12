import Product from "../model/productModel.js";
import asyncHandler from "express-async-handler";

export const getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.page) || 1;

  const count = await Product.countDocuments();

  const product = await Product.find()
    .sort({ _id: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.status(200).json({ product, page, pages: Math.ceil(count / pageSize) });
});
// lấy tất cả sản phẩm
// export const getProducts = asyncHandler(async (req, res) => {
//   const pageSize = 8;
//   const page = Number(req.query.pageNumber) || 1;
//   const keyword = req.query.keyword
//     ? {
//         name: {
//           $regex: req.query.keyword,
//           $options: "i",
//         },
//       }
//     : {};
//   const count = await Products.countDocuments({ ...keyword });
//   const products = await Product.find({ ...keyword })
//     .limit(pageSize)
//     .skip(pageSize * (page - 1))
//     .sort({ _id: -1 });
//   res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
// });

// // tạo sản phẩm mới
// export const createProduct = async (req, res) => {
//   try {
//     const product = req.body;
//     const newProduct = new Product(product);
//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
// // cập nhật sản phẩm
// export const updateProduct = async (req, res) => {
//   try {
//     const updateProduct = req.body;
//     const productID = await Product.findByIdAndUpdate(
//       { _id: updateProduct._id },
//       updateProduct.ProductData,
//       { new: true }
//     );
//     console.log(productID);
//     res.status(200).json(productID);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// // xóa sản phẩm
// export const deleteProduct = async (req, res) => {
//   try {
//     const updateProduct = req.body;
//     const productID = await Product.findByIdAndDelete({
//       _id: updateProduct._id,
//     });
//     console.log(productID);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
