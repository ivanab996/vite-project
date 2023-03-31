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

  const itemComponents = items.map(item => {
    return (
      <div key={item.id}>
        <input type="checkbox" checked={item.done} />{item.text}
      </div>
    );
  });

  return (
    <div className="App">
      <h1>To do app</h1>
      {itemComponents}
    </div>
  )
}

export default App
