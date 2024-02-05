class CountryCapitalGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            dataArr:[],
            duet:[],

          };
          this.checkMatch = this.checkMatch.bind(this);
          this.init = this.init.bind(this);
    }

    init(){
        Object.entries(this.state.data).map(([key, val]) => {
            this.state.dataArr.push(key);
            this.state.dataArr.push(val);
        }      
        )

        // this.state.dataArr.sort((a, b) => a.sort - b.sort)
        

    }

    checkMatch(val) {

        console.log(this.state.data[val]);
        
      }

    render() {
        return ( 
        <div>  
        {this.init()}
         <div className='data'>
            {this.state.dataArr.map((val,key) => (
                    <div className={key} onClick={() => this.checkMatch(val)}>{val}</div>
            ))}
        </div>
        </div>  
        );
    }
}

const element = 
<div class="container">
  <CountryCapitalGame  data={{ "germany": "Berlin", "Azerbaijan": "Baku" }} />
</div>;


ReactDOM.render(
  element,
  document.getElementById('root')
);