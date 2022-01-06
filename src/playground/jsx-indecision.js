console.log('app.js is running');

//jsx javascript xml

const app ={
    title: 'Indecision App',
    subtitle: 'This is a Paragaph',
    options: []
}

const onFormSubmit =(e) => {
  e.preventDefault()

  const option = e.target.elements.option.value

  if(option){
    app.options.push(option)
    e.target.elements.option.value = ''
    renderOptionCount()
  }
}

const onRemoveAll = () => {
   app.options = []
   renderOptionCount()
}

const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length)
  const option = app.options[randomNum]
  alert(option) 
}
const appRoot = document.getElementById('app');

const renderOptionCount = () => {
  const template =(
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'Here are your options' : 'No option'}</p>
      <button disabled = {app.options.length === 0} onClick = {onMakeDecision}>What should i do?</button>
      <button onClick = {onRemoveAll}>removeAll</button>
      <ol>
        {
          app.options.map((option) => <li key={option}>list: {option}</li>)
        }
      </ol>
        <form onSubmit={onFormSubmit}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
    </div>
  );

  ReactDOM.render(template, appRoot) 
}

renderOptionCount()