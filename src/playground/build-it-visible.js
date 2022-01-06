class VisibilityToggle extends React.Component {
    constructor(props){
        super(props)
        this.visibilityClick = this.visibilityClick.bind(this)
        this.state = {
            visibility: false
        }
    }
    visibilityClick(){
        this.setState((prevState) => {
            return {
                visibility: !prevState.visibility 
            }
        })
    }
    render(){
        return(
          <div>
            <h1>Visibility Toggle</h1>
            <button onClick = {this.visibilityClick}>
               {this.state.visibility ? 'Hide details' : 'Show details'}
            </button>
            {this.state.visibility && (
                <div>
                  <p>hey.. this are some text you can now see</p>
                </div>
            )}
          </div>
        )
    }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'))