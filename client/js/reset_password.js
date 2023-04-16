const form = document.querySelector('form')
const inputs = document.querySelectorAll('input')
const message = document.querySelector('h3')
const queryString = window.location.search;
const token = queryString.split('=')[1]

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    inputs.forEach(input=>{
        input.classList.remove('wrong-input')
        if(input.value === ''){
            input.classList.add('wrong-input')
            message.style.color = 'red'
            message.innerText = 'The fields can not be empty'
        }
    })
    const formData = new FormData(form)//objeto que pega os dados do form 
    const data = Object.fromEntries(formData, token)//converte os dados em um objeto javascript
    data.token = token

    axios.post('http://localhost:3000/reset_password', data)
        .then(res=>{
            window.location.href='index.html'
        })
        .catch(error=>{
            message.style.color="red"
            message.innerText = error.response.data.message
        })
})

