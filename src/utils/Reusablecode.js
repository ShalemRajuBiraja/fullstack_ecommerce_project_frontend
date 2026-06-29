
export const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email); //test is a method of regex which returns true if the email matches the pattern, otherwise false.
}

export const checkUserLoggedInStatus = () => {
    try{
        const token  = localStorage.getItem("token");
        return Boolean(token); // returns true if token exists, false otherwise

    } catch(error){
        console.error(error);
        return false;
    }

}