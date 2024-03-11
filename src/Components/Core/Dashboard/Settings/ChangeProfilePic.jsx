import { useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { updateDisplayPicture } from "../../../../Services/operations/SettingsAPI"


export default function ChangeProfilePicture() {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)

    

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        // console.log(file)
        if (file) {
        setImageFile(file)
        previewFile(file)
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            // console.log(reader.result);
        setPreviewSource(reader.result)
        }
    }

    const handleFileUpload = (e) => {
        e.preventDefault();
        try {
        setLoading(true)
        let formData = new FormData();
        formData.append("imageFile", imageFile)

        // for(var pair of formData.entries()) {
        //     console.log(pair);

        // }
        dispatch(updateDisplayPicture(token, formData)).then(() => {
            
            setLoading(false);
        })
        } catch (error) {
            setLoading(false);
            console.log("ERROR MESSAGE - ", error.message);
        
        }
    }

    // useEffect(() => {
    //     if (imageFile) {
    //     previewFile(imageFile)
    //     }
    // }, [imageFile])
    return (
        <>
        <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-5 sm:p-8 sm:px-12 text-richblack-5">
            <div className="flex items-center gap-x-4">
                <img
                    src={previewSource || user?.image}
                    alt={`profile-${user?.firstName}`}
                    className="aspect-square w-[70px] sm:w-[78px] rounded-full object-cover"
                />
                <div className="space-y-2">
                    <p className="sm:text-base text-sm font-semibold">Change Profile Picture</p>
                    <div className="flex flex-row gap-3">
                        <input
                            type="file"
                            name="imageUpload"
                            id="imageUpload"
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/png, image/gif, image/jpeg"
                        />
                        <label htmlFor="imageUpload"
                            aria-disabled={loading}
                            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50 "
                        >
                            Select
                        </label>
                        <button className={`px-2 py-1  rounded-md ${imageFile?"pointer-events-auto bg-yellow-50 text-richblack-900":"hidden"}`}
                            onClick={handleFileUpload}>

                            <div className="flex flex-row gap-2 items-center text-bold"
                            >
                                {loading ? "Uploading..." : "Upload"}
                            
                                {!loading && (
                                <FiUpload className="text-lg text-richblack-900" />
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}