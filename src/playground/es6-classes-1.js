class Person {
    constructor(name = 'annonymous', age = 0) {
        this.name = name
        this.age = age
    }
    getGreeting() {
        return `Hi my name is ${this.name}`
    }
    getDescription() {
        return `${this.name} is ${this.age} year(s) old!`
    }
}

class Student extends Person {
    constructor(name, age, major) {
        super(name, age)
        this.major = major
    }
    hasmajor(){
        return !!this.major
    }
    getDescription() {
        let description = super.getDescription()
        
        if(this.hasmajor()){
            description += ` and his major is ${this.major}`
        }
        return description
    }
}

class Traveler extends Person {
    constructor(name, age, homeLocation){
        super(name, age)
        this.homeLocation = homeLocation
      
    }
    getGreeting(){
        let greeting = super.getGreeting()

        if(this.homeLocation) {
            greeting += ` and I'm Visiting from ${this.homeLocation}`
        }
        return greeting
    }

}

const me = new Traveler('chiadikaobi', 26, 'Los Angeles')
console.log(me.getGreeting())

const other = new Traveler(undefined, undefined, 'Nowhere')
console.log(other.getGreeting())