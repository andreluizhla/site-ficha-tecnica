const texto = document.getElementById('texto');
const arquivo = document.getElementById('arquivo').files
//const jsPDF = window.jspdf

function verificar() {
    if (texto.value != 0 ){
        gerarPDF()
    }
}

function gerarPDF() {
    var doc = new jsPDF({
        orientation : 'portrait',
        unit: 'mm',
        format: 'a4'
    })
    doc.text(texto.value, 10, 10)


    doc.save('arquivo.pdf')
}
