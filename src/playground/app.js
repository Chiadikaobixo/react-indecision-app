class IndecisionApp extends React.Component {
  constructor(props){
    super(props)
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
    this.handlepick = this.handlepick.bind(this)
    this.handleAddOption = this.handleAddOption.bind(this)
    this.handleDeleteOption = this.handleDeleteOption.bind(this)
    this.state = {
      myOptions: []
    }
  }
  componentDidMount(){
    try {
      const json = localStorage.getItem('keyoptions')
      const options = JSON.parse(json)

      if(options){
        this.setState(() => ({ myOptions: options }))
      }
    } catch (e) {
      
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.myOptions.length !== this.state.myOptions.length){
      const json = JSON.stringify(this.state.myOptions)
      localStorage.setItem('keyoptions', json)
    }
  }
  componentWillUnmount(){
    console.log('component will unmount')
  }

  handleDeleteOptions(){
    this.setState(() => ({ myOptions: [] }))
  }
  handleDeleteOption(optionToRemove){
    this.setState((prevState) => ({
      myOptions: prevState.myOptions.filter((option) => optionToRemove !== option)
    }))
  }
  handlepick(){
    const randomOption = Math.floor(Math.random() * this.state.myOptions.length)
    const option = this.state.myOptions[randomOption]
    alert(option)
  }
  handleAddOption(option){
    if(!option){
      return 'Enter a valid value to add item'
    }else if(this.state.myOptions.indexOf(option) > -1){
      return 'This option already exit'
    }

    this.setState((prevState) => ({ myOptions: prevState.myOptions.concat(option) }))
  }
  render() {
    const theSubTitle = 'Put your life in the hands of a computer'

    return (
      <div>
        <Header  subTitle= {theSubTitle}/>
        <Action 
          hasOptions = {this.state.myOptions.length > 0}
          handlepick = {this.handlepick}
        />
        <Options 
          options = {this.state.myOptions}
          handleDeleteOptions = {this.handleDeleteOptions}
          handleDeleteOption = {this.handleDeleteOption}
        />
        <AddOption
          handleAddOption = {this.handleAddOption}
        />
      </div>
    )
  }
}

const Header = (props) => {
  return (
    <div>
       <h1>{props.title}</h1>
       {props.subTitle && <h2>{props.subTitle}</h2>}
    </div>
  )
}
Header.defaultProps = {
  title: 'Indecision'
}

const Action = (props) => {
  return (
    <div>
      <button 
        onClick = {props.handlepick}
        disabled = {!props.hasOptions}
      >
        What should i do?
      </button>
    </div>
  )
}

const Options = (props) => {
  return (
    <div>
    <button onClick = {props.handleDeleteOptions}>Remove All</button>
    {props.options.length === 0 && <p>Please add an option to get started!</p>}
      {
        props.options.map((option) => (
          <Option 
            key={option} 
            optionText={option}
            handleDeleteOption = {props.handleDeleteOption}
          />
        ))
      }
    </div>
  )
}

const Option = (props) => {
  return(
    <div>
      {props.optionText}
      <button 
        onClick = {(e) => {
          props.handleDeleteOption(props.optionText)
        }}
      >
        remove
      </button>
    </div>
  )
}


class AddOption extends React.Component {
  constructor(props){
    super(props)
    this.handleAddOption = this.handleAddOption.bind(this)
    this.state = {
      error: undefined
    }
  }
  handleAddOption(e) {
    e.preventDefault()
    
    const option = e.target.elements.option.value.trim()
    const error = this.props.handleAddOption(option)

    this.setState(() => ({ error }))
    
    if(!error) {
      e.target.elements.option.value = ''
    }
  }  
  render() {
    return(
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit = {this.handleAddOption}>
           <input text='text' name='option' />
           <button>Add Option</button>
        </form>
      </div>
    )
  }
}


ReactDOM.render(<IndecisionApp />, document.getElementById('app'))