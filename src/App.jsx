import { useState, useCallback, useEffect , useRef } from "react";

import "./App.css";

function App() {
  const [lenght, setLenght] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [Password, setPassword] = useState("");

  //ref hook
  const inputRef = useRef(null);

  const PasswordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) str += "0123456789";
    if (symbols) str += "!@#$%^&*()_+";

    for (let i = 0; i < lenght; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
  }, [lenght, numbers, symbols]);

  const CopyClipboard = useCallback(() => {
    inputRef.current?.select();
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  useEffect(() => {
    PasswordGen();
  }, [lenght, numbers, symbols, PasswordGen]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={Password}
            className="outline-none w-full p-2 px-3"
            placeholder="Password"
            readOnly
            ref={inputRef} 
          />

          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          onClick={CopyClipboard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex item-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={lenght}
              className="cursor-pointer"
              onChange={(e) => setLenght(e.target.value)}
            />
            <label>Length : {lenght}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numbers}
              onChange={(e) => setNumbers((prev) => !prev)}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={symbols}
              onChange={(e) => setSymbols((prev) => !prev)}
            />
            <label>Symbols</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
