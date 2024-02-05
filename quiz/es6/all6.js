const contentData = [];
const answerData = ["B","A","C","C","D"];
var count = 0;
//returns json as promise

const init = () =>{
    addData();
    processData();
}
window.onload = () => {
    init();
  };

const fetchData = new Promise((resolve,reject) => {
fetch('data.json')
    .then(res => res.json())
    .then(response => 
        resolve(response)
    )
    .catch(err => console.error(err));
});
const addData = () =>{
    fetchData.then(data =>{
        const objectLength = Object.keys(data).length;
        for(let i = 0;i<objectLength;i++){
           contentData.push(Object.values(data)[i]);
        }
    })
}

const getId = (id) => document.querySelector(`#${id}`);
const getCurrentItem = () => getId(`quiz-container`).children.length;

const processData = () =>{
    const childEleCount = getCurrentItem();
    if(childEleCount<answerData.length){
        getData(childEleCount);
    }
    else{
        function insertAfter(referenceNode, newNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
          }
          
          var newEl = document.createElement("div");
          newEl.classList.add("final-ans");
          newEl.innerHTML = `Your score is ${count} out of ${answerData.length}`;
          var el = document.getElementById("quiz-container");
          insertAfter(el, newEl);
    }
}  

const getData = (dataCount) =>{
    setTimeout(() => {
        const listName = contentData[dataCount][0];
        const { answer, option, ques } = listName;
        const myList = new RenderAll([dataCount,answer,ques],option);
        myList.renderTemplate();
        myList.renderOption();
        startSelect();
        },500)
}
class RenderAll{
    constructor(items,option){
        this.items = items,
        this.option = option
    }
    renderTemplate(){
        const ele = getId(`quiz-container`);
        const content = mainTemplate(this.items);
        ele.innerHTML += `<li>${content}</li>`;
    }
    renderOption(){
        const elOption = getId(`option${this.items[0]}`);   
        const optionContent = optionTemplate(this.option);
            for(let optnKey in optionContent){
                elOption.innerHTML += optionContent[optnKey];
            }
    }
}
const mainTemplate = (mainTemplate) => {
    const template = `<div class="ques">${mainTemplate[2][0]}</div><ul class="option" id="option${mainTemplate[0]}"></ul><div class="answer-wrap" id="answer${mainTemplate[0]}"><div class="title">Correct Answer!</div><div class="desc">${mainTemplate[1][0]}</div></div>`;
    return template;
}
const optionTemplate = (optionTemplate) => {
    const optionData = optionTemplate.map((item,index) =>{
       return `<li><div class="option-content"><div class="optn"><p>${(index+10).toString(36)}</p></div><div class="optn-name">${item}</div></div></li>`;
    })
    return optionData;
}

const startSelect = () => {
    const currentNum = getCurrentItem() - 1;
    const eleOptns = getId(`option${currentNum}`).getElementsByTagName("li");
        for(let k=0;k<eleOptns.length;k++){
            eleOptns[k].addEventListener(
                'click',
                afterClick.bind(null, eleOptns[k], currentNum),
                true
                );
    }
}
const afterClick = (event,currentNum) =>{
    const actualAns = answerData[currentNum].toLowerCase().trim();
    const selectedAns = event.getElementsByTagName("p")[0].innerHTML.toLowerCase().trim();
        if(actualAns == selectedAns){
            count++;
            event.classList.add('right');
        }
        else{
            event.classList.add('wrong');
        }
    getId(`answer${currentNum}`).style.display = "block";
    processData();   
}





