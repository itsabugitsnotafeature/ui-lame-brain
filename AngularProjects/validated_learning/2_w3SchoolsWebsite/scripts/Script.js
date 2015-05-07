/**
 * Created by ununoctium on 3/8/15.
 */

document.getElementById("foot01").innerHTML =
    "<p>&copy; " + new Date().getFullYear()
    + "YouDizzle da Developer </p>" ;

if (document.getElementById("nav01"))
    document.getElementById("nav01").innerHTML=
    "<ul id='menu'>" +
    "<li><a href='./Index.html'>Home</a></li> " +
    "<li><a href='./pages/Customers.html'>Data</a></li> " +
    "<li><a href='./pages/About.html'>About</a></li> " +
        "</ul>";

if (document.getElementById("nav02"))
    document.getElementById("nav02").innerHTML=
    "<ul id='menu'>" +
    "<li><a href='../Index.html'>Home</a></li> " +
    "<li><a href='./Customers.html'>Data</a></li> " +
    "<li><a href='./About.html'>About</a></li> " +
    "</ul>";

if (document.getElementById("nav03"))
    document.getElementById("nav03").innerHTML=
        "<ul id='menu'>" +
        "<li><a href='../Index.html'>Home</a></li> " +
        "<li><a href='./Customers.html'>Data</a></li> " +
        "<li><a href='./About.html'>About</a></li> " +
        "</ul>";
