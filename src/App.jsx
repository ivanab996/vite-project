import { useState } from 'react'



function App() {
  const [items, setItems] = useState([]);
  const [ formState, setFormState ] = useState({
    text: '',
  });

  const [ sort, setSort ] = useState("createdAtDesc");

  const handleSortChnage = (event) => {
    setSort(event.target.value);
  }

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
       createdAt: Date.now(),
     }
   ]);
   setFormState({...formState, text: ''});
 }

  const itemComponents = items.sort((a, b) => {
    if (sort === "createdAtAsc") {
      return a.createdAt - b.createdAt;
    }

    return b.createdAt - a.createdAt;
  })
  .map(item => {
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


    console.log(sort);

    console.log(items.sort((a, b) => {
      if (sort === "createdAtAsc") {
        return a.createdAt - b.createdAt;
      }

      return b.createdAt - a.createdAt;
    }));

    return (
      <div key={item.id}>
        <input type="checkbox" checked={item.done} onChange={handleChange} />{item.text} ({new Date(item.createdAt).toUTCString()})
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
      <select onChange={handleSortChnage} defaultValue={sort}>
        <option value="createdAtAsc">Created at: Ascending</option>
        <option value="createdAtDesc">Created at: Descending</option>
      </select>
      {itemComponents}
    </div>
  )
}

export default App
