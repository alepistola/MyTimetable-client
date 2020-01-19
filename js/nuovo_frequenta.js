$(document).ready(function() {
    $.ajax({
        type: "GET",
        contentType: 'application/json',
        url: 'https://wobbly-earwig.glitch.me/api/corsi',
        success: function (obj, textstatus) {
            obj.forEach(d => {
                opt = document.createElement("option");
                opt.innerHTML = d.codice + " - " + d.titolo;
                opt.value = d.codice;
                document.getElementById("codice_corsoText").appendChild(opt);
                
            });
            $.ajax({
                type: "GET",
                contentType: 'application/json',
                headers: {
                    "Authorization": "Basic " + btoa("alepistola" + ":" + "password")
                },
                url: 'https://wobbly-earwig.glitch.me/api/frequentare/alepistola',
                success: function(obj, textstatus) {
                    let max = 0
                    obj.forEach(element => {
                        if(element.id > max)
                            max = element.id;
                    });
                    document.getElementById("idText").value = max + 1;
                },
                error: function(){
                    document.getElementById("idText").value = "Err";
                }
            });
        },
        error: function () {
            document.getElementById("codice_corsoText").value = "Err - course not found"
        }
    });
});
