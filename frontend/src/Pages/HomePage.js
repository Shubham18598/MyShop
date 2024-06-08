import React, { useEffect, useState } from "react"
import Layout from "../components/Layout"
import axios from "axios"
import toast from "react-hot-toast"
import { Carousel, Checkbox, Radio } from "antd"
import { Prices } from "../components/Prices"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/cart"
import "../styles/Homepage.css"
import { AiOutlineReload } from "react-icons/ai"

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])

  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const [cart, setCart] = useCart()

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      )
      if (data?.success) {
        setCategories(data?.category)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllCategory()
    getTotal()
  }, [])

  // get All Products
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      )
      setLoading(false)
      setProducts(data.products)
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error("Something went to wrong")
    }
  }

  //getTotal Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      )
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (page == 1) return
    loadMore()
  }, [page])

  // load more
  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      )
      setLoading(false)
      setProducts([...products, ...data?.products])
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter((c) => c !== id)
    }
    setChecked(all)
  }

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts()
  }, [checked.length, radio.length])

  useEffect(() => {
    if (checked.length || radio.length) filterProduct()
  }, [checked, radio])

  // filter product

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      )
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }
  const handleReset = () => {
    window.location.reload()
  }

  return (
    <Layout title={"MYSHOP"}>
      
      <div className="container-fluid row home-page">
      <Carousel autoplay>
        <div>
          <img
            className="home-carousel"
            src="https://img.freepik.com/free-photo/full-shot-happy-people-with-sale-tag_23-2149220654.jpg?t=st=1717751641~exp=1717755241~hmac=bdbe7cb76c5aa0616113bc92b3c71d2cfa49363f6fed56ce5b6c38ec55bdf30e&w=1380"
            alt=""
          />
        </div>
        <div>
          <img
            className="home-carousel"
            src="https://ps.w.org/woo-product-carousel-slider-and-grid-ultimate/assets/banner-1544x500.jpg?rev=2812931"
            alt=""
          />
        </div>
        <div>
          <img
            className="home-carousel"
            src="https://img.freepik.com/free-vector/colorful-abstract-sale-instagram-post-collection_23-2148309459.jpg?w=1380&t=st=1717751487~exp=1717752087~hmac=352fb16689b2a7d262304c26cac604434801b58be6c6a49d75f231d1f7cbed5a"
            alt=""
          />
        </div>
        <div>
          <img
            className="home-carousel"
            src="https://img.freepik.com/free-photo/sale-with-special-discount-filming-tools_23-2150040390.jpg?t=st=1717751581~exp=1717755181~hmac=440aa37cd343124e1a2a4fd064861ba58dc0e70f3ba5d9d7a8e02225bba5545e&w=1380"
            alt=""
          />
        </div>
      </Carousel>
        <div className="col-md-3 mt-5 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                // checked={checked.includes(c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* Price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group
              onChange={(e) => setRadio(e.target.value)}
              value={radio}
            >
              {Prices.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button onClick={handleReset} className="btn btn-danger">
              RESET FILTER
            </button>
          </div>
        </div>
        <div className="col-md-9 mt-5">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products.map((p) => (
              <div className="card m-2" key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p])
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        )
                        toast.success("Item add to the cart")
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault()
                  setPage(page + 1)
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
