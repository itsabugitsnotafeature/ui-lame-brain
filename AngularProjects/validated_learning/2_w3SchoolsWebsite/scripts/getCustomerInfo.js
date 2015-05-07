var xmlhttp = new XMLHttpRequest();

// Using php server running MYSQL

//var url = "http://www.w3schools.com/website/Customers_MYSQL.php";
var url = "https://api.myjson.com/bins/1vvi7";
//var url = "https://goo.gl/O27AgM";
//var url = "https://www.dropbox.com/s/lq0vijvx8ptjkvl/Customers_JSON.json?dl=0";


xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        myFunction(xmlhttp.responseText);
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(response) {
    var arr = JSON.parse(response);
    var i;
    var out = "<table><tr><th>Name</th><th>City</th><th>Country</th></tr>";
    for(i = 0; i < arr.length; i++) {
        out += "<tr><td>" +
        arr[i].Name +
        "</td><td>" +
        arr[i].City +
        "</td><td>" +
        arr[i].Country +
        "</td></tr>";
    }
    out += "</table>"
    document.getElementById("id01").innerHTML = out;
}











// Using JSON blob

//var url = "http://www.w3schools.com/website/Customers_JSON.php";
//xmlhttp.onreadystatechange = function() {
//    if (xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
//        myFunction(xmlhttp.responseText)
//    }
//}
//xmlhttp.open("GET",url,true);
//xmlhttp.send();
//function myFunction(response) {
//    var arr = JSON.parse(response);
//    var i;
//    var out = "<table><tr><th>Name</th><th>City</th><th>Country</th></tr>"
//
//    for (i=0;i< arr.length ; i++) {
//        out +="<tr><td>" +
//            arr[i].Name +
//            "</td><td>" +
//            arr[i].City +
//            "</td><td>" +
//            arr[i].Country +
//            "</td><td>";
//    }
//
//    out += "</table>";
//    document.getElementById("id01").innerHTML = out;
//}


// Using AJAX Call

//var url = "http://www.w3schools.com/website/Customers_HTML.php";
//xmlhttp.onreadystatechange = function() {
//    if (xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
//        document.getElementById("id01").innerHTML=
//            xmlhttp.responseText;
//    }
//}
//
//xmlhttp.open("GET",url,true);
//xmlhttp.send();
