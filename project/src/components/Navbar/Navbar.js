import React, { useState, useEffect } from "react";
import './Navbar.css';
import { FaCameraRetro } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
    const [active, setActive] = useState('navBar');
    const [fullName, setFullName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Thêm biến trạng thái

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('user-info');
        if (storedUserInfo) {
            const userInfo = JSON.parse(storedUserInfo);
            setFullName(userInfo.fullName);
            setIsLoggedIn(true); // Đã đăng nhập thành công
        }
    }, []);

    const showNav = () => {
        setActive('navBar activeNavbar');
    }

    const removeNav = () => {
        setActive('navBar');
    }

    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        navigate('/login');
    };

    const handleLogout = () => {
        localStorage.removeItem("user-info");
        setFullName('');
        setIsLoggedIn(false); // Đăng xuất
        navigate('/login');
    };

    return (
        <section className="navBarSection">
            <div className="header">
                <div className="logoDiv">
                    <a href="#" className="logo">
                        <h1 className="flex"><FaCameraRetro className="icon" />
                            Konicarom
                        </h1>
                    </a>
                </div>

                <div className={active}>
                    <ul className="navLists flex">
                        <li className="navItem">
                            <Link to="/" className="navLink">
                                Home
                            </Link>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">Products</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">Resources</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">Contact</a>
                        </li>

                        <li className="navItem">
                            <a href="#" className="navLink">Blog</a>
                        </li>

                        <div className="headerBtns flex">
                            {isLoggedIn ? ( // Hiển thị nút Logout nếu đã đăng nhập
                                <>
                                    <div className="fullName">{fullName}</div>
                                    <button className="btn" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button className="btn loginBtn" onClick={handleLogin}>
                                        Login
                                    </button>

                                    <button className="btn">
                                        Sign up
                                    </button>
                                </>
                            )}
                        </div>
                    </ul>

                    <div onClick={removeNav} className="closeNavbar">
                        <AiFillCloseCircle className="icon" />
                    </div>
                </div>

                <div onClick={showNav} className="toggleNavbar">
                    <TbGridDots className="icon" />
                </div>
            </div>
        </section>
    );
}

export default Navbar;
