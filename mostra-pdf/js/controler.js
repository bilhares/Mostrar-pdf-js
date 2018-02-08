var urlPadrao = '10.100.5.22:8080/rest-multas/rest';
var gif = document.getElementById("gif");
gif.style.display = 'none';


function visualizar(){
    gif.style.display = 'block';
    var id = $('#id-arquivo').val();
    var pdfviewer = document.getElementById("pdfviewer");
    console.log(id);
    pdfviewer.src = 'http://10.100.5.22:8080/rest-multas/rest/multas/get-arquivo/'+id;
    gif.style.display = 'none';
}

var download = function(){    
    var id = $('#id-arquivo').val();
    $.ajax({
        type: 'POST',
        url: 'http://10.100.5.22:8080/rest-multas/rest/multas/get-arquivo',
        data: JSON.stringify({id:id}),
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function(){
            gif.style.display = 'block';
            console.log("before");
        }, 
        success: function(response){
            gif.style.display = 'none';
            console.log(response.arquivo);
            var sampleBytes = base64ToArrayBuffer(response.arquivo);
            saveByteArray([sampleBytes], 'PDF.pdf');
        }
    });
}

var download2 = function(){    
    var id = $('#id-arquivo').val();
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/gerar-pdf-portaria/rest/gerar-pdf/get-byte',
        data: JSON.stringify(
            {
            "ARTIGO_INCISO_WORK":id,
            "NOME_WORK":"ANDRE AURELIO CUNHA                     ",
            "CPF_WORK":"38624743133",
            "DATA_CADASTRO_WORK":"12/06/2017",
            "NUM_PORTARIA":"002019",
            "ANO_PORTARIA":"2017",
            "NUMERO_CNH_WORK":"1000000019",
            "NUMERO_REGISTRO_WORK":"00002819742",
            "TIPO_PROC_WORK":"cassacao",
            "AUTO":[
            "MSMS012455",
            "MSMS012455",
            "MSMS012455"
            ]

        }
        ),
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function(){
            gif.style.display = 'block';
            console.log("before");
        }, 
        success: function(response){
            gif.style.display = 'none';
            console.log(response.byteDespacho);
            var sampleBytes = base64ToArrayBuffer(response[0].byteDespacho);
            var sampleBytesP = base64ToArrayBuffer(response[0].bytePortaria);
            saveByteArray([sampleBytes], 'PDF.pdf');
            saveByteArray([sampleBytesP], 'PDF.pdf');
        }
    });
}

function base64ToArrayBuffer(base64) {
    var binaryString =  window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++)        {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}

var saveByteArray = (function () {
    return function (data, name) {
        var blob = new Blob(data, {type: "application/pdf"}),
            url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
    };
}());
