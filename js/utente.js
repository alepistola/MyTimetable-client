$(document).ready(function() {

    var params = getSearchParameters();
    document.getElementById("titolo").innerHTML = decodeURI(params.username);
    document.getElementById("usernameText").value = decodeURI(params.username);
    document.getElementById("nomeText").value = decodeURI(params.nome);
    document.getElementById("cognomeText").value = decodeURI(params.cognome);
    document.getElementById("passwordText").value = decodeURI(params.password);
    document.getElementById("corso_di_studioText").value = decodeURI(params.corso_di_studio);
    document.getElementById("vUsername").value = decodeURI(params.username);
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