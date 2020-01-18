
/* $(document).ready(function() {
  var dataTable = $('#dataTable').DataTable( {
      //"serverSide": true,
      "select": true,
      "order": [[ 0, "asc" ]],
      "dom": "lBfrti",
      "buttons": [
          {
              text: 'Modifica',
              className: 'btn btn-secondary btn-icon-split',
              action: function () {
                  var rowData = dataTable.row('.selected').data();
                  console.log(rowData);
                  if(rowData !== undefined)
                  {   
                      //$.redirect('cliente.php', {'id': rowData[0], 'email': rowData[1], 'permessi': rowData[3]}, "POST");
                  }
                  else
                  {
                      //apriPannelloErrore("Non è stato selezionato nessun record dalla tabella");
                  }
                  
              }
          },
          {
              text: 'Elimina',
              className: 'btn btn-primary btn-icon-split',
              action: function () {
                  console.log(dataTable.row('.selected').data());//.remove().draw( false );
                  var rowData = dataTable.row('.selected').data();
                  if(rowData !== undefined)
                  {
                      //$.get( "delete.php", "id=" + rowData[0])
                      //.done(function( data ) {
                      //    dataTable.row('.selected').remove().draw( false );
                          // se non funziona in caso forza un refresh della pagina
                      //    apriPannelloElimina(rowData[1]);
                      //})
                      //.fail(function( data ){
                      //    alert("Si è verificato un errore durante la rimozione dello studio con email: "+ rowData[1])
                      //});
                  }
                  else
                  {
                      //apriPannelloErrore("Non è stato selezionato nessun record dalla tabella");
                  }
                      
              }
          }
      ],
      "ajax":{
          url :"https://wobbly-earwig.glitch.me/api/corsi", // json datasource
          dataSrc: '',
          dataType: 'json',
          "columns": [
            { "data": "codice" },
            { "data": "titolo" },
            { "data": "descrizione" },
            { "data": "cfu" },
            { "data": "programma" },
            { "data": "codice_orario" }
          ],
          type: "GET",  // method  , by default get
          error: function(){  // error handling
              $('#dataTable').html("");
              $("#dataTable").append('<tbody class="employee-grid-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
              $("#dataTable_processing").css("display","none");
          }
      },
      
  } );

});

function apriPannelloElimina(data)
{
  let email = data;

  modal = document.getElementById("pannelloElimina");
  modalText = document.getElementById("modal-text");
  modalText.innerHTML = "Eliminazione dello studio di psicologia con email: " + email + " andata a buon fine";
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
}*/

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
                apriPannello("Modifica avvenuta con successo", "Modificato correttamente il corso con codice <b>" + params.codice + "</b>");
                getData();
            },
            error: function () {
                alert("Si è verificato un errore durante la modifica del corso " + params.titolo + "\nRiprovare ad eseguire l'operazione.");
                getData();
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
                apriPannello("Inserimento avvenuto con successo", "Inserito correttamente il corso <b>" + params.titolo + "</b>");
                getData();
            },
            error: function () {
                alert("Si è verificato un errore durante l'inserimento del corso " + params.titolo + "\nRiprovare ad eseguire l'operazione.");
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
        url: 'https://wobbly-earwig.glitch.me/api/corsi',
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
                                  $.redirect('corso.html', rowData, "GET");
                              }
                              
                          }
                      },
                      {
                          text: 'Elimina',
                          className: 'btn btn-primary btn-icon-split',
                          action: function () {
                              var rowData = dataTable.row('.selected').data();
                              let vurl = "https://wobbly-earwig.glitch.me/api/corsi/" + rowData.codice
                              if(rowData !== undefined)
                              {
                                  $.ajax({
                                      type: "DELETE",
                                      url: vurl,
                                      success: function(result){
                                          dataTable.row('.selected').remove().draw( false );
                                          apriPannello("Eliminazione avvenuta con successo", "Eliminato correttamente il corso: <b>" + rowData.titolo + "</b>");
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
                      { data: 'codice'}, {data: 'titolo'}, {data: 'descrizione'}, {data: 'cfu'}, {data:'programma'}, {data:'codice_orario'},
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

