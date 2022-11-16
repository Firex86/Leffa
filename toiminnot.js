window.addEventListener("load", function() {
    loadXMLFile();
});

function loadXMLFile() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", "https://www.finnkino.fi/xml/Schedule/", true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        document.getElementById("Sisältö").innerHTML = xmlhttp.responseText;
        }
       
    }
}
