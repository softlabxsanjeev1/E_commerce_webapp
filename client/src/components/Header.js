import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillBagDashFill } from 'react-icons/bs'
import { useAuth } from '../context/auth'
import { toast } from 'react-hot-toast'
// import SearchInput from './Form/SearchInput'
import useCategory from '../hooks/useCategory'
import { useCart } from '../context/Cart'
import { Badge } from 'antd'

const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart()
    const categories = useCategory()
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth")
        toast.success("Logout successfully")
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" >
            <div className='container-fluid'>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <Link to="/" className="navbar-brand  ms-2" style={{ wordSpacing: "5px", letterSpacing: "2px" }}
                    > <span className='logo'><BsFillBagDashFill /></span> <strong> Ecommerce App</strong></Link>
                    <div className="collapse navbar-collapse mx-4 p-2" >
                        {/* <span><SearchInput /></span> */}
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item ">
                                <Link to='/' className="nav-link ">Home </Link>
                            </li>
                            <li className='nav-item dropdown'>
                                <Link to="/categories"
                                    className='nav-link dropdown-toggle'
                                    data-bs-toggle='dropdown'
                                >
                                    categories
                                </Link>
                                <ul className='dropdown-menu'>
                                    <li>
                                        <Link to={'/categories'} className="dropdown-item ">All categories</Link>
                                    </li>
                                    {categories?.map((c) => (
                                        <li>
                                            <Link to={`/category/${c.slug}`} className="dropdown-item ">{c.name}</Link>
                                        </li>))}
                                </ul>
                            </li>
                            {
                                !auth.user ? (<>
                                    <li className="nav-item">
                                        <Link to='/register' className="nav-link ">Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/login' className="nav-link ">Login</Link>
                                    </li>
                                </>) : (<>
                                    <li className='nav-item dropdown'>
                                        <Link
                                            className='nav-link dropdown-toggle'
                                            role='button'
                                            data-bs-toggle='dropdown'
                                            aria-expanded="false"
                                        >{auth?.user?.name}
                                        </Link>
                                        <ul className='dropdown-menu'>
                                            <li>
                                                <Link to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                                                    className="dropdown-item" >Dashboard</Link>
                                            </li>
                                            <li>
                                                <Link to='/login' onClick={handleLogout} className="dropdown-item ">Logout</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </>)
                            }
                            <li className="nav-item">
                                <Badge count={cart?.length} showZero>
                                    <Link to='cart' className="nav-link ">Cart</Link>
                                </Badge>

                            </li>
                        </ul>
                    </div>

            </div>
                
            </nav>
        </>
    )
}

export default Header