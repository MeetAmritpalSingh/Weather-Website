console.log("Client side Javascript");

const url = 'http://localhost:3000/weather?address='


const weatherform =  document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch(url+search.value).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast; 
            }   
        })
    })
})