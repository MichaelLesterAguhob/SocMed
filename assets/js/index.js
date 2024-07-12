
    function goToSignUp()
    {
            let logIn = document.getElementById("LoginForm");
            logIn.style.display = 'none';
            
            let signUp = document.getElementById("SignupForm");
            signUp.style.display = 'block';
            clearLoginForm();
    };

    function goToLogIn()
    {
            let signUp = document.getElementById("SignupForm");
            signUp.style.display = 'none';

            let logIn = document.getElementById("LoginForm");
            logIn.style.display = "block"
            clearSinupForm();
    };

    // HIDE AND SHOW PASSWORD INPUT
    let isPassShowed = false;
    function showHideSignupPass()
    {
        if(!isPassShowed)
        {
            let input_element = document.querySelectorAll("#SignupForm .inputPass");
            input_element.forEach(function(input)
            {
                input.type = 'text';
                isPassShowed = true;    
            });
        }
        else
        {
            let input_element = document.querySelectorAll("#SignupForm .inputPass");
            input_element.forEach(function(input)
            {
                input.type = 'password';
                isPassShowed = false;
            });
        }
    }

    // CLEAR INPUTS ELEMENT VALUES
    function clearSinupForm()
    {
        let input_element = document.querySelectorAll("#SignUpForm input");
        input_element.forEach(function(input){
            input.value = "";
        });
    };

    function clearLoginForm()
    {
        let input_element = document.querySelectorAll("#LoginForm input");
        input_element.forEach(function(input)
        {
            input.value = "";
        });
    };
