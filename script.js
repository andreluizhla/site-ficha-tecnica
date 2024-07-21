const texto = document.getElementById('texto');
const arquivo = document.getElementById('arquivo');
const { jsPDF } = window.jspdf;

function verificar() {
    if (texto.value.trim() !== "") {
        gerarPDF();
    } else {
        alert("Por favor, insira algum texto.");
    }
}

function gerarPDF() {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const text = texto.value;
    const textWidth = doc.getTextWidth(text);
    const textX = (pageWidth - textWidth) / 2;

    doc.setFontSize(30);
    doc.text(text, textX, 10);

    doc.save('arquivo.pdf');
}
