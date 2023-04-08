const title = document.querySelector('h1')
const table = document.querySelector('table')
const logout = document.querySelector('button')
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
        title.innerText+= " " + res.data.userName
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

logout.addEventListener('click', ()=>{
    let date = new Date(2010,0,01);
    data = date.toGMTString();
    document.cookie = 'token=; expires=' + date + '; path=/client';
    window.location.href='index.html'
    
})
