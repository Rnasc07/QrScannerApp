/*
==== QR SCANNER CONFIG ====
*/
import QrScanner from "/js/qr-scanner.min.js";
QrScanner.WORKER_PATH = '/js/qr-scanner-worker.min.js';

// Elementos necessários para o funcionamento da leitura pela câmera
const video = document.getElementById('qr-video');
const camList = document.getElementById('cam-list');
const camQrResult = document.getElementById('cam-qr-result');

camList.addEventListener('change', event => {
   scanner.setCamera(event.target.value).then(updateFlashAvailability);
});

// Função com objetivo de setar o resultado na div "cam-qr-result" que é passada na callback da inicialização do QrScanner, além de comparar o id se existe ou não
function setResult(display, result, infoToCompare) {
   // Áudios para emitir (emite o sucesso quando as informações baterem, e o error quando não)
   const beepSuccess = document.getElementById('beep-success');
   const beepError = document.getElementById('beep-error');

   display.innerHTML = result;
   display.style.color = 'teal';

   if(result == infoToCompare){
      beepSuccess.play();
   } else {
      beepError.play();
   }
}

/*
==== EVENTO PARA CADA ITEM NA LISTA (ESCANEAR QRCODE) ====
*/
const buttonsScan = document.querySelectorAll('.btn-scan-item');

buttonsScan.forEach(item => {
   item.addEventListener('click', function(){
      // Recuperar o id que antes foi injetado para o item (este id está relacionado à linha da tabela. Uma linha = Um id)
      let productId = item.attributes.itemId.value;

      // Ao clicar... Habilitar a visualização de toda a estrutura do preview da camera
      const wrapContent = document.getElementById('wrapper-display-camera');
      wrapContent.style.display = 'inline-block'

      // Inicialização do QrScanner passando seus devidos argumentos
      const scanner = new QrScanner(video, result => setResult(camQrResult, result, productId), error => {
         camQrResult.textContent = error;
         camQrResult.style.color = 'inherit';
      });

      // startar a câmera e listar câmeras disponíveis do dispositivo colocando as em um select
      scanner.start().then(() => {
         updateFlashAvailability();

         QrScanner.listCameras(true).then(cameras => cameras.forEach(camera => {
            const option = document.createElement('option');
            option.value = camera.id;
            option.text = camera.label;
            camList.add(option);
         }));
      });

      console.log(productId);
      // const previewCamera = document.getElementById('preview-camera');
      // previewCamera.innerHTML = `
      // <p style="color: red;padding: 20px;">ID PRODUTO: ${productId}</p>
      // `;
   });
});

// DESABILITAR A VISUALIZAÇÃO DA DIV RESPONSÁVEL POR EXIBIR A CÂMERA AO CLICAR NO ÍCONE FECHAR
const btnCloseWrapperCamera = document.getElementById('close-wrapper-display-camera');
btnCloseWrapperCamera.addEventListener('click', function(){
   document.getElementById('wrapper-display-camera').style.display = 'none';
});