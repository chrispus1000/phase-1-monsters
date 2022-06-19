let currentPage = 1;

// const monsterUrl = `http://localhost:3000/monsters?_limit=50&_page=${currentPage}`
const pick = (string) => document.querySelector(string);
const newTag = (string) => document.createElement(string);
const pickAll = (string) => document.querySelectorAll(string);


document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault()
    createForm()
    getAllMonsters()
    pick("#create-form").addEventListener("submit", (e) => {
        e.preventDefault()
        console.log(e)
        addNewMonster(e)
    })  
    forwardClick()
    backwardClick()
})
const createForm = () => {
    pick("#create-monster").append(createNewMonster());
}
  
const addNewMonster = (e) => {
    console.log(e.target)
    let newObj = {
        name: e.target.name.value,
        age: e.target.age.value,
        description: e.target.description.value
    }
    renderMonsterList(newObj)
    e.target.name.value = ""
    e.target.age.value = ""
    e.target.description.value = ""
}

const getAllMonsters = () => {
    fetch(`http://localhost:3000/monsters?_limit=20&_page=${currentPage}`)
    .then(resp => resp.json())
    .then(monster => {
        console.log(monster)
        pick("#monster-container").textContent = "";
        monster.forEach(renderMonsterList)
    })
}

const renderMonsterList = monsterObj => {
    const divMonster = newTag("div")
    divMonster.id = monsterObj.id
    const pName = newTag("h2")
    pName.textContent = `Name: ${monsterObj.name}`
    const pAge = newTag("h4")
    pAge.textContent = `Age: ${monsterObj.age}`
    const pDescription = newTag("p")
    pDescription.textContent = `Description: ${monsterObj.description}`

    divMonster.append(pName, pAge, pDescription)
    pick("#monster-container").append(divMonster)
}

const createNewMonster = () => {
    let newForm = newTag("form");
    let inputName = newTag("input");
    let inputAge = newTag("input");
    let inputDesc = newTag("input");
    let buttonForm = newTag("button");
  
    newForm.id = "create-form";
    inputName.id = "name";
    inputName.name = "name";
    inputName.placeholder = "name...";
  
    inputAge.id = "age";
    inputAge.name = "age";
    inputAge.placeholder = "age...";
  
    inputDesc.id = "description";
    inputDesc.name = "description";
    inputDesc.placeholder = "description...";
  
    buttonForm.textContent = "create";
  
    newForm.append(inputName, inputAge, inputDesc, buttonForm);
    return newForm
  }

function forwardClick () {
    pick("#forward").addEventListener("click", () => {
    currentPage++;
    getAllMonsters();
})
}

function backwardClick() {
    pick("#back").addEventListener("click", () => {
    currentPage--;
    getAllMonsters();
})
}