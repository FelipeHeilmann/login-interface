const buttons = document.querySelectorAll('.btn')
const formSignup = document.querySelector('.signup-form')
const formLogin = document.querySelector('.login-form')
const signupInputs = formSignup.querySelectorAll('input')
const loginInputs = formLogin.querySelectorAll('input')
const errorMessageLogin = document.querySelector('.error-message-login')
const errorMessageSignUp = document.querySelector('.error-message-sigup')


buttons.forEach(button => {
    button.addEventListener('click', (e)=>{
        buttons.forEach(invidualBbutton => {
            invidualBbutton.classList.remove('active')
            e.target.classList.add("active")})
        //percorre o array buttons removendo a classe active de todos e coloca a classe active no clicado
        if(e.target.innerText == 'LOGIN'){
            formSignup.classList.remove('form-active')
            formLogin.classList.add('form-active')
        }
        else{   
            formLogin.classList.remove('form-active')
            formSignup.classList.add('form-active')
        }

        
    })
})

window.addEventListener("load", (event) => {
    signupInputs.forEach(input=>input.value = '')
    loginInputs.forEach(input=>input.value = '')
  });

formSignup.addEventListener('submit', (e)=>{
    e.preventDefault()
    signupInputs.forEach(input=>{
        if(input.value.length == 0){
            input.classList.add('wrong-input')
            errorMessageSignUp.style.display = 'block'
            errorMessageSignUp.innerHTML = 'the fields cant be empty'
        }
    })

    const formDataSingup = new FormData(formSignup)//objeto que pega os dados do form 
    const data = Object.fromEntries(formDataSingup)//converte os dados em um objeto javascript

    fetch('http://localhost:3000/auth/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then((res)=>{
        console.log(res)
    }).catch(error=>{
        console.log(error)
    })
    signupInputs.values = ''
})

formLogin.addEventListener('submit',(e)=>{
    e.preventDefault()
    loginInputs.forEach(input=>{
        if(input.value.length == 0){
            input.classList.add('wrong-input')
            errorMessage.style.display = 'block'
            errorMessage.innerHTML = 'the fields cant be empty'
        }
    })

    const formDataLogin = new FormData(formLogin)//objeto que pega os dados do form 
    const data = Object.fromEntries(formDataLogin)//converte os dados em um objeto javascript
    fetch('http://localhost:3000/auth/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res=>{
        
    })

    
})


