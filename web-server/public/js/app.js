
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

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetchForecast(searchfield.value, (error, data) => {
        if(error){
            console.log(error)
            return
        }
        console.log(data)
    })
    console.log('Form submited')
})