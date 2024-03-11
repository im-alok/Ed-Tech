import Loginform from './Loginform';
import Signupform from './Signupform'

import frame from '../../../assets/Images/frame.png';

function Template(props){
    return(
        <div className='flex justify-between w-11/12 max-w-maxContent py-12 mx-auto gap-x-12 gap-y-0 flex-wrap-reverse'>
            

                <div className='w-11/12 max-w-[450px] '>
                        <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>{props.title}</h1>

                        <p className='text-[1.125rem] leading-[1.625rem] mt-4'>
                            <span className='text-richblack-100'>{props.desc1}</span>
                                <br />
                            <span className='font-edu-sa text-blue-100 font-bold italic'>{props.desc2}</span>
                        </p>

                        {
                            props.formType==="signup"
                            ?(<Signupform />)
                            :(<Loginform/>)
                        }

                </div>


            <div className='relative w-11/12 max-w-[450px]'>
                <img src={frame}
                alt='fraameImage'
                width={558}
                height={504}
                loading='lazy'
                />

                <img src={props.image}
                alt='loginImage or signupImage'
                width={558}
                height={504}
                loading='lazy'
                className='absolute -top-4 right-4'
                />
            </div>


        </div>
    )
}

export default Template;