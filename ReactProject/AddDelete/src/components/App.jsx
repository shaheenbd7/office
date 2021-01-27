import React from "react";
import { useState } from "react";

// function createNotes(note) {
//   return <Note key={note.key} title={note.title} content={note.content} />;
// }

function App() {
  const initialSSIDList = [
    {
      key: 1,
      name: "ssid_1",
    },
    {
      key: 2,
      name: "ssid_2",
    },
    {
      key: 3,
      name: "ssid_3",
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

  function ADD() {
    console.log("ADD");
    setAche((prevState) => [
      ...prevState,
      { key: Math.random(), name: "hudai" },
    ]);
  }

  function handleRemove(id) {
    console.log("delete-> ");
    console.log({ id });
    setAche((prevState) => ache.filter((s, sindex) => id !== sindex));
  }

  function SSIDSection() {
    return (
      <div>
        {ache.map((item, idx) => (
          <div key={item.id}>
            <h5>AMI ekhane {idx} </h5>
            <button
              key={Math.random()}
              type="button"
              onClick={() => handleRemove(idx)}
            >
              Remove row
            </button>
          </div>
        ))}
      </div>
    );
  }

  // function show() {

  // }

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
