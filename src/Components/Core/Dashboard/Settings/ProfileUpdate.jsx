import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { userProfileUpdate } from "../../../../Services/operations/SettingsAPI"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const submitProfileForm = async (data) => {
        // console.log("Form Data - ", data)
        try {
        dispatch(userProfileUpdate(token, data))
        } catch (error) {
        console.log("ERROR MESSAGE - ", error.message)
        }
    }
    return (
        <>
        <form onSubmit={handleSubmit(submitProfileForm)}>
            {/* Profile Information */}
            <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 sm:p-8 sm:px-12 p-5">
                <h2 className="text-lg font-semibold text-richblack-5">
                    Profile Information
                </h2>
                <div className="flex flex-col gap-5 lg:flex-row">
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="firstName" className="lable-style">
                            First Name
                        </label>

                        <div className="form-style">{user?.firstName}</div>
                    
                    </div>
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <div htmlFor="lastName" className="lable-style">
                            Last Name
                        </div>
                        <div className="form-style">{user?.lastName}</div>
                    </div>
                </div>

                <div className="flex flex-col gap-5 lg:flex-row">
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="dateOfBirth" className="lable-style">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            name="dob"
                            id="dob"
                            className="form-style"
                            {...register("dob", {
                            required: {
                                value: true,
                                message: "Please enter your Date of Birth.",
                            },
                            max: {
                                value: new Date().toISOString().split("T")[0],
                                message: "Date of Birth cannot be in the future.",
                            },
                            })}
                            defaultValue={user?.additionalDetails?.dob}
                        />
                        {errors.dob && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            {errors.dob.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="gender" className="lable-style">
                            Gender
                        </label>
                        <select
                            type="text"
                            name="gender"
                            id="gender"
                            className="form-style"
                            {...register("gender", { required: true })}
                            defaultValue={user?.additionalDetails?.gender}
                        >
                            {genders.map((ele, i) => {
                            return (
                                <option key={i} value={ele}>
                                {ele}
                                </option>
                            )
                            })}
                        </select>
                    
                    </div>
                </div>

                <div className="flex flex-col gap-5 lg:flex-row">
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="contactNumber" className="lable-style">
                            Contact Number
                        </label>
                        <input
                            type="tel"
                            name="contactNumber"
                            id="contactNumber"
                            placeholder="Enter Contact Number"
                            className="form-style"
                            {...register("contactNumber", {
                            required: {
                                value: true,
                                message: "Please enter your Contact Number.",
                            },
                            maxLength: { value: 12, message: "Invalid Contact Number" },
                            minLength: { value: 10, message: "Invalid Contact Number" },
                            })}
                            defaultValue={user?.additionalDetails?.contactNumber}
                        />
                        {errors.contactNumber && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            {errors.contactNumber.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="about" className="lable-style">
                            About
                        </label>
                        <input
                            type="text"
                            name="about"
                            id="about"
                            placeholder="Enter Bio Details"
                            className="form-style"
                            {...register("about", { required: true })}
                            defaultValue={user?.additionalDetails?.about}
                        />
                        {errors.about && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your About.
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-2">
                <button
                    onClick={() => {
                    navigate("/dashboard/my-profile")
                    }}
                    className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                >
                    Cancel
                </button>
            
                <button type="submit" className="cursor-pointer rounded-md bg-yellow-50 py-2 px-5 font-semibold">
                    Submit
                </button>

            </div>
        </form>
        </>
    )
    }