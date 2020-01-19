
$(document).ready(function() {

    var params = getSearchParameters();

    if(params.typeOp == "Salva")
    {
        console.log(params);
        $.ajax({
            type: "PUT",
            contentType: 'application/json',
            headers: {
                "Authorization": "Basic " + btoa("alepistola" + ":" + "password")
            },
            data: JSON.stringify(
                { 
                    "id": params.id,
                    "username" : params.username,
                    "codice_corso" : params.codice_corso,
                    "aula": params.aula,
                }
            ),
            url: 'https://wobbly-earwig.glitch.me/api/frequentare/' + params.username,
            success: function (obj, textstatus) {
                apriPannello("Modifica avvenuta con successo", "Modificata correttamente l'associazione con id <b>" + params.id + "</b>");
                getData();
            },
            error: function () {
                apriPannello("Si è verificato un errore", "Si è verificato un errore durante la modifica dell'associazione <b>" + params.id + "</b>\nRiprovare ad eseguire l'operazione.");
                getData();
            }
        });
    }
    else if(params.typeOp == "Inserisci")
    {
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            headers: {
                "Authorization": "Basic " + btoa("alepistola" + ":" + "password")
            },
            data: JSON.stringify(
                { 
                    "id" : params.id,
                    "codice_corso" : params.codice_corso,
                    "aula": params.aula,
                }
            ),
            url: 'https://wobbly-earwig.glitch.me/api/frequentare/alepistola',
            success: function (obj, textstatus) {
                apriPannello("Inserimento avvenuto con successo", "Inserita correttamente l'associazione <b>" + params.id + "</b>");
                getData();
            },
            error: function () {
                apriPannello("Errore", "Si è verificato un errore durante l'inserimento dell'associazione <b>" + params.id + "</b>\nRiprovare ad eseguire l'operazione.");
                getData();
            }
        });
    }
    else
    {
        getData();
    }

    
});

function getData()
{
    $.ajax({
        type: "GET",
        url: 'https://wobbly-earwig.glitch.me/api/frequentare/alepistola',
        dataType: 'json',
        headers: {
            "Authorization": "Basic " + btoa("alepistola" + ":" + "password")
        },
        success: function (obj, textstatus) {
                var dataTable =  $('#dataTable').DataTable({
                    data: obj,
                    dataSrc: "",
                    select: true,
                    order: [[ 0, "asc" ]],
                    dom: "lBfrtip",
                    buttons: [
                      {
                          text: 'Modifica',
                          className: 'btn btn-secondary btn-icon-split',
                          action: function () {
                              var rowData = dataTable.row('.selected').data();
                              if(rowData !== undefined)
                              {
                                  $.redirect('frequenta.html', rowData, "GET");
                              }
                              
                          }
                      },
                      {
                          text: 'Elimina',
                          className: 'btn btn-primary btn-icon-split',
                          action: function () {
                              var rowData = dataTable.row('.selected').data();
                              let vurl = "https://wobbly-earwig.glitch.me/api/frequentare/" + rowData.username
                              if(rowData !== undefined)
                              {
                                  $.ajax({
                                      type: "DELETE",
                                      headers: {
                                        "Authorization": "Basic " + btoa("alepistola" + ":" + "password")
                                      },
                                      url: vurl,
                                      success: function(result){
                                          dataTable.row('.selected').remove().draw( false );
                                          apriPannello("Eliminazione avvenuta con successo", "Eliminata correttamente l'associazione: <b>" + rowData.id + "</b>");
                                      },
                                      error: function(){
                                          apriPannello("Errore", "Si è verificato un errore durante la rimozione dell'associazione: "+ rowData.id);
                                      } 
                                  });
                              }
                          }
                      }
                  ],
                  columns: [
                      { data: 'id'}, {data: 'username'}, {data: 'codice_corso'}, {data: 'aula'},
                  ]
                });
        },
        error: function (obj, textstatus) {
            alert(obj.msg);
        }
      });
}

function apriPannello(data1, data)
{
  let msg = data;
  let titolo = data1;

  modal = document.getElementById("pannello");
  title = document.getElementById("title");
  modalText = document.getElementById("modal-text");
  modalText.innerHTML = msg;
  title.innerHTML = titolo;
  closeSpan = document.getElementById("close");

  modal.style.display = "block";
  closeSpan.onclick = function() {
      modal.style.display = "none";
  }

  
  window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
  }
}


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

