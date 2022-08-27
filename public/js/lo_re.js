var x = document.getElementById("login")
        var y = document.getElementById("register")
        var z = document.getElementById("btn")

        function register() {
            x.style.left = "-400px"
            y.style.left = "50px"
            z.style.left = "110px"
        }

        function login() {
            x.style.left = "50px"
            y.style.left = "450px"
            z.style.left = "0"
        }
        document.getElementById("submit").disabled=true;
        document.getElementById("submit-reg").disabled=true;

        function daoNutDN_1() {
        var u = document.getElementById("user").value;
        var p = document.getElementById("pass").value;
        if ( (u.length>0 && p.length>0)) {
        document.getElementById("submit").disabled=false;

        } else {
        document.getElementById("submit").disabled=true;
        }
    }

        function daoNutDN_2(){
            
        var u = document.getElementById("user1").value;
        var p = document.getElementById("pass1").value;
        var k = document.getElementById("mail1").value;
        if  (u.length>0 && p.length>0 && k.length > 0) {
            document.getElementById("submit-reg").disabled=false;

        } else {
            document.getElementById("submit-reg").disabled=true;
        }
    }