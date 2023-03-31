import { useState } from 'react'

const defaultItems = [ 
  {
    id: 1,
    text: 'Kupi nesto1',
    done: false,
  },
  {
    id: 2,
    text: 'Kupi nesto',
    done: true,
  }
];

function App() {
  const [items, setItems] = useState(defaultItems);
  const [ formState, setFormState ] = useState({
    text: '',
  });

 const handleChange = (event) => {
   setFormState({ ...formState, [event.target.name]: event.target.value});
 }

 const handleSubmit = (event) => {
   event.preventDefault();
   setItems([
     ...items,
     {
       id: Date.now(),
       text: formState.text,
       done: false,
     }
   ]);
   setFormState({...formState, text: ''});
 }

  const itemComponents = items.map(item => {
    const handleChange = () => {
      setItems(items.map(newItem => {
        if (newItem.id === item.id) {
          return { ...newItem, done: !item.done };
        }
        return newItem;
      }))
    };

    const handleClick = () => {
      setItems(items.filter(newItem => {
        return newItem.id !==item.id;
      }));
    }

    return (
      <div key={item.id}>
        <input type="checkbox" checked={item.done} onChange={handleChange} />{item.text}
        <button onClick={handleClick}>X</button>
      </div>
    );
  });

  return (
    <div className="App">
      <h1>To do app</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name='text' value={formState.text} onChange={handleChange}/>
        <button type="submit">ADD</button>
      </form>
      {itemComponents}
    </div>
  )
}

export default App
