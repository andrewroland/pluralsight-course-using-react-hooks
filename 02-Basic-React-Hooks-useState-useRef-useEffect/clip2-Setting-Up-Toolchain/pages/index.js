import React, {useState} from 'react';

const InputElement = () => {
  const [inputText, setInputText] = useState('');
  const [histroyList, setHistroyList] = useState([]);

  return <div>
      <input 
      onChange={(e) => {
        setInputText(e.target.value);
        setHistroyList([...histroyList,e.target.value])
      }}
      placeholder="Enter Some Text" />
      <br/>
      <ul>
        {histroyList.map(h => <li> {h}</li>)}
      </ul>
    </div>
};

export default InputElement;
