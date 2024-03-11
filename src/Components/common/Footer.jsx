import { Link } from "react-router-dom";
import { FooterLink2 } from "../../data/footer-links";
import { FaFacebook,FaGoogle,FaTwitter,FaYoutube } from "react-icons/fa";

function Footer(){
    return (
        <div className="bg-richblack-800">
                <div className="w-10/12 mx-auto text-richblack-500 text-[16px] font-inter ">

                    <div className="flex flex-col justify-between pt-16 gap-12">
                        <div className="flex flex-col sm:flex-row gap-16 sm:gap-0 justify-between">
                            <div className="sm:w-[53%] sm:border-r-2 border-richblack-600">
                                <div className="flex flex-col sm:flex-row gap-16">
                                    <div className="flex flex-row sm:gap-16">
                                        <div className="flex flex-col gap-3">
                                            <Link to="/" className="text-richblack-200 text-3xl font-bold">EdTech Company</Link>
                                            <Link to="/about">About</Link>
                                            <Link to="/careers">Career</Link>
                                            <Link to="/">Study Notion</Link>
                                            <Link to="/">Affilates</Link>
                                            <div className="flex flex-row gap-3 text-[20px]">
                                                <Link><FaFacebook /></Link>
                                                <Link><FaGoogle /></Link>
                                                <Link><FaTwitter /></Link>
                                                <Link><FaYoutube /></Link>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-16">
                                            <div className="flex flex-col gap-3">
                                                <h1 className="text-richblack-200 font-bold">Resources</h1>
                                                <div className="flex flex-col gap-3">
                                                    <Link>Articles</Link>
                                                    <Link>Blogs</Link>
                                                    <Link>Charge Sheets</Link>
                                                    <Link>Code Challenges</Link>
                                                    <Link>Docs</Link>
                                                    <Link>Projects</Link>
                                                    <Link>Videos</Link>
                                                    <Link>WorkSpaces</Link>
                                                </div>

                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <h1 className="text-richblack-200 font-bold">Support</h1>
                                                <Link>Help Center</Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="flex flex-row sm:flex-col gap-[83px]">
                                            <div className="flex flex-col gap-3">
                                                <h1 className="text-richblack-200 font-bold">Plans</h1>
                                                <Link>Paid membership</Link>
                                                <Link>For Students</Link>
                                                <Link>Bussiness Solution</Link>
                                            </div>
                                            <div className="flex flex-col gap-3">
                                                <h1 className="text-richblack-200 font-bold">Community</h1>
                                                <Link>Fourms</Link>
                                                <Link>Chapters</Link>
                                                <Link>Events</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="flex flex-row gap-16 flex-wrap">
                                <div className="flex flex-col gap-3">
                                    <h1 className="text-richblack-200 font-bold">{FooterLink2[0].title}</h1>
                                    {
                                        FooterLink2[0].links.map((link) =>{
                                            return (
                                                <Link to={link.link}>{link.title}</Link>
                                            )
                                        })
                                    }
                                </div>

                                <div className="flex flex-col gap-3">
                                    <h1 className="text-richblack-200 font-bold">{FooterLink2[1].title}</h1>
                                    {
                                        FooterLink2[1].links.map((link) =>{
                                            return (
                                                <Link to={link.link}>{link.title}</Link>
                                            )
                                        })
                                    }
                                </div>

                                <div className="flex flex-col gap-3">
                                    <h1 className="text-richblack-200 font-bold">{FooterLink2[2].title}</h1>
                                    {
                                        FooterLink2[2].links.map((link) =>{
                                            return (
                                                <Link to={link.link}>{link.title}</Link>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                        <div className=" flex flex-col sm:flex-row justify-between items-center pt-8 sm:p-16 border-t-2 border-richblack-600 gap-2 sm:gap-0">
                            <div className="flex flex-row gap-3 text-[16px] text-richblack-300">
                                <Link>Privacy Policy</Link>
                                <Link>Cookie Policy</Link>
                                <Link>Terms</Link>
                            </div>

                            <div className="flex flex-row gap-3 text-sm sm:text-[16px]  text-richblack-300">
                                <h1>Made with ❤️ H&S Corporation &copy; 2023 Edtech</h1>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
    )
}

export default Footer;