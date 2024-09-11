// generer un utlisateur
async function generateUser() {
    let response =await fetch("https://randomuser.me/api")
    let data =await response.json()
    return data
}

 // stocker data dans le local storage
 async function storeData() {
   let data=await generateUser()
   let uuid=data.results[0].login.uuid
   let choix=["admin","user"]
   let randomuser=choix[Math.floor(Math.random()*choix.length)]
   let randomwork=["macon","plombier","chaufagiste"]
   let random=randomwork[Math.floor(Math.random()*randomwork.length)]
   data.status=randomuser
   if(data.status=="admin"){
     data.profession=random
   }
   localStorage.setItem(uuid,JSON.stringify(data))
 }
 storeData()
 
 // recuperer les donner voulue
 function storage(){
   
   for(i=0 ; i<localStorage.length;i++){
    let key=localStorage.key(i)
    let user=JSON.parse(localStorage.getItem(key))
    
    let response={
      "username":user.results[0].login.uuid,
      "password":user.results[0].login.password,
      "status":user.status,
      "profession":user.profession
    }
    console.log(response)
   }
 }
 
 
 // authontifiaction
 let sumbitButton=document.getElementById("submit")
 sumbitButton.addEventListener("click",function omar(event) {
     event.preventDefault();
     let userName=document.getElementById("username").value.trim()
     let password=document.getElementById("password").value.trim()
     let name=localStorage.getItem(userName)
     let response=JSON.parse(name)
     if(response!==null&&response.results[0].login.password==password){
         if(response.status==="user"){
            window.location.href = `client.html?username=${userName}`
          }else
           window.location.href = `admin.html?username=${userName}`
     
     }else{
       // message d'erreur en cas d'erreur
       let error=document.getElementsByClassName("error-message")[0]
       error.innerHTML="wrong userName or password"
     }
     })
   
   
   
 
 