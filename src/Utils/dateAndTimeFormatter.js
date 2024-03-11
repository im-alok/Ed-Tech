export const dateFormatter =(date)=>{
    return new Date(date).toLocaleDateString('en-US',{
        month:'long',
        day:'numeric',
        year:'numeric',
    })
}

export const timeFormatter = (time)=>{
    return new Date(time).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
}