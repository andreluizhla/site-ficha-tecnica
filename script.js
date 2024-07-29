function generatePDF() {
    const { jsPDF } = window.jspdf;

    // Pegar os valores dos inputs do formulário
    const name = document.getElementById('name').value.trim();
    const yield = document.getElementById('yield').value.trim();
    const time = document.getElementById('time').value.trim();
    const cost = document.getElementById('cost').value.trim();
    const ingredients = document.getElementById('ingredients').value.trim();
    const equipment = document.getElementById('equipment').value.trim();
    const preparation = document.getElementById('preparation').value.trim();
    const notes = document.getElementById('notes').value.trim();
    const garnish = document.getElementById('garnish').value.trim();
    const imageInput = document.getElementById('image');

    // Verificar se os campos obrigatórios estão preenchidos
    if (!name || !yield || !time || !cost || !ingredients || !equipment || !preparation) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Criar um novo documento PDF
    const doc = new jsPDF();

    // Adicionar título centralizado
    doc.setFontSize(16);
    doc.text('Ficha Técnica de Receita', 105, 10, null, null, 'center');
    doc.setFontSize(12);
    doc.text(`Código: ${name}`, 105, 20, null, null, 'center');

    // Definir estilo padrão para as tabelas
    const tableStyle = {
        fontSize: 8, // Tamanho da fonte reduzido
        cellPadding: 0.7, // Reduzir o padding das células
        margin: { top: 0, left: 10, right: 10 } // Margens reduzidas
    };

    // Função para adicionar tabelas ao PDF
    const addTablesToPDF = (doc, startY) => {
        // Adicionar tabela com número de porções, tempo de preparo e custo
        doc.autoTable({
            startY: startY,
            head: [['Rendimento', 'Tempo de Preparo', 'Custo da Receita']],
            body: [[`${yield} Porções`, `${time} horas`, `R$ ${cost.tolocaleString('pt-BR', {style:'currency', currency:"BRL"})}`]],
            theme: 'grid',
            margin: imageInput.files.length > 0 ? { right: 70 } : { right: 10 },
            styles: tableStyle
        });

        // Adicionar tabela de ingredientes
        doc.autoTable({
            startY: doc.autoTable.previous.finalY + 5,
            head: [['Item', 'Ingredientes']],
            body: ingredients.split('\n').map((ingredient, index) => [index + 1, ingredient]),
            theme: 'grid',
            margin: imageInput.files.length > 0 ? { right: 70 } : { right: 10 },
            styles: tableStyle
        });

        // Adicionar tabela de guarnições/decorações abaixo da imagem
        if (garnish) {
            doc.autoTable({
                startY: imageInput.files.length > 0 ? 85 : doc.autoTable.previous.finalY + 5,
                head: [['Guarnições/Decorações']],
                body: garnish.split('\n').map(item => [item]),
                theme: 'grid',
                margin: imageInput.files.length > 0 ? { left: 150 } : { left: 10 },
                styles: tableStyle
            });
            }

        // Adicionar tabela de equipamentos e utensílios
        doc.autoTable({
            startY: Math.max(doc.autoTable.previous.finalY + 10, 85),
            head: [['Equipamentos e Utensílios']],
            body: equipment.split('\n').map(item => [item]),
            theme: 'grid',
            margin: imageInput.files.length > 0 ? { right: 70 } : { right: 10 },
            styles: tableStyle
        });

        

        // Adicionar tabela de modo de preparo ocupando a largura completa
        doc.autoTable({
            startY: Math.max(doc.autoTable.previous.finalY + 10, 85), // Adicionar espaçamento extra
            head: [['Modo de Preparo']],
            body: preparation.split('\n').map((step, index) => [`Passo ${index + 1}: ${step}`]),
            theme: 'grid',
            styles: tableStyle
        });

        // Adicionar tabela de observações/anotações ocupando a largura completa
        if (notes) {
            doc.autoTable({
                startY: doc.autoTable.previous.finalY + 5,
                head: [['Observações/Anotações']],
                body: notes.split('\n').map(note => [note]),
                theme: 'grid',
                styles: tableStyle
            });
        }

        // Salvar o PDF
        doc.save('ficha-tecnica-receita.pdf');
    };

    // Verificar se a imagem foi carregada
    if (imageInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgData = e.target.result;
            doc.addImage(imgData, 'JPEG', 150, 30, 50, 50); // Ajuste a posição e tamanho conforme necessário
            addTablesToPDF(doc, 30);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        addTablesToPDF(doc, 30);
    }
}
