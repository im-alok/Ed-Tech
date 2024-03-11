import { useEffect, useState } from 'react';
import  { useForm }   from 'react-hook-form';
import countrycode from '../../../data/countrycode.json';
import { contactus } from '../../../Services/operations/contactOperation';
import { useDispatch } from 'react-redux';

function ContactusForm(){
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();


    function submitContactForm(data){
        setLoading(true);
        dispatch(contactus(data));
        setLoading(false);
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors,isSubmitSuccessful},
    } = useForm();

    useEffect(()=>{
        reset({
            email:"",
            firstname:"",
            lastname:"",
            message:"",
            countryCode:"",
            phonenumber:""
        })
    },[isSubmitSuccessful,reset])

    return(
        <form onSubmit={handleSubmit(submitContactForm)} className='flex flex-col gap-7 text-richblack-5 justify-center mb-2 w-fit '>

                {/* Name */}

                <div className='flex flex-col sm:flex-row gap-5 sm:w-full justify-between'>
                    <div className='flex flex-col gap-2 '>
                        {/* firstName */}
                        <label htmlFor='firstname'>First Name</label>
                        <input
                        type='text'
                        name='firstnanme'
                        id='firstname'
                        placeholder='Enter your last name'
                        {...register('firstname',{required:true})}
                        className='outline-none px-5 py-2 rounded-md bg-richblack-800'
                        />
                        {/* handling firstname error */}

                        {
                            errors.firstname && (
                                <span className="-mt-1 text-[12px] text-yellow-100">* First Name is required</span>
                            )
                        }
                    </div>

                    <div className='flex flex-col gap-2'>
                        {/* lastName */}
                        <label htmlFor='lastname'>Last Name</label>
                        <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        placeholder='Enter your last name'
                        {...register('lastname',{required:true})}
                        className='outline-none px-5 py-2 rounded-md bg-richblack-800'
                        />
                        {
                            errors.lastname && (<p className="-mt-1 text-[12px] text-yellow-100">* last name is required</p>)
                        }
                    </div>
                </div>

                {/* Email Address */}

                <div className='flex flex-col gap-2'>
                    <label htmlFor='email'>Email Address</label>
                    <input 
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter your email address'
                    {...register('email',{required:true})}
                    className='outline-none px-5 py-2 rounded-md bg-richblack-800'
                    />
                    {
                        errors.email && (<p className="-mt-1 text-[12px] text-yellow-100">* Email address is required</p>)
                    }
                </div>
                

                {/* {phoneNumber} */}
                <div className='flex flex-col gap-2'>
                    <label htmlFor='phonenumber'>Phone Number</label>

                    <div className='flex gap-5'>

                        <select
                        name='dropdown'
                        id='dropdown'
                        {...register('countryCode',{required:true})}
                        className='outline-none px-3 py-2 rounded-md bg-richblack-800 w-[20%]'
                        >
                            
                            {
                                countrycode.map(( element,index )=>{
                                    return(
                                        <option key={index} value={element.code}
                                        className='text-white'
                                        >
                                            {element.code} - {element.country}
                                        </option>
                                    )
                                })
                            }

                        </select>
                        
                        
                        <input
                        type='text'
                        name='phonenumber'
                        id='phonenumber'
                        placeholder='1234567890'
                        {...register('phonenumber',
                            {
                                required:{value:true, message:"* Phone number is required"},
                                maxLength:{value:10 ,  message:"* Invalid Phone Number"},
                                minLength:{value:8 , message:"* Invalid Phone number"},
                                pattern:/^[0-9]{10}$/
                            }
                        )}
                        className='outline-none px-5 py-2 rounded-md bg-richblack-800 flex-1'  
                        />
                    </div>
                    <div className='flex flex-row justify-between'>
                        {
                            errors.countryCode && (<p className="-mt-1 text-[12px] text-yellow-100">* Country code is required</p>)
                        }
                        {
                            errors.phonenumber && (<p className="-mt-1 text-[12px] text-yellow-100">{errors.phonenumber.message}</p>)
                        }
                    </div>

                </div>

                {/* Message */}

                <div className="flex flex-col gap-2">
                    <label htmlFor='message'>Message</label>
                    <textarea 
                    name='message'
                    id='message'
                    cols={30}
                    rows={7}
                    placeholder='enter your message here'
                    {...register('message',{required:true})}
                    className='outline-none px-5 py-2 rounded-md bg-richblack-800'
                    />
                    {
                        errors.message && (<p className="-mt-1 text-[12px] text-yellow-100">Message Cannot be empty</p>)
                    }

                </div>

                
                
                <button type='submit'
                className='w-full px-5 py-2 sm:font-semibold font-bold text-sm bg-yellow-50 rounded-md text-richblack-800 mb-2'
                >
                    Send Message
                </button>
        </form>
    )
}

export default ContactusForm;