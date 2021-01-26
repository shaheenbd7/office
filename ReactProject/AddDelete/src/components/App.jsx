import React from "react";
import {useState} from 'react';

// function createNotes(note) {
//   return <Note key={note.key} title={note.title} content={note.content} />;
// }

function App() {

  const initialSSIDList = [
    {
      key: 1,
      name: "ssid_1",
      isActive: false,
    },
    {
      key: 2,
      name: "ssid_2",
      isActive: false,
    },    
  ];

  // function deleteMe() {
  //   console.log('delete me');
  // }

  
 const [ache, setAche] = useState(initialSSIDList);
//  const [nai, setNai] = useState([1,2,3,4,5]);

//  function setAche(id) {
//     return id;    
//  }

  function handleRemove(id) {
    console.log('delete-> ');
    console.log({id});
  }

  function SSIDSection() {
    return (
      <div>
        {ache.map((item) => (
          <div key={item.id}>            
              <button key={item.id} type="button" onClick={() => handleRemove( item.id )}>
                Remove
              </button>            
          </div>
        ))}
      </div>
    );
  }

  // function show() {

  // }

function  ADD() {
  console.log('ADD');
}

  return (
    <div>
      <h1>HELLO SHAHEEN</h1>
      <SSIDSection />

      <div onClick={ADD} onKeyPress={ADD} role="button">
        <h1>ADDD</h1>
      </div>
    </div>
  );
}

export default App;
