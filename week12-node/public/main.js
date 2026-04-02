const button = document.getElementById('load-btn');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('user-list');

button.addEventListener('click', async () => {
     const response = await fetch('/api/users');

     const users = await response.json();

     list.innerHTML = '';

     users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user.name;
        list.appendChild(li);
     });
});

addBtn.addEventListener('click', async () =>{
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({name: 'Chuck'})
    });

    const data = await response.json();
    console.log(data);
});