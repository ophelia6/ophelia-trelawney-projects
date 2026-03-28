Vue.component('quiz', {
    template: `
        <div class="quiz-wrap">
            <div v-if="!finished && currentQuestion" class="quiz-card">
                <div class="q-progress">
                    <div class="q-counter">Question {{ currentIndex + 1 }} <span class="q-total">of {{ questions.length }}</span></div>
                    <div class="progress-bar">
                        <div class="progress-fill" :style="{width: (currentIndex / questions.length * 100) + '%'}"></div>
                    </div>
                </div>
                <div class="ques">{{ currentQuestion.ques[0] }}</div>
                <ul class="option" :class="containerStatus ? 'freeze' : ''">
                    <li v-for="item in currentQuestion.option" :key="item.id"
                        :class="getOptionClass(item.id)"
                        @click="result(item.id, currentQuestion.answer[0])">
                        <div class="option-content">
                            <div class="optn"><span>{{ (item.id + 9).toString(36).toUpperCase() }}</span></div>
                            <div class="optn-name">{{ item.name }}</div>
                        </div>
                    </li>
                </ul>
                <div class="answer-wrap" v-if="nextStatus">
                    <div class="answer-title">&#10003; Correct Answer</div>
                    <div class="answer-desc">{{ currentQuestion.answerdesc[0] }}</div>
                </div>
                <button class="load-quiz" v-if="nextStatus" @click="changeQuiz">
                    {{ currentIndex < questions.length - 1 ? 'Next Question \u2192' : 'See Results' }}
                </button>
            </div>

            <div v-if="finished" class="score-card">
                <div class="score-icon">&#127942;</div>
                <div class="score-title">Quiz Complete!</div>
                <div class="score-value">{{ count }}<span class="score-total-num"> / {{ questions.length }}</span></div>
                <div class="score-label">Questions Correct</div>
                <div class="score-pct" :class="count / questions.length >= 0.6 ? 'pct-pass' : 'pct-fail'">
                    {{ Math.round(count / questions.length * 100) }}%
                </div>
                <button class="retry-btn" @click="retry">Try Again</button>
            </div>

            <div v-if="!finished && !currentQuestion" class="loading">Loading questions...</div>
        </div>
    `,
    data() {
        return {
            questions: [],
            currentIndex: 0,
            containerStatus: false,
            nextStatus: false,
            count: 0,
            finished: false,
            selectedId: null,
            correctId: null,
        };
    },
    props: ['dataList'],
    computed: {
        currentQuestion() {
            return this.questions[this.currentIndex] || null;
        }
    },
    watch: {
        dataList(val) {
            if (val && val.length > 0) {
                this.questions = val.slice();
            }
        }
    },
    created() {
        if (this.dataList && this.dataList.length > 0) {
            this.questions = this.dataList.slice();
        }
    },
    methods: {
        getOptionClass(id) {
            if (!this.nextStatus) return '';
            if (id == this.correctId) return 'right';
            if (id == this.selectedId) return 'wrong';
            return '';
        },
        result(id, answer) {
            this.selectedId = id;
            this.correctId = answer;
            if (id == answer) this.count++;
            this.containerStatus = true;
            this.nextStatus = true;
        },
        changeQuiz() {
            if (this.currentIndex < this.questions.length - 1) {
                this.currentIndex++;
                this.containerStatus = false;
                this.nextStatus = false;
                this.selectedId = null;
                this.correctId = null;
            } else {
                this.finished = true;
            }
        },
        retry() {
            this.currentIndex = 0;
            this.containerStatus = false;
            this.nextStatus = false;
            this.count = 0;
            this.finished = false;
            this.selectedId = null;
            this.correctId = null;
        }
    }
});

var app = new Vue({
    el: '#root',
    template: '<div class="wrapper"><quiz :dataList="dataList"></quiz></div>',
    data: { dataList: [] },
    created() {
        fetch('data.json')
            .then(response => response.json())
            .then(data => { this.dataList = data; });
    }
});
