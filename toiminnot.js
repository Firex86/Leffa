window.addEventListener("load", function() {
    loadXMLFile();
});

function loadXMLFile() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", "https://www.finnkino.fi/xml/Schedule/", true);
    xmlhttp.send();

    if(xmlhttp.readyState == 1) {
        document.getElementById("Sisältö").innerHTML = "Lataus käynnissä...";
    }

    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        document.getElementById("Sisältö").innerHTML = xmlhttp.responseText;
        document.getElementById("Sisältö").innerHTML = txt;


        var xmlDoc = xmlhttp.responseXML;

        var ElokuvaNimi = xmlDoc.getElementsByTagName("Title");
        var Teatteri = xmlDoc.getElementsByTagName("Theatre");
        }

        var txt = "<table>";

        for(i = 0; i < ElokuvaNimi.length; i++) {
            txt += "<tr><td>" + ElokuvaNimi[i].childNodes[0].nodeValue + "</td>"+
                    "<td>"    + Teatteri[i].childNodes[0].nodeValue +  "</td></tr>";
            console.log(txt);
        }
        txt += "</table>";

        document.getElementById("taulukko").innerHTML = txt;
       
    }
}
