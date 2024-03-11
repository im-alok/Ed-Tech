import Template from '../Components/Core/Auth/Template';
import HighLightText from '../Components/Core/HomePage/HighLightText';
import loginimage from '../assets/Images/login.webp';

function Login(props){
    return(
        <div>
            <Template 
            title='Welcome Back'
            desc1="Build skills for today, tomorrow, and beyond."
            desc2={<HighLightText text="Education to future-proof your career." />}
            image={loginimage}
            formType="login"
            />

        </div>
    );
}


export default Login;