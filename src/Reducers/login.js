// Define an initial state value for the app
const initialState = {
    user: null,
    token: "",
  };
  
  // Create a "reducer" function that determines what the new state
  // should be when something happens in the app
  const reducerLog = (state = initialState, action) => {
    const { type, payload } = action;
    // Reducers usually look at the type of action that happened
    // to decide how to update the state
    switch (type) {
  
      case "LOGIN":
        const { user, token } = payload;
        localStorage.setItem("token", token);
        localStorage.setItem("user",JSON.stringify(user));
        return { user, token };
      case "LOGOUT":
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return { payload };

      default:
        const storageToken = localStorage.getItem("token")
        const storageUser = localStorage.getItem("user")
        const userStorage= JSON.parse(storageUser)
        if(storageToken && storageUser) return {token:storageToken,user: userStorage}
        // If the reducer doesn't care about this action type,
        // return the existing state unchanged
        return state;
    }
  
  };
  
  export default reducerLog;
  
  export const login1 = (data) => {
    return {
      type: "LOGIN",
      payload: data,
    };
  };
  
  export const logOut = (data) => {
    return {
      type: "LOGOUT",
      payload: data,
    };
  };