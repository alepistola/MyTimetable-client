
$(document).ready(function() {

    var params = getSearchParameters();

    if(params.typeOp == "Salva")
    {
        $.ajax({
            type: "PUT",
            contentType: 'application/json',
            data: JSON.stringify(
                { 
                    "codice": params.codice,
                    "titolo" : params.titolo,
                    "descrizione" : params.descrizione,
                    "cfu": params.cfu,
                    "programma": params.programma,
                    "codice_orario": params.codice_orario
                }
            ),
            url: 'https://wobbly-earwig.glitch.me/api/corsi/' + params.codice,
            success: function (obj, textstatus) {
                apriPannello("Modifica avvenuta con successo", "Modificato correttamente il corso con codice " + params.codice);
                getData();
            },
            error: function () {
                alert("Si è verificato un errore durante la modifica del corso " + params.titolo + "\nRiprovare ad eseguire l'operazione.");
            }
        });
    }
    else if(params.typeOp == "Inserisci")
    {
        $.ajax({
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify(
                { 
                    "codice": params.codice,
                    "titolo" : params.titolo,
                    "descrizione" : params.descrizione,
                    "cfu": params.cfu,
                    "programma": params.programma,
                    "codice_orario": params.codice_orario
                }
            ),
            url: 'https://wobbly-earwig.glitch.me/api/corsi',
            success: function (obj, textstatus) {
                apriPannello("Inserimento avvenuto con successo", "Inserito correttamente il corso " + params.titolo);
                getData();
            },
            error: function () {
                alert("Si è verificato un errore durante l'inserimento del corso " + params.titolo + "\nRiprovare ad eseguire l'operazione.");
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
        url: 'https://wobbly-earwig.glitch.me/api/utenti',
        dataType: 'json',
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
                                  $.redirect('utente.html', rowData, "GET");
                              }
                              
                          }
                      },
                      {
                          text: 'Elimina',
                          className: 'btn btn-primary btn-icon-split',
                          action: function () {
                              var rowData = dataTable.row('.selected').data();
                              let vurl = "https://wobbly-earwig.glitch.me/api/utenti/" + rowData.username
                              if(rowData !== undefined)
                              {
                                  $.ajax({
                                      type: "DELETE",
                                      url: vurl,
                                      success: function(result){
                                          dataTable.row('.selected').remove().draw( false );
                                          apriPannello("Eliminazione avvenuta con successo", "Eliminato correttamente il corso: " + rowData.titolo);
                                      },
                                      error: function(){
                                          alert("Si è verificato un errore durante la rimozione del corso: "+ rowData.titolo);
                                      } 
                                  });
                              }
                          }
                      }
                  ],
                  columns: [
                      { data: 'username'}, {data: 'nome'}, {data: 'cognome'}, {data: 'password'}, {data:'corso_di_studio'},
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

