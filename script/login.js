document.getElementById("login-btn").addEventListener("click", function(){
    console.log("Login button clicked");
    const usernameInput = document.getElementById("username-input").value;
    console.log(usernameInput);

    const passwordInput = document.getElementById("password-input").value;
    console.log(passwordInput);

    //match name and pin
    if(usernameInput === "admin" && passwordInput ==="admin123"){
        console.log("Credentials match & Login Successfully.")
        alert("User Login successfully");
        window.location.href = "./home.html"
    }
    else{
        alert("Invalid Credentials, Dial again.")
    }
})
