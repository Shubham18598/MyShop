import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting single product");
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  //getAll Category

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
        // navigate("/dashboard/admin/products")
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //handle product function

  const handleProductUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );
      if (data.success) {
        toast.success("prduct Update Sucessfully");

        setTimeout(() => {
          navigate("/dashboard/admin/products");
        }, 500);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  //Delete function

  const handleProductDelete = async () => {
    try {
      const answer = window.prompt(
        `Are you sure wnat to delete this product ?
        YES or NO`
      );
      if (answer !== "YES") return
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );

      toast.success("prduct Delete Sucessfully");
      setTimeout(() => {
        navigate("/dashboard/admin/products");
      }, 500);

    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };
  return (
    <Layout title={"Admin Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                value={category}
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product-photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    {id && (
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                        alt="product-photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Write a Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  value={shipping ? "YES" : "NO"}
                  placeholder="Select Shipping"
                  size="large"
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">NO</Option>
                  <Option value="1">YES</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-primary"
                  onClick={handleProductUpdate}
                >
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-primary"
                  onClick={handleProductDelete}
                >
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
