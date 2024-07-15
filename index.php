<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"> -->
    <title>SocMed</title>
    <link rel="stylesheet" href="../assets/css/bootstrap-5.3.3-dist/css/bootstrap.min.css">
</head>

<body style="height: 100vh; display:flex; align-items:center;">

    <!-- HEADER/ NAVIGATION BAR -->




    <!-- MAIN CONTENT -->

    <div style="margin: auto; border: 1px solid black; height:40%; width:40%; display:flex; align-items:center; flex-direction:column;">
        <h6>String input to Array TRY</h6>
        <input type="number" id="input_num" style="margin:auto; width:80%;">
        <button id="btn" style="margin: auto;">Solve</button>
        <p id="res">result</p>
    </div>

    <script>
        document.getElementById("btn").addEventListener("click", function() {
            let array_nums = [];
            let numbers_entered = document.getElementById("input_num").value;
            let cntr = numbers_entered.length;
            let i = 0;
            while(cntr != 0){
                array_nums.push(numbers_entered[i])
                i++;
                cntr--;
            };

            
       
            document.getElementById("res").innerHTML = "Input converted to array = " + array_nums;
            alert(i + cntr);
           

            // document.getElementById("res").innerHTML = array_nums;
        });
    </script>


    <!-- FOOTER -->




    <!-- JAVASCRIPT -->
    <!-- <script src="../assets/css/bootstrap-5.3.3-dist/js/bootstrap.min.js"> </script> -->
    <!-- <script src="assets/js/index.js"></script> -->
</body>

</html>