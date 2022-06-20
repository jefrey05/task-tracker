const deleteT = document.querySelectorAll('#deleteTask');

Array.from(deleteT).forEach((element)=>{
    element.addEventListener('click',deleteTask)
})

async function deleteTask(){
    //console.log(this.parentNode.parentNode.childNodes[3].innerText)
      const task = this.parentNode.parentNode.childNodes[3].innerText
      const status = this.parentNode.parentNode.childNodes[5].innerText
    
  console.log(task,status)
    try{
        const response = await fetch('deleteTask',{
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'task': task,
                "status":status
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload

    }catch(err){
        console.log(err)
    }
}
