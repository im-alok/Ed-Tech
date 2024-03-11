import Template from '../Components/Core/Auth/Template';
import HighLightText from '../Components/Core/HomePage/HighLightText';
import signupImage from '../assets/Images/signup.webp';

function Signup(props){
    return(
        <div>
            <Template 
            title='Join the Millions learnin to code with StudyNotion for Free'
            desc1="Build skills for today, tomorrow, and beyond."
            desc2={<HighLightText text="Education to future-proof your career." />}
            image={signupImage}
            formType="signup"
            setIsLoggedIn={props.setIsLoggedIn}
            />

        </div>
    )
}

export default Signup;