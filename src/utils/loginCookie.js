export const setLoginCookieAdmin = (username,role,pic,langstats,teststats,user,moneystats,substats) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1); // Set expiration to one day from now
  
      const loginCookie = {
        username: username,
        expiration: expirationDate.getTime(), // Convert expiration date to milliseconds
        role:role,
        pic:pic,
        langstats:langstats,
        teststats:teststats,
        user:user,
        moneystats:moneystats,
        substats:substats
      };
      localStorage.setItem('loginCookie', JSON.stringify(loginCookie));
  };

export const setLoginCookieUser =(username,email,pic)=>{
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1); // Set expiration to one day from now

  const loginCookie = {
    username: username,
    expiration: expirationDate.getTime(), // Convert expiration date to milliseconds
    role:"user",
    pic:pic,
    email: email
  };
  localStorage.setItem('loginCookie', JSON.stringify(loginCookie));

}

export const isLoginCookieValid = () => {
    const loginCookie = JSON.parse(localStorage.getItem('loginCookie'));
  
    if (loginCookie && loginCookie.expiration > Date.now()) {
      // The login cookie is valid
      return true;
    }
  
    // The login cookie is expired or not set
    return false;
  };