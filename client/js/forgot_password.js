const form = document.querySelector('form')
const email = document.querySelector('input')
const message = document.querySelector('h3')

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    email.classList.remove('wrong-input')
    if(email.value === ''){
        email.classList.add('wrong-input')
        message.style.color = 'red'
        message.innerText = 'The field can not be empty'
    }
    const userEmail = {email: email.value}
    axios.post('http://localhost:3000/forgot_password', userEmail)
    .then(res=>{
        message.innerText = 'Check this email'
    }).catch(error=>{
        message.innerText = error.response.data.message
    })
})