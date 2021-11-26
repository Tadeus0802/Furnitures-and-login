const mails = document.getElementById("email");
const pass = document.getElementById("password");
const btn = document.getElementById("login");

const url = "http://localhost:3000/login";

btn.addEventListener("click",(e)=>{
    e.preventDefault()
    let data = {
        email: mails.value,
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
        localStorage.setItem("token", data.token);
        console.log(response)
        if(response.status!==200){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Something went wrong! ${data}`,
            })
        }
        else{
            Swal.fire(
                'Ok!',
                `${data.title}`,
                'success'
            ).then(function() {
                window.location = "../html/furnitures.html";
            });
        }
    } catch (error) {
        console.log(error)
    }
}
