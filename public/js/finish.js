const finishTask = document.querySelectorAll('#finishedTask')

Array.from(finishTask).forEach((element)=>{
    element.addEventListener('click',finish)
})

async function finish(){
    const task = this.parentNode.parentNode.childNodes[3].innerText
    //console.log(task)
    try{
        const response = await fetch('updateTask',{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'task': task,
               
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}