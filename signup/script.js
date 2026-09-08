
// =================SIGNUP FORM=================


const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        // Prevent page from refreshing
        event.preventDefault();

        // Get values from inputs
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        // Error elements
        const usernameError = document.getElementById("usernameError");
        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");

        // Clear old errors
        usernameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";

        let valid = true;


        
        // USERNAME VALIDATION
        

        if (username.length < 3) {
            usernameError.textContent =
                "Username must be at least 3 characters.";

            valid = false;
        }


       
        // EMAIL VALIDATION
        

        if (!email.includes("@")) {
            emailError.textContent =
                "Please enter a valid email.";

            valid = false;
        }


        
        // PASSWORD VALIDATION
        

        if (password.length < 6) {
            passwordError.textContent =
                "Password must be at least 6 characters.";

            valid = false;
        }



        // IF EVERYTHING IS VALID


        if (valid) {

            // Get existing users
            let users = JSON.parse(localStorage.getItem("users")) || [];

            // Create new user
            const newUser = {
                username: username,
                email: email,
                password: password
            };

            // Add user to array
            users.push(newUser);

            // Save updated array
            localStorage.setItem("users", JSON.stringify(users));

            alert("Signup successful!");

            // Go to dashboard
            window.location.href = "dashboard.html";
        }

    });
}




// DASHBOARD

const userTableBody = document.getElementById("userTableBody");

if (userTableBody) {
    displayUsers();
}


function displayUsers() {

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Clear table
    userTableBody.innerHTML = "";


    // Loop through users
    users.forEach(function(user, index) {

        // Create a new row
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>
                <button onclick="deleteUser(${index})">
                    Delete
                </button>
            </td>
        `;

        // Add row to table
        userTableBody.appendChild(row);
    });
}




// DELETE USER


function deleteUser(index) {

    // Get users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Remove selected user
    users.splice(index, 1);

    // Save updated users
    localStorage.setItem("users", JSON.stringify(users));

    // Display table again
    displayUsers();
}