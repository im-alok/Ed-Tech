import { useState } from "react";
import { VscCloudUpload } from "react-icons/vsc";
function Thumbnail({setThumbnail}){
    const [preview, setPreview] = useState(null);
    const [fileChange,setImageChange] = useState(false);

    function changeHandler(e){
        if(e.target.files[0]){
            setThumbnail(e.target.files[0]);
            previewFile(e.target.files[0]);
            setImageChange(true);
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            // console.log(reader.result);
        setPreview(reader.result)
        }
    }


    return (
        <div className="relative z-0 form-style">
            {
                fileChange && (
                    <div className="flex justify-center">
                        <img 
                        src={preview}
                        className="rounded-lg aspect-video"
                        alt="Course thumbnail"
                        loading="lazy"
                        width={450}
                        />
                    </div>
                )
            }
            <div className="flex flex-col gap-2 items-center">
                <div className="w-fit text-3xl text-yellow-50 bg-yellow-800 rounded-full p-3">
                    <label htmlFor="uploadImage" className="cursor-pointer">
                        <VscCloudUpload />
                    </label>
                </div>

                <label htmlFor="uploadImage">
                    <p className="text-yellow-50 text-[14px] cursor-pointer">Browse your image</p>
                </label>
                <input
                onChange={changeHandler}
                id="uploadImage"
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                className="hidden"

                />

                <div>
                    <ul className="text-richblack-400 list-disc flex flex-row gap-16 text-xs ">
                        <li>Aspect ratio 16:9</li>
                        <li>Recommended Size 1024 * 578</li>
                    </ul>
                </div>
            </div>
        </div>
    )

}

export default Thumbnail;