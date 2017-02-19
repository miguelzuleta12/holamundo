function cambiaPag(pag) {
    $.get(pag, function (data) {
        $("#pagContainer").html(data);
    });
}

function validateLogin(pag) {
    var login = $("#login").val();
    var pass = $("#pass").val();

    if (login == "") {
        $("#mensajeIngrese").html("Debes ingresar usuario");
        return
    }
    if (pass == "") {
        $("#mensajeIngrese").html("Debes ingresar contraseña");
        return
    }

    if (pass != "" && login != "") {
        if (login == "2" || login == "oscar" || login == "10" || login == "0") {
            $("#mensajeIngrese").html("La persona no es asocidado");
            return
        }
    }

    cambiaPag("suenos.html");
}
//$("#mensajeAsociado").html("");
//return
function validateAsso(pag) {
    var idtype = $("#tipoDocumento").val();
    var id = $("#id").val();

    if (idtype == "0") {
        $("#mensajeAsociado").html("Debe seleccionar algún tipo de documento");
        return
    }
    if (id == "") {
        $("#mensajeAsociado").html("Ingrese un documento para consultar información");
        return
    }

    if (idtype != "0" && id != "") {
        if (id == "1088294908" || id == "10" || id == "1") {
            $("#mensajeAsociado").html("El usuario que ha consultado no es asociado de Coomeva");
            return
        }
    }
    cambiaPag("suenos.html");
}



function charla() {
    var msg = $("#msg").val();

    senMsg(msg);

}
var context;


function senMsg(msg) {
    var auth = {
        "url": "https://gateway.watsonplatform.net/conversation/api",
        "username": "abbf421c-7376-4d1e-838b-bd426f83c657",
        "password": "qIdzmXJz43VK"
    }
    var endpointmsg = "/v1/workspaces/b17e6f4a-0a04-4b10-958f-863f201577de/message?version=2017-02-03";
    var context = {};
    var datos = {
        "input": { "text": msg },
        "context": context
    };

    $.ajax({
        url: auth.url + endpointmsg,
        data: JSON.stringify(datos),
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Basic " + btoa(auth.username + ":" + auth.password));
        },
        success: function (data) {
            context = data.context;
            $("#chatMsg").prepend("<br />" + data.output.text);
            $("#msg").val('');
        }
    });
}
