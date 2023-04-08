const table = document.querySelector('table')
const token = document.cookie.split('=')[1]
    axios.get('http://localhost:3000/users', {
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }).then(res=>{
        if(res.status !== 200){
            var c = document.cookie.split("; ")
            for (i in c) 
            document.cookie =/^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT" 
            window.location.href = 'index.html'
        }
        const users = res.data.users
        for(let i =0; i < users.length; i++){
            const tr = document.createElement('tr')
            const td = document.createElement('td')
            const td2 = document.createElement('td')
            td.innerText = `${users[i]['first_name']} ${users[i]['last_name']}`
            td2.innerText = users[i]['email']
            tr.appendChild(td)
            tr.appendChild(td2)
            table.append(tr)
            
        }
        
})
