function SquareBox({active,heading,children}){
    return(
        <div className={`${active ? "bg-richblack-700":"bg-richblack-800"} flex flex-col gap-8 h-64 w-[280px] p-8`}>
            <h1 className="text-richblack-5 font-semibold text-lg font-inter ">{heading}</h1>
            <p className="font-inter text-sm text-richblack-100">{children}</p>
        </div>
    )
}

export default SquareBox;