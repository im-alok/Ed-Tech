function HighLightText(props){
    return(
        <div className="font-bold inline">
            <span className="bg-gradient-to-r from-[#0052D4] via-[#65C7F7] to-[#9CECFB] text-transparent bg-clip-text">{props.text}</span>
        </div>
    )
}

export default HighLightText;