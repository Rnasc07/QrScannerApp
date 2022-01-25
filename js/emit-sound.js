// EMITIR SOM AO CLICAR (TESTE)
document.getElementById('btn-sound-success').addEventListener('click', function(){
    const beepSuccess = document.getElementById('beep-success');
    beepSuccess.play();
});

document.getElementById('btn-sound-error').addEventListener('click', function(){
    const beepError = document.getElementById('beep-error');
    beepError.play();
});