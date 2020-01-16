
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

    $.ajax({
      type: "GET",
      url: 'https://wobbly-earwig.glitch.me/api/corsi',
      dataType: 'json',
      success: function (obj, textstatus) {
              $('#dataTable').DataTable({
                  data: obj,
                  dataSrc: "",
                  select: true,
                  order: [[ 0, "asc" ]],
                  dom: "lBfrti",
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
                columns: [
                    { data: 'codice'}, {data: 'titolo'}, {data: 'descrizione'}, {data: 'cfu'}, {data:'programma'}, {data:'codice_orario'},
                ]
              });
      },
      error: function (obj, textstatus) {
          alert(obj.msg);
      }
    });

});

