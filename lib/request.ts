
export const getApiResponse=async(sub_url:string)=>{
try{
    const url = `${process.env.NEXT_PUBLIC_API_URL}${sub_url}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
      }
    };
    const res=await fetch(url, options)
    const data= res.ok? await res.json(): Promise.reject(res);
    return data;  
}catch(e){
    console.log(e);
    return Promise.reject(e)
}
}