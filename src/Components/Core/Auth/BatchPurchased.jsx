import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";

function BatchPurchased({children}){
    const {user} = useSelector((state)=>state.profile);
    const {courseId} = useParams();
    const navigate = useNavigate();

    if(courseId){
        if(user?.courseEnrolled?.includes(courseId)){
            return children;
        }
        else{
            return <Navigate to={`/courses/${courseId}`} />
        }
    }
    else{
        return children;
    }
}

export default BatchPurchased;