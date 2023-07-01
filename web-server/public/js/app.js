
console.log("client side js")

const fetchForecast = (location, callback) => {
    fetch('http://localhost:3000/weather?address=' + location).then((response => {
    response.json().then((data) => {
        if(data.error){
            callback(data, undefined)
            return
        }
        callback(undefined, data)
    })
}))
}

const weatherForm = document.querySelector('form')
const searchfield = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetchForecast(searchfield.value, (error, data) => {
        if(error){
            messageOne.textContent = 'Error: ' + error.error
            console.log(error)
            return
        }
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
        console.log(data)
    })
})