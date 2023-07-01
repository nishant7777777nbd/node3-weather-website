const weatherForm= document.querySelector('form')
const search=document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageTwo= document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e) => {

    e.preventDefault()

    const location=search.value

messageOne.text= 'Loading....'
messageTwo.text= ''

    BASEURL_DEV = 'http://localhost:3000'
    BASEURL_PROD = 'https://my-weather-app-ja97.onrender.com'
    fetch(BASEURL_PROD + '/weather?address=' + location).then((response) => {
    response.json().then((data) =>{
        if (data.error) {
           messageOne.textContent = data.error
           messageTwo.textContent=''
        } else {
            messageOne.textContent=data.location
            messageTwo.textContent = data.forecast
          
        }
    })
})

 
})