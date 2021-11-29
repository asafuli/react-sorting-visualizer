import { useState, useEffect, useRef } from 'react';
import { v4 as uuid4 } from 'uuid';
import { bubbleSort } from './utils';
import './styles.css';
import Card from './Card';

function App() {
  const [arrSize, setArrSize] = useState(10);
  const [cards, setCards] = useState([]);
  const [shouldSort, setShouldSort] = useState(false);
  const [counter, setCounter] = useState(0);
  const lastSwaps = useRef();
  const lastSwappedCard1 = useRef();
  const lastSwappedCard2 = useRef();

  console.log(cards);
  const randomizeBG = () => {
    let cardArrRefBG = document.querySelectorAll('.card');
    // console.log([...cardArrRefBG]);
    [...cardArrRefBG].map((card) => {
      let h = Math.floor(Math.random() * 500 + Math.random() * 500);
      let s = Math.floor(Math.random() * 30 + 40);
      let l = Math.floor(Math.random() * 30 + 40);
      let a = Math.random() * 0.1 + 0.3;
      let randBG = `hsla(${h}, ${s}%, ${l}%, ${a})`;
      card.style.setProperty('--randColor', randBG);
      return card;
    });
  };

  useEffect(() => {
    if (arrSize !== '' && !shouldSort) {
      setCards((cards) => {
        return [...Array(parseInt(arrSize)).keys()].map((el, idx, arr) => [
          Math.floor(Math.random() * arr.length),
          uuid4(),
        ]);
      });
    }
    return () => {};
  }, [arrSize, cards.length, shouldSort]);

  useEffect(() => {
    if (cards.length > 0) randomizeBG();
    return () => {};
  }, [cards.length]);

  useEffect(() => {
    if (shouldSort) {
      let newCards, swaps;
      if (counter === 0) {
        [newCards, swaps] = bubbleSort(cards.map((el) => el[0]));
        lastSwaps.current = swaps;
      }
      let timeout = setTimeout(() => {
        if (counter >= lastSwaps.current.length) {
          setArrSize((arrSize) => '');
          setShouldSort((shouldSort) => false);
          lastSwappedCard1.current = null;
          lastSwappedCard2.current = null;
          console.log('clearing last timeout');
          // setCards((cards) => newCards);
          clearTimeout(timeout);
        } else {
          let newSwapArr = [...cards];
          if (lastSwaps.current.length > 0) {
            let [swap1, swap2] = lastSwaps.current[counter];
            //save UUID of swapped cards
            lastSwappedCard1.current = newSwapArr[swap1][1];
            lastSwappedCard2.current = newSwapArr[swap2][1];
            let tmp = newSwapArr[swap1];
            newSwapArr[swap1] = newSwapArr[swap2];
            newSwapArr[swap2] = tmp;
            console.log('after swaps', newSwapArr);
            setCards((cards) => newSwapArr);
          }
          setCounter((counter) => counter + 1);
        }
      }, 1500);
    }
  }, [shouldSort, counter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(arrSize);
  };

  const handleChange = (e) => {
    setArrSize((arrSize) => {
      return /^[0-9]*$/.test(e.target.value) ? e.target.value : arrSize;
    });
  };

  const handleSort = () => {
    setShouldSort((shouldSort) => true);
  };

  const handleNewArray = () => {
    setShouldSort((shouldSort) => false);
  };

  return (
    <>
      <div className='form-container'>
        <form
          action='post'
          className='array-tweak'
          onSubmit={(e) => handleSubmit(e)}
        >
          <label htmlFor='size'> Choose Array Size </label>
          <input
            type='text'
            value={arrSize === 0 ? '' : arrSize}
            name='size'
            id='size'
            placeholder='Set Size'
            maxLength='2'
            onChange={(e) => handleChange(e)}
          />
          <button className='sort' onClick={() => handleSort()}>
            {' '}
            Sort{' '}
          </button>
          <button className='new-array' onClick={() => handleNewArray()}>
            {' '}
            Create New Cards Array{' '}
          </button>
        </form>
      </div>
      <div className='cards-grid'>
        {cards.map((card, idx) => {
          let swapClass = '';
          if (card[1] === lastSwappedCard1.current) {
            swapClass = 'swap1';
          } else if (card[1] === lastSwappedCard2.current) {
            swapClass = 'swap2';
          }
          return (
            <Card
              cardId={`card-${idx}`}
              card={card}
              key={idx}
              swap={swapClass}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
