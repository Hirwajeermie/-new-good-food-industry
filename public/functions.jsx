export async function f(url,options){
    try {
      Object.assign(options.headers,{'authorization': getdata('token') ? 'Bearer '+getdata('token') : null})
<<<<<<< HEAD
      let z = await fetch(process.env.REACT_APP_API_URL +url,options);
=======
      let z = await fetch('https://cfp.onrender.com/' +url,options);
>>>>>>> ff871c786cc1f916e8c0755f6061be339b3e5ed7
      let y = await z.json();
      return y;
    } catch (error) {
        console.log(error)
      return {success:false, message:'an error occured while connecting to the server', metadata: {}}
    }
}
export const pS = {
    mode: 'cors',
    method: "POST",
    credentials: 'include',
    body: null,
    headers: {
      "content-type": "application/json",
      'accept': '*/*',


    },
}
export const gS =  {
    mode: 'cors',
    method: "GET",
    credentials: 'include',
    headers: {
      "content-type": "application/json",
      'accept': '*/*',

    },
}
export function geturl() {
  let i = new URL(window.location.href)
  return i.origin+'/'
}
export function getdata(item){
  let v
  try {
    v = JSON.parse(localStorage.getItem(item));
    return v
  } catch (error) {
    v = localStorage.getItem(item);
    if (v) {
      return v
    }
    return null 
  }
}
export function setData(name,data) {
  let v
  try {
      if (typeof data == 'object') {
          v = localStorage.setItem(name,JSON.stringify(item));
      }else{
          v = localStorage.setItem(name,data)
      }
    return v
  } catch (error) {
    v = localStorage.getItem(item);
    if (v) {
      return v
    }
    return null 
  }
}
export function adcm(n) {
  try {
    if (!Number(n)) {
      return n
    }
   return n.toLocaleString('en-US')
    
  } catch (error) {
    return n
  }
}
