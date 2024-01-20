import React from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/Layout/UserMenu'

const Orders = () => {
  return (
    <Layout titile={"Your Order"}>
        <div className="constainer-fluid p-3 m-3">
            <div className="row">
                <div className="col-md-3"><UserMenu/></div>
                <div className="col-md-9">All Orders</div>
            </div>
        </div>
    </Layout>
  )
}

export default Orders