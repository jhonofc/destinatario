function getElement(xpath) {
    return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

}
//colocar no local 
function setItemLocal(body, localNome) {
    localStorage.setItem(localNome, JSON.stringify(body))

}

function getItemLocal(localNome) {

    const getlocal = localStorage.getItem(localNome);

    return getlocal && JSON?.parse(getlocal)?.length > 0 ? JSON.parse(getlocal) : false
}


//criar elemento html
function elementoHtmlLista(data, div, tipo) {

    const criarDivBtninserir = document.createElement('div')
    criarDivBtninserir.setAttribute('class', 'sectionBtnPrint col-md-2 col-lg-2 col-6')
    criarDivBtninserir.innerHTML = `<button type="button" class="btn btn-sm btn-primary flex-center"><i class="fas fa-print"></i>${data}</button>`;

    div.appendChild(criarDivBtninserir)

}

function openPrint() {

    const getBtn = document.querySelector('.sectionBtnPrint')
    getBtn.addEventListener('click', () => {

        const codRastreio = getElement(`//*[@id="form-imp"]/div[2]/table/tbody/tr[1]/td[2]/text()[2]`);
        const coddestinatario = getElement(`//*[@id="form-imp"]/div[2]/table/tbody/tr[1]/td[3]`);
        const coddestino = getElement(`//*[@id="form-imp"]/div[2]/table/tbody/tr[1]/td[4]`);

        const rastreio = `id=${encodeURI(codRastreio.textContent)}`;
        const destinatario = `destinatario=${encodeURI(coddestinatario.textContent)}`;
        const destino = `destino=${encodeURI(coddestino.textContent)}`;

        const url = 'https://dados-destinatario.vercel.app/comprovante?';    
            
        open(`${url}${rastreio}&${destino}&${destinatario}`)

    })
}

function startPrint() {

    elementoHtmlLista('Imprimir comprovante de postagem', getElement(`/html/body/div[4]/div[2]`), 3)

    openPrint()

}

const getDivRef = document.querySelector('.detalhes-pagamento')
if (getDivRef) {
    startPrint()
}
