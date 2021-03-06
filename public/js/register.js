const mail = document.getElementById("email");
const pass = document.getElementById("password");
const btn = document.getElementById("register");

const url = "http://localhost:3000/register";

btn.addEventListener("click",(e)=>{
    e.preventDefault()
    let data = {
        email: mail.value,
        password: pass.value
    }
    Post(data);
})

async function Post(datas) {
    try {
        const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify(datas) 
        });
        const data = await response.json();
        if(response.status!==200){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Something went wrong! ${data.title}`,
            })
        }
        else{
            Swal.fire(
                'Ok!',
                `${data.title}`,
                'success'
            ).then(function() {
                window.location = "../html/index.html";
            });
        }
    } catch (error) {
        console.log(error)
    }
}

