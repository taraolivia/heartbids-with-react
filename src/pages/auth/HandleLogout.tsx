const HandleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  
  export default HandleLogout;
  