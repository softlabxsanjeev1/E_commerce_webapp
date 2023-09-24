import React from 'react'
import { Link } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>   
         <div>
            <div class="list-group">
                <h4>Admin Panel</h4>
                <Link to="/dashboard/admin/create-category" class="list-group-item list-group-item-action">Create Category</Link>
                <Link to="/dashboard/admin/create-product" class="list-group-item list-group-item-action">Create Product</Link>
                <Link to="/dashboard/admin/products" class="list-group-item list-group-item-action">Products</Link>
                    <Link to="/dashboard/admin/orders" class="list-group-item list-group-item-action"> All Orders</Link>
                <Link to="/dashboard/admin/users" class="list-group-item list-group-item-action">Users</Link>
            </div>
        </div>
        </>
    )
}

export default AdminMenu