window.addEventListener("load", function() {
    loadXMLFile();
});
//navigaatio
function myFunction(){
	document.getElementById("A").classList.toggle("show")
}
window.onclick=function(event){
	if (!event.target.matches('.navigaatio')){
		var dropdowns = document.getElementsByClassName("valikko");
		var i;
		for (i=0; i< dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')){
				openDropdown.classList.remove('show');
			}
		}
	}
}
function loadXMLFile() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", "https://www.finnkino.fi/xml/Schedule/", true);
    xmlhttp.send();

    

    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        document.getElementById("Sisältö").innerHTML = xmlhttp.responseText;
        document.getElementById("Sisältö").innerHTML = txt;


        var xmlDoc = xmlhttp.responseXML;

        var ElokuvaNimi = xmlDoc.getElementsByTagName("Title");
        var Teatteri = xmlDoc.getElementsByTagName("Theatre");
        var ElokuvaKuva = "<img id='moviePic' src='" + xmlDoc.getElementsByTagName("EventSmallImagePortrait").nodeValue + "'></img>";
        }

        var txt = "<table>";

        for(i = 0; i < ElokuvaNimi.length; i++) {
            txt += "<tr id='rivi'><td id='Kuva' rowspan='2'><a href='" + ElokuvaKuva +"</a></td>" + 
            "<td id='Elokuva'>" + ElokuvaNimi[i].childNodes[0].nodeValue + "</td>"+
            "<td id='paikka'>"  + Teatteri[i].childNodes[0].nodeValue +  "</td></tr>";
            console.log(txt);
        }
        txt += "</table>";

        document.getElementById("taulukko").innerHTML = txt;
    }
}
