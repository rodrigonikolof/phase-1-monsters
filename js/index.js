let page = 1;
const url = 'http://localhost:3000/monsters';
(function (){
const monsterDiv = document.querySelector('#create-monster');
monsterDiv.innerHTML= 
`<form id="monster-form">              
<input type="text" id="name" name="name" placeholder="Enter Name">
<input type="text" id="age" name="age" placeholder="Enter Age">
<input type="text" id="description" name="description" placeholder="Description">
<button type="submit" id="submit-button">Submit</button>
            </form>`

})()

function fetchMonsters (){

fetch(url+`/?_limit=10&_page=${page}`)
.then(res => res.json())
.then(data => renderMonster(data))
};
const monsterContainer = document.querySelector('#monster-container');
function renderMonster(monsters){

  for (let monster of monsters){
    let monsterInfo = document.createElement('div');
    monsterInfo.innerHTML = `<h2>${monster.name}</h2>
                            <h4>Age: ${parseInt(monster.age)}</h4>
                            <p><b>Description</b>: ${monster.description}</p>`
    monsterInfo.classList.add('monster-info')
    monsterContainer.appendChild(monsterInfo)
  }
    
}
fetchMonsters()

const forward = document.querySelector('#forward').addEventListener('click', ()=>{
    page += 1;
    console.log(page)
    monsterContainer.innerHTML=""
    fetchMonsters();
})
const back = document.querySelector('#back').addEventListener('click', ()=>{
    page -= 1;
    console.log(page)
    monsterContainer.innerHTML=""
    fetchMonsters();
})

const monsterForm = document.querySelector('#monster-form');
monsterForm.addEventListener('submit', e => {
    e.preventDefault();
    let newMonster = {
      name: e.target.name.value,
      image: e.target.age.value,
      description: e.target.description.value,}
      console.log(newMonster)
      saveNewMonster(newMonster,e);
          })

    function saveNewMonster(newMonster){
      
      fetch(url,{
        method: 'POST',
        headers: {'Content-Type':'application/json', 'Accepts':'application.json'},
        body:JSON.stringify(newMonster)
      })  
        
      
    }