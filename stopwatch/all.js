class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      miliSecond:0,
      second:0,
      minute:0
    };
    this.baseState = this.state;
    this.startWatch = this.startWatch.bind(this);
    this.stopWatch = this.stopWatch.bind(this);
    this.resetWatch = this.resetWatch.bind(this);
  }

 changeState(){
  if(this.state.miliSecond < 99){
    this.setState({
      miliSecond: this.state.miliSecond + 1
    })
  }
  else{
    clearInterval(this.timerID);
    this.setState({
      miliSecond: 0,
      second: (this.state.second < 59 ) ? this.state.second + 1 : 0,
      minute: (this.state.second == 59 ) ? this.state.minute + 1 : this.state.minute
    })
    this.timerID = setInterval(() => this.changeState(), 10);
  }
 }

  startWatch() {
    this.timerID = setInterval(() => this.changeState(),10);
    document.querySelector('#btn-wrap').classList.add("active");
  }

  stopWatch(){
    clearInterval(this.timerID);
    document.querySelector('#btn-wrap').classList.remove("active");
  }

  resetWatch(){
    this.stopWatch();
    this.setState(this.baseState);
  }

  render() {
    return (
      <div class="wrapper">
        <div class="watch-wrap"> 
          <div class="minute"><span className={(this.state.minute < 10) ? "single" : "double"}>0</span>{this.state.minute}</div> : 
          <div class="second"><span className={(this.state.second < 10) ? "single" : "double"}>0</span>{this.state.second}</div> .
          <div class="milisecond"><span className={(this.state.miliSecond < 10) ? "single" : "double"}>0</span>{this.state.miliSecond}</div>
        </div> 
        <div class="btn-wrap" id="btn-wrap">
          <div class="btn start" onClick={this.startWatch}>START</div>
          <div class="btn stop" onClick={this.stopWatch}>STOP</div>
          <div class="btn reset" onClick={this.resetWatch}>RESET</div>
        </div>
      </div>
    );
  }

}

const element = 
<div class="container">
  <StopWatch />
</div>;


ReactDOM.render(
  element,
  document.getElementById('root')
);

