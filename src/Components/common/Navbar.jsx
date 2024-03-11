import { Link, matchPath, useNavigate } from 'react-router-dom';
import StudyNotion from '../../assets/Logo/Logo-Full-Light.png';
import {NavbarLinks} from '../../data/navbar-links';
import { useLocation } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ProfileDropdown from '../Core/Auth/ProfileDropdown'
import { useEffect, useState } from 'react';
import { apiConnector } from '../../Services/apiConnector';
import { tags } from '../../Services/apis';
import {IoIosArrowDropdownCircle} from 'react-icons/io'
import { logOut } from '../../Services/operations/authOperations';
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";

    // const subLinks =[
    //     {
    //         title:"Python",
    //         link:"/catalog/python"
    //     },
    //     {
    //         title:"Web Development",
    //         link:"/catalog/webDevelopment"
    //     },
    // ]

function Navbar(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const location = useLocation();
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const {totalItems} = useSelector((state)=>state.cart);
    const [subLinks,setSublinks] = useState([]);
    const [showNavbar,setShowNavBar] = useState(false);

    // console.log(token);
    // console.log(user);

    async function getSubLinks(){
        try {
            const result = await apiConnector("GET",tags.TAG_API);
            // console.log("Getting Results",result.data.tags);
            setSublinks(result.data.tags);
            
        } catch (error) {
            console.log("Error in getting the Catalog details",error);
        }
    }

    useEffect(()=>{
        getSubLinks();
    },[])

    function logoutHandler(e){
        e.preventDefault();
        setShowNavBar(false);
        dispatch(logOut(navigate));
    }

    function matchRoute(Route){
        return matchPath({path:Route}, location.pathname);
    }

    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 mt-5'>
            <div className="relative mx-auto w-11/12 flex flex-row justify-between items-center max-w-maxContent">
                {/* LogoAdded */}
                <Link to={"/"}>
                    <img src={StudyNotion} alt='Logo' width={160} height={32}/>
                </Link>

                {/* Navbar */}
                <nav className='hidden sm:block'>
                    <ul className='flex gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map((link,index)=>{
                                return(
                                    <li key={index}>
                                        {
                                            link.title === "Catalog"
                                            ?(
                                                <div className='relative flex gap-2 items-center group'>
                                                    <p>{link.title}</p>
                                                    <IoIosArrowDropdownCircle />

                                                    <div className='p-4 invisible absolute left-[50%] top-[80%] translate-x-[-50%] translate-y-[20%] flex flex-col rounded-md bg-richblack-5 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 sm:w-[300px] z-10'>
                                                        
                                                        <div className='absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded bg-richblack-5 translate-x-[80%] translate-y-[-45%]'></div>

                                                        {
                                                            subLinks?.length ? (
                                                                subLinks.map((link,index)=>(
                                                                    <Link to={`/catalog/${link.tagName.split(' ').join('-').toLowerCase()}`} key={index}>
                                                                        {link.tagName}
                                                                    </Link>
                                                                ))
                                                            ) : (<div></div>)
                                                        }
                                                    </div>

                                                </div>
                                            )
                                            :(<Link to={link?.path}>
                                                <p className={`${matchRoute(link.path)?"text-yellow-25":"text-richblack-25"}`}>
                                                    {link?.title}
                                                </p>
                                            </Link>)
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>

                {/* Navbar for responsive page */}
                <div className='sm:hidden'>
                    {
                    user && user?.accountType !=="Instructor" && (
                        <Link to={"/dashboard/cart"}
                        className='relative top-[2px] text-richblack-50 text-4xl font-bold'
                        >
                            <AiOutlineShoppingCart />
                            {
                                totalItems > 0 && (
                                    <span className='absolute text-base text-richblack-900 bg-yellow-200 rounded-full w-[20px] h-[20px] flex justify-center items-center p-3 top-0 left-5 font-semibold italic'>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                    }
                </div>
                <div className='sm:hidden'>
                    {
                        token !== null && <ProfileDropdown /> 
                    }
                </div>

                {/* Hamburger button for responsive */}
                <div className='sm:hidden text-white'>
                    <RxHamburgerMenu 
                    width={15}
                    height={15}
                    className='w-8 h-8 mr-4'
                    onClick={()=>setShowNavBar((prev)=>!prev)}
                    />


                    {/* Items of Hamburger <button></button> */}

                    <div
                    className={`${showNavbar ? 'fixed inset-0 z-[1000] !mt-0 flex items-center justify-center flex-col  gap-16 overflow-auto bg-richblack-500 bg-opacity-50 backdrop-blur-sm' :'hidden'}`}
                    >
                        <div className='flex flex-col gap-3'>
                            {
                                NavbarLinks.map((link,index)=>{
                                    return(
                                        <div key={index}>
                                            {
                                                link.title === "Catalog"
                                                ?(
                                                    <div className='relative flex gap-2 items-center group'>
                                                        <p className='text-2xl text-richblack-800 font-extrabold bg-caribbeangreen-500 p-2 rounded-md '>{link.title}</p>
                                                        <IoIosArrowDropdownCircle 
                                                        className='text-2xl text-richblack-25'
                                                        />

                                                        <div className='p-4 invisible absolute left-[50%] top-[80%] translate-x-[-50%] translate-y-[20%] flex flex-col rounded-md bg-richblack-5 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[250px] sm:w-[300px] z-10 gap-3 '>
                                                            
                                                            <div className='absolute left-[50%] top-0 h-6 rotate-45 rounded bg-richblack-5 translate-x-[80%] translate-y-[-45%]'></div>

                                                            {
                                                                subLinks?.length ? (
                                                                    subLinks.map((link,index)=>(
                                                                        <Link to={`/catalog/${link.tagName.split(' ').join('-').toLowerCase()}`} key={index}
                                                                        onClick={()=>setShowNavBar(false)}

                                                                        className='text-lg font-bold p-2
                                                                        bg-black text-richblack-100 text-center rounded-lg 
                                                                        '
                                                                        >
                                                                            {link.tagName}
                                                                        </Link>
                                                                    ))
                                                                ) : (<div></div>)
                                                            }
                                                        </div>

                                                    </div>
                                                )
                                                :(<Link to={link?.path}
                                                onClick={()=>setShowNavBar(false)}
                                                >
                                                    <p className={`${matchRoute(link.path)?"text-yellow-200 text-2xl font-extrabold":"text-2xl text-richblack-25 font-extrabold"}`}>
                                                        {link?.title}
                                                    </p>
                                                </Link>)
                                            }
                                        </div>
                                    )
                                })
                            }

                            <div className=' flex flex-row gap-x-7 items-center'>
                            {
                                token === null && (
                                    <Link to={"/login"}
                                    onClick={()=>setShowNavBar(false)}
                                    >
                                        <button className={`${matchRoute('/login')? "border border-richblack-100" : "border border-richblack-700 "} bg-yellow-50 px-[12px] py-[8px] text-richblack-900 rounded-md font-bold`}>Log in</button>
                                    </Link>
                                )
                            }
                            {
                                token === null && (
                                    <Link to={"/signup"}
                                    
                                    onClick={()=>setShowNavBar(false)}>
                                        <button className={`${matchRoute('/signup')? "border border-richblack-100" : "border border-richblack-700 "} bg-yellow-50 px-[12px] py-[8px] text-richblack-900 rounded-md font-bold`}>Sign up</button>
                                    </Link>
                                )
                            }
                            
                            {
                                token!==null &&(
                                        <button className={`border border-richblack-700 bg-yellow-25 px-[12px] py-[4px] text-richblack-900 rounded-md font-bold`}
                                        onClick={logoutHandler}
                                        >Log Out </button>
                                )
                            }
                            </div>
                        </div>
                        <div
                        onClick={()=>setShowNavBar(false)}
                        >
                            <RxCross2 
                            className='w-16 h-16 text-lg font-bold bg-richblack-900 p-2 rounded-full'
                            />
                        </div>
                    </div>
                </div>
                
                

                {/* Login Sign up Button  */}
                <div className=' flex-row gap-x-7 items-center hidden sm:flex'>

                    {
                        user && user?.accountType !=="Instructor" && (
                            <Link to={"/dashboard/cart"}
                            className='relative top-[2px] text-richblack-50 text-4xl font-bold'
                            >
                                <AiOutlineShoppingCart />
                                {
                                    totalItems > 0 && (
                                        <span className='absolute text-base text-richblack-900 bg-yellow-200 rounded-full w-[20px] h-[20px] flex justify-center items-center p-3 top-0 left-5 font-semibold italic'>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={"/login"}>
                                <button className={`${matchRoute('/login')? "border border-richblack-100" : "border border-richblack-700 "} bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md`}>Log in</button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={"/signup"}>
                                <button className={`${matchRoute('/signup')? "border border-richblack-100" : "border border-richblack-700 "} bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md`}>Sign up</button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropdown /> 
                    }
                    {
                        token!==null &&(
                                <button className={`border border-richblack-700 bg-richblack-800 px-[12px] py-[4px] text-richblack-100 rounded-md`}
                                onClick={logoutHandler}
                                >Log Out </button>
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default Navbar;