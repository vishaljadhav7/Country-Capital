import React, { useState, useEffect } from 'react';

const Game = ({ data }) => {
  const [allNames, setAllNames] = useState([]);
  const [first, setFirst] = useState(null);
  const [sec, setSec] = useState(null);
  const [isCorrect, setIsCorrect] = useState({});


  useEffect(() => {
    const newArr = [...Object.keys(data), ...Object.values(data)];
    newArr.sort((a, b) => 0.5 - Math.random())
    setAllNames(newArr);
  }, [])

  function checkForMatch() {
    if (data.hasOwnProperty(first)) {
      return data[first] === sec ? true : false;
    } else if (data.hasOwnProperty(sec)) {
      return data[sec] === first ? true : false;
    } else {
      return false // both first & sec are not keys // data[first] === second || data[second] === first;
    }
  }

  function handleClick(e) {
    if (!first) {
      setFirst(e.target.id);
    } else {
      setSec(e.target.id);
    }
  }

  useEffect(() => {
    if (sec !== null) {
      let res = checkForMatch()
      setIsCorrect({
        [first]: res,
        [sec]: res
      })
      setTimeout(() => {
        if (res) {
          const newArr = allNames.filter((name) => {
            if (name !== first && name !== sec) {
              return name
            }
          })
          setAllNames([...newArr])
        }
        setIsCorrect({});
        setFirst(null)
        setSec(null)
      }, 1000)
    }
  }, [sec])

  // function reset(){
     // setIsCorrect({});
     //    setFirst(null)
     //    setSec(null)
  // }

  return (
    <div className='game-container'>

      {allNames.length <= 0 ? <h2>Congrats</h2> : ""}

      <div className='all-btn-container'>
        {allNames.map((name, idx) => {
          return (
            <button
              className={`name-btn ${name === first || name === sec ? 'selected' : ''} ${isCorrect[name] === true || isCorrect[name] === true ? 'correct' : ''}  ${isCorrect[name] === false || isCorrect[name] === false ? 'incorrect' : ''}`}
              id={name}
              onClick={handleClick}
              key={`${name}-${idx}`}
            >
              {name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Game;
