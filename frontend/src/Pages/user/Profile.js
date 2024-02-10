import React, { useEffect, useState } from "react"
import Layout from "../../components/Layout"
import UserMenu from "../../components/Layout/UserMenu"
import { useAuth } from "../../context/auth"
import toast from "react-hot-toast"
import axios from "axios"

const Profile = () => {
  const [auth, setAuth] = useAuth()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  useEffect(() => {
    const { email, name, phone, address } = auth?.user
    setEmail(email)
    setName(name)
    setPhone(phone)
    setAddress(address)
  }, [auth.user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phone, address }
      )
      if (data?.error) {
        toast.error(data?.error)
      } else {
        setAuth({ ...auth, user: data?.updatedUser })

        let ls = localStorage.getItem("auth")
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem("auth", JSON.stringify(ls))
        toast.success("Profile Updated Successfully")
      }

      // if (res.data.success) {
      //   setTimeout(() => {
      //     toast.success(res.data && res.data.message);
      //   }, 1000);
      // } else {
      //   toast.error(res.data.message);
      // }
    } catch (error) {
      console.log(error)
      toast.error("Somthing went wrong")
    }
  }

  return (
    <Layout titile={"Your Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
                <div className="mb-3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Name"
                  />
                </div>
                <div className="mb-3">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your email"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="number"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Number"
                  />
                </div>
                <div className="mb-3">
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Address"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
