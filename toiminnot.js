function loadXMLFile() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", "https://www.finnkino.fi/xml/Schedule/", true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
        
        document.getElementById("Sisältö").innerHTML = xmlhttp.responseText;
       
    }
}
