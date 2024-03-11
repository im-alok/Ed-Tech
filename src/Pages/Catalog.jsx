import { useParams } from "react-router-dom";
import Footer from "../Components/common/Footer";
import { useEffect, useState } from "react";
import { apiConnector } from "../Services/apiConnector";
import { tags } from "../Services/apis";
import { getCatalogPageData } from "../Services/operations/pageAndConponentData";
import CourseSlider from "../Components/Core/Catalog/CourseSlider";



function Catalog(){

    const {catalogName} = useParams();
    const [catalogPageData,setCatalogPageData] = useState(null);
    const [categoryId,setCategoryId] = useState(null);
    const [active, setActive] = useState(true);

    //fetch all categories
    useEffect(()=>{
        async function getCategory(){
            const response= await apiConnector('GET',tags.TAG_API);

            const categoryId = response?.data?.tags?.filter((tag)=>tag.tagName.split(' ').join('-').toLowerCase() === catalogName)[0]?._id;
            // console.log(categoryId);
            setCategoryId(categoryId);
        }
        getCategory();

    },[catalogName])

    useEffect(()=>{
        async function getCategoryDetails(){
            try {
                const res = await getCatalogPageData(categoryId);
                setCatalogPageData(res);
                // console.log(catalogPageData);

            } catch (error) {
                console.log(error);
            }
        }
        getCategoryDetails();
    },[categoryId]);



    return(
        <div className="text-white ">
            <div className="bg-richblack-800">
                <div className="w-10/12 mx-auto justify-center flex flex-col gap-4 min-h-[250px]">
                    <p className="text-xs text-richblack-300">
                        {`Home / Catalog / `}
                        <span className="text-yellow-50 capitalize">{catalogPageData?.selectedTags?.tagName.toLowerCase()}
                        </span>
                    </p>

                    <div className="flex flex-col gap-2">
                        <p className="capitalize text-4xl font-bold ">{catalogPageData?.selectedTags?.tagName.toLowerCase()}</p>
                        <p className="text-sm text-richblack-300">{catalogPageData?.selectedTags?.description}</p>
                    </div>
                </div>
            </div>


            <div className="mt-10 w-10/12 mx-auto">
                
                <div className="flex flex-col gap-2">
                    {/* Section1 */}
                    <div className="text-4xl font-bold ">Courses to get you started</div>

                    <div className="mt-5 flex flex-col gap-3">
                        <div className="flex gap-x-5">
                            <p className={`${active
                            ?"text-yellow-50 border-b-2 border-yellow-50"
                            :"text-richblack-100"} 
                            cursor-pointer text-base font-medium `}
                            onClick={()=>setActive(true)}
                            >
                                Most Popular
                            </p>
                            <p className={`${!active
                            ?"text-yellow-50 border-b-2 border-yellow-50"
                            :"text-richblack-100"} 
                            cursor-pointer text-base font-medium `}
                            onClick={()=>setActive(false)}
                            >
                                New
                            </p>
                        </div>
                        <div className="mt-3">
                            <CourseSlider 
                            Courses ={catalogPageData?.selectedTags?.courses}
                            tagName={catalogPageData?.selectedTags?.tagName}
                            />
                        </div>
                    </div>

                    {/* Section2 */}
                    <div className="flex flex-col gap-3">
                        <p className="text-4xl font-bold mt-7">Top Courses for you</p>
                        <div>
                            {
                                catalogPageData?.differentTags?.map((tag,index)=>(
                                    
                                    tag?.courses?.length?
                                    (
                                        <div key={index}>
                                            <p className="text-xl font-bold mt-5"> {tag?.tagName}</p>
                                            <CourseSlider 
                                            Courses={tag?.courses}/>  
                                        </div>
                                    )
                                    :("")
                                ))
                            }
                        </div>
                    </div>

                    {/* Section3 */}
                    {/* <div>
                        <p>Frequently Bought Together</p>
                        <div className="py-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2">

                            </div>
                        </div>

                    </div> */}

                </div>

                
            </div>
            <Footer />  
        </div>
    )
}

export default Catalog;