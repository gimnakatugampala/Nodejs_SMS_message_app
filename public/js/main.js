const numberInput = document.getElementById('number'),
    textInput = document.getElementById('msg'),
    button = document.getElementById('button'),
    response = document.querySelector('.response');

button.addEventListener('click',send)

function send(){
    const number = numberInput.value.replace(/\D/g,'');
    const text = textInput.value;

    fetch('/',{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify({number:number,text:text})
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
})
}