console.log("HI FROM MAIL ")
const url = "https://related-bright-cowbird.ngrok-free.app"
const email = document.getElementById('email');
const msg = document.getElementById('msg');
const info = document.getElementById('info');

document.getElementById('send').addEventListener('click',async(e)=>{
    e.preventDefault();
    if (email.value.trim() != "" && msg.value.trim !=""){

        const data = await axios.post(`${url}/msg`,{email:email.value,msg:msg.value})
       
        console.log(data,"DATA")
        email.value ="";
        msg.value = "";
        if(data.status == 200){

            info.style.backgroundColor = "green"
            info.textContent = data.data
    
        }else{
            info.textContent = `error ${data.data}`;
            info.style.backgroundColor = "red";
        }
    

    }else{
        info.textContent = `error empty fields`;
        info.style.backgroundColor = "red";
    }

  

})








