import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Navbar from "./Components/common/Navbar";
import OTPform from "./Pages/OTPform";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import OpenRoute from "./Components/Core/Auth/OpenRoute";
import PrivateRoute from './Components/Core/Auth/PrivateRoute';
import MyProfile from "./Components/Core/Dashboard/MyProfile";
import DashBoard from "./Pages/DashBoard";
import Error from './Pages/Error';
import Settings from "./Components/Core/Dashboard/Settings";
import EnrolledCourses from "./Components/Core/Dashboard/EnrolledCourses";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./Utils/constants";
import AddCourse from "./Components/Core/Dashboard/AddCourse";
import MyCourses from "./Components/Core/Dashboard/MyCourses";
import Catalog from "./Pages/Catalog";
import CourseDetails from "./Pages/CourseDetails";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetails from "./Components/Core/View Course/VideoDetails";
import BatchPurchased from "./Components/Core/Auth/BatchPurchased";
import Instructor from "./Components/Core/Dashboard/InstructorDashBoard/Instructor";
import Cart from "./Components/Core/Cart";

function App() {

  const {user} = useSelector((state)=>state.profile);


  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter relative">

        <Navbar />

        <Routes>


          <Route path="/" element={<HomePage />}/>

          <Route path="/about" element={<About />} />

          <Route path="/catalog/:catalogName" element={<Catalog />}/>
          <Route path="/courses/:courseId" element={<CourseDetails />} />
          <Route path="/contact" 
          element={<Contact />}/>

          <Route path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
          />


          <Route path="/signup" 
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          } 
          />


          <Route path="/userRegistration/verify-email" 
          element={
            <OpenRoute>
              <OTPform />
            </OpenRoute>
          }
          />


          <Route path="/forgotPassword" 
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
          />
          
          <Route path="/reset-your-password/:token" 
          element={
            <OpenRoute>
              <ResetPasswordPage />
            </OpenRoute>
          }
          />

          <Route  element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }>
            <Route path="/dashboard/my-profile" element={<MyProfile />} />

            <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />

            <Route path="/dashboard/settings" element={<Settings />} />

            {
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && 
              (
                <Route path="/dashboard/add-course" element={<AddCourse />} />
              )
            }

            {
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && 
              (
                <Route path="/dashboard/my-courses" element={<MyCourses />} />
              )
            }
            {
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && 
              (
                <Route path="/dashboard/instructor" element={<Instructor />} />
              )
            }

            {
              user?.accountType ===ACCOUNT_TYPE.STUDENT &&
              (
                <Route path="/dashboard/cart" element={<Cart />} />
              )
            }

          </Route>
          

          <Route
          element={<PrivateRoute>
            <BatchPurchased >
              <ViewCourse />
            </BatchPurchased>
          </PrivateRoute>}
          >
            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails/>}/>
                </>
              )
            }
          </Route>



          <Route path="*" element={<Error/>} />

        </Routes>
    </div>
  );
}

export default App;
