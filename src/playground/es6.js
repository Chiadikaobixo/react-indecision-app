const multiplier = {
    numbers: [2, 6 , 5],
    multiplyBy: 2,
    multiply(){
      return this.numbers.map((number) =>  number * this.multiplyBy)
   }
  }
  console.log(multiplier.multiply())


// Class properties
  class OldSyntax {
    constructor(){
        this.name = 'mike'
        this.getGreetings = this.getGreetings.bind(this)
    }
    getGreetings () {
        return `my name is ${this.name}`
    }
}
const oldSyntax = new OldSyntax()
const oldgetGreetings = oldSyntax.getGreetings
console.log(oldgetGreetings())

//----------------

class NewSyntax {
    name = 'chiadi'
    getGreetings = () => {
        return `my name is ${this.name}`
    }
}
const newSyntax = new NewSyntax()
const newgetGreetings = newSyntax.getGreetings
console.log(newgetGreetings())