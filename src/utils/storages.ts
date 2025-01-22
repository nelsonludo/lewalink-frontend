import Cookies from 'js-cookie';

//i'm not sure this is what is supposed to happen here but here's a prototype function
export const storeTokens = (refresh: string, access: string) => {
    const refreshArray = refresh.split(".");
    const accessArray = access.split(".");
  
    //temporary names for the localstorage
    localStorage.setItem('refresh1', refreshArray[0]);
    localStorage.setItem('access1', accessArray[0]);
  
  
    // Store the parts of the tokens securely in cookies
    // We can also encrypt the values, but for simplicity, we'll just store them raw here.
    // Add the secure flags for production environments
    
    Cookies.set('refresh2', refreshArray[1], { secure: true, sameSite: 'Strict' });
    Cookies.set('refresh3', refreshArray[2], { secure: true, sameSite: 'Strict' });
  
    
    Cookies.set('access2', accessArray[1], { secure: true, sameSite: 'Strict' });
    Cookies.set('access3', accessArray[2], { secure: true, sameSite: 'Strict' });
  
  }

  export const getStoredTokens = (): {} => {
    // Retrieve parts of the refresh token
    const refresh1 = localStorage.getItem("refresh1");
    const refresh2 = Cookies.get("refresh2");
    const refresh3 = Cookies.get("refresh3");
  
    // Reconstruct the refresh token if all parts are available
    const refresh =
      refresh1 && refresh2 && refresh3 ? {refresh1, refresh2, refresh3} : null;
  
    // Retrieve parts of the access token
    const access1 = localStorage.getItem("access1");
    const access2 = Cookies.get("access2");
    const access3 = Cookies.get("access3");
  
    // Reconstruct the access token if all parts are available
    const access =
      access1 && access2 && access3 ? {access1, access2, access3} : null;
  
    // Return both tokens
    console.log(`refresh: ${refresh} access: ${access}`)
    return { refresh, access };
  };
  
  export const deleteTokens = (): void => {
    // Remove token parts from localStorage
    localStorage.removeItem("refresh1");
    localStorage.removeItem("access1");
  
    // Remove token parts from Cookies
    Cookies.remove("refresh2", { secure: true, sameSite: "Strict" });
    Cookies.remove("refresh3", { secure: true, sameSite: "Strict" });
    Cookies.remove("access2", { secure: true, sameSite: "Strict" });
    Cookies.remove("access3", { secure: true, sameSite: "Strict" });
  
    console.log("Tokens deleted successfully.");
  };