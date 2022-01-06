import React from "react"
import AddOption from "./AddOption";
import Options from "./Options";
import Header from "./Header";
import Action from "./Action";
import OptionModal from "./OptionModal";

export default class IndecisionApp extends React.Component {
    state = {
       myOptions: [],
       selectedOption: undefined
    }
    
    handleDeleteOptions = () => {
       this.setState(() => ({ myOptions: [] }))
    }
    handleDeleteSelectedOption =() => {
        this.setState(() => ({ selectedOption: undefined}))
    }
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
          myOptions: prevState.myOptions.filter((option) => optionToRemove !== option)
        }))
    }
    handlepick = () => {
        const randomOption = Math.floor(Math.random() * this.state.myOptions.length)
        const option = this.state.myOptions[randomOption]
        this.setState(() => ({
          selectedOption: option
        }))
    }
    handleAddOption = (option) => {
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
              <div className="container">
                <Action 
                  hasOptions = {this.state.myOptions.length > 0}
                  handlepick = {this.handlepick}
                /> 
                <div className="widget">
                  <Options 
                    options = {this.state.myOptions}
                    handleDeleteOptions = {this.handleDeleteOptions}
                    handleDeleteOption = {this.handleDeleteOption}
                  />
                  <AddOption
                    handleAddOption = {this.handleAddOption}
                  />
                </div>

              </div>
            <OptionModal 
              selectedOption = {this.state.selectedOption}
              handleDeleteSelectedOption = {this.handleDeleteSelectedOption}
            />
          </div>
        )
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
}
