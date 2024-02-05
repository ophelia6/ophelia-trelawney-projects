// import Vue from 'vue';
Vue.component('quiz',{
    template: `<div class="quiz-wrap" id="quiz-wrap"><div class="quiz" v-if="itemData != ''">
    <div class="quiz-content">
    <div class="template"><div class="ques">{{itemData[0].ques[0]}}</div><ul class="option" v-bind:class="containerStatus ? 'freeze' : 'unfreeze'"><li v-for="item in itemData[0].option" :key="item.id" ref="items" v-on:click="result(item.id,itemData[0].answer[0])"><div class="option-content"><div class="optn"><p>{{(item.id+9).toString(36)}}</p></div><div class="optn-name">{{ item.name }}</div></div></li></ul><div class="answer-wrap"><div class="title">Correct Answer!</div><div class="desc">{{itemData[0].answerdesc[0]}}</div></div><div class="quiz-ad"></div></div>
    <div class="load-quiz" v-bind:class="nextStatus ? 'enabled' : 'disabled'" v-on:click="changeQuiz">NEXT</div>
    </div>
    </div><div class="score"></div>`,
    data() {
        return {
          dataList: [],
          itemData: [],
          containerStatus: false,
          itemStatus: false,
          nextStatus: false,
          count: 0
        };
      },
      props: ['dataList'],
      created() {
            this.loadData();
      },
      methods: {
        loadData(){
            setTimeout(function () { 
                console.log(this.dataList);
                if(this.dataList.length > 0){
                this.itemData.push(this.dataList[0]);
                this.dataList = this.dataList.shift();
                }
                else{
                    const newEl = document.querySelector('.score')
                    newEl.style.display = "flex";
                    newEl.innerHTML = `Your score is ${this.count}`;
                    
                }
            }.bind(this), 500)
        },
        insertAfter(referenceNode, newNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
          },
        result(id,answer){
            if (id == answer){
                this.$refs.items[id-1].className = "right";
                this.count++;
            }
            else{
                this.$refs.items[id-1].className = "wrong";
                this.$refs.items[answer-1].className = "right";
            }
            this.containerStatus = true;
            this.nextStatus = true;
        },
        changeQuiz(){
            this.itemData = [];
            this.loadData();
            this.containerStatus = false;
            this.nextStatus = false;
        }
      }
})
var app = new Vue({
    el:'#root',
    template:'<div class="wrapper"><quiz v-bind:dataList="dataList">{{dataList}}</quiz></div>',
    data: {
        dataList: [],
    },
    created() {
        fetch("data.json")
            .then(response => response.json())
            .then(data => (this.dataList = data));
      },
    methods: {
    
    }
})