$(document).ready(function() {

    var params = getSearchParameters();
    document.getElementById("titolo").innerHTML = decodeURI(params.titolo);
    document.getElementById("codiceText").value = params.codice;
    document.getElementById("titoloText").value = decodeURI(params.titolo);
    document.getElementById("descrizioneText").innerHTML = decodeURI(params.descrizione);
    document.getElementById("cfuText").value = params.cfu;
    document.getElementById("codice_orarioText").value = params.codice_orario;
    document.getElementById("programmaText").innerHTML = decodeURI(params.programma);
});

function getSearchParameters() {
    var prmstr = window.location.search.substr(1);
    return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
}

function transformToAssocArray( prmstr ) {
  var params = {};
  var prmarr = prmstr.split("&");
  for ( var i = 0; i < prmarr.length; i++) {
      var tmparr = prmarr[i].split("=");
      params[tmparr[0]] = tmparr[1].replace(/\+/gi, " ");
  }
  return params;
}