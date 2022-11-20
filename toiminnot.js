var TeatteriID;

//Päivä konstruktori
var date = new Date();
var day = date.getDate();
if (day < 10) {
   day = "0" + day;
}
var month = (date.getMonth() + 1);
if (month < 10) {
   month = "0" + month;
}
var year = date.getFullYear();
date = day + "." + month + "." + year;


//Kayttajan valinnan perusteella valitaan elokuva teatteri tai alue. Kutsutaan lataaXML toiminto.
function TeatteriValinta() {
    document.getElementById("Elokuvasalit").select();
    switch (document.getElementById("Elokuvasalit").value) {
       case "Pääkaupunkiseutu":
        TeatteriID = 1014;
          break;
       case "Espoo":
        TeatteriID = 1012;
          break;
       case "Espoo: OMENA":
        TeatteriID = 1039;
          break;
       case "Espoo: SELLO":
        TeatteriID = 1038;
          break;
       case "Helsinki":
        TeatteriID = 1002;
          break;
       case "Helsinki: ITIS":
        TeatteriID = 1045;
          break;
       case "Helsinki: KINOPALATSI":
        TeatteriID = 1031;
          break; 
       case "Helsinki: MAXIM":
        TeatteriID = 1032;
          break;
       case "Helsinki: TENNISPALATSI":
        TeatteriID = 1033;
          break;
       case "Vantaa: FLAMINGO":
        TeatteriID = 1013;
          break;
       default:
        TeatteriID = null;
         document.getElementById("Elokuvasalit").value = "";
    }
    lataaXML();
 }

 function lataaXML() {
    if (TeatteriID != undefined){
       var osoite = "https://www.finnkino.fi/xml/Schedule/?area=" + TeatteriID + "&dt=" + date;
       var xhttp = new XMLHttpRequest();
       xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
          parseXML(this);
          }
       }
       xhttp.open("GET", osoite, true);
       xhttp.send();
    }
 }
 
 function parseXML(xml) {
    var i;
    var xmlData = xml.responseXML;
    var table = "<table>";
    var Elokuva = xmlData.getElementsByTagName("Show");
    
    for (i=0; i < Elokuva.length; i++) {
          
          var TaulukkoKuva;
             if (Elokuva[i].getElementsByTagName("EventSmallImagePortrait").length == 0) {
                TaulukkoKuva = "<br>Image<br>not<br>found<br><br>";
             } else {
                TaulukkoKuva = "<img id='ElokuvaKuva' src='" + Elokuva[i].getElementsByTagName("EventSmallImagePortrait")[0].childNodes[0].nodeValue + "'></img>";
             }
          
          table += "<tr><td id='kuva' rowspan='2'>" + TaulukkoKuva + "</td>" + 
          "<td id='paiva'>"+ date +"</td>"+
          "<td id='otsikko'>"+ Elokuva[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue +"</a></td>"+ 
          "<td id='kesto' rowspan='2'> Kesto:<br>"+ AjanKorjaus(Elokuva[i].getElementsByTagName("LengthInMinutes")[0].childNodes[0].nodeValue) +"</td></tr>"+
          "<tr><td id='alkuaika'>" + (Elokuva[i].getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue).slice(11,16) +"</td>" +
          "<td id='sali'>Finnkino "+ Elokuva[i].getElementsByTagName("TheatreAndAuditorium")[0].childNodes[0].nodeValue + "</td></tr>";
       }
       table += "</table>";   
       document.getElementById("taulukko").innerHTML = table;
       document.getElementById("Elokuvasalit").value = "";
    }


 
function AjanKorjaus(duration) {
    var minuutit = duration % 60;
    var tunnit = (duration - minuutit) / 60;
    return tunnit + " h " + minuutit + " min";
 }
