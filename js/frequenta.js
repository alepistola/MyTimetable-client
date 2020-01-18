$(document).ready(function() {

    var params = getSearchParameters();
    document.getElementById("titolo").innerHTML = decodeURI(params.id);
    document.getElementById("idText").value = params.id;
    document.getElementById("usernameText").value = params.username;
    document.getElementById("aulaText").value = decodeURI(params.aula);
    document.getElementById("codice_corsoText").innerHTML = decodeURI(params.descrizione);
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