
/*
Função responsável por setar a cor do item conferido
*Os itens terão um id único, exemplo: data-return-{numId}
*/
function setCheckSuccessItem(elementName){
    let handleEl = document.getElementById(elementName);
    handleEl.style.backgroundColor = 'rgb(220,255,244)';
    handleEl.style.color = 'rgba(22,163,74, 0.9)';
}

// setCheckSuccessItem('data-return-452');
// setCheckSuccessItem('data-return-453');


let arrayInfo = ['1', '2', '3'];

alert(arrayInfo);