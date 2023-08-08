'use client';
import Menu from "@/component/menu";
import MenuBot from "@component/menuBot";
import { updateMood } from "@/component/utils";

import React, { useEffect, useState } from 'react';

function Home() {
  const [happiness, setHappiness] = useState(() => {
    const savedHappiness = localStorage.getItem('happiness');
    return Number(savedHappiness);
  });

  const [hunger, setHunger] = useState(() => {
    let savedHunger = localStorage.getItem('hunger');
    if (savedHunger <= 0) {
      return 0;
    }
    return Number(savedHunger);
  });

  const [sleep, setSleep] = useState(() => {
    const savedSleep = localStorage.getItem('sleep');
    return Number(savedSleep);
  });

  const [avg, setAvg] = useState(100);
  const [mood, setMood] = useState('happy');
  const [coin, setCoin] = useState(() => {
    const savedCoin = localStorage.getItem('coin');
    return Number(savedCoin);
  });

  const [treat, setTreat] = useState(() => {
    const savedTreat = localStorage.getItem('Treat');
    return Number(savedTreat);
  });

  const [NTreat, setNTreat] = useState(() => {
    const savedNTreat = localStorage.getItem('NTreat');
    return Number(savedNTreat);
  });

  const [BTreat, setBTreat] = useState(() => {
    const savedBTreat = localStorage.getItem('BTreat');
    return Number(savedBTreat);
  });

  // Start or stop timer based on avg
  useEffect(() => {
    const avg = (hunger + sleep) / 2;
    setAvg(avg);

    // Call the function to update mood based on the initial average value
    const newMood = updateMood(avg, happiness);
    setMood(newMood);
    // console.log(mood);
  }, [avg, happiness, hunger, sleep]);

  useEffect(() => {
    localStorage.setItem('happiness', happiness.toString());
  }, [happiness]);


  // Reusable function for decreasing the status
  const handleDecreaseStatus = (setter) => () => {
    setter((prevValue) => Math.max(0, prevValue - 10));
  };

  // Reusable function for increasing the status
  const handleIncreaseStatus = (setter) => () => {
    setter((prevValue) => Math.min(100, prevValue + 10));
  };

  // timer for decreasing happiness every minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (avg <= 60) {

        // Call your function here
        // console.log("SetHappiness called");
        setHappiness((prevHappiness) => {
          const decreasedHappiness = Math.max(0, prevHappiness - 4);
          console.log(`Happiness decreased: ${decreasedHappiness}`);
          return decreasedHappiness;
        });
      } else {
        if (happiness > 100) {
          return
        }
        setHappiness((prevHappiness) => {
          const decreasedHappiness = Math.max(0, prevHappiness + 4);
          console.log(`Happiness decreased: ${decreasedHappiness}`);
          return decreasedHappiness;
        });
      }
    }, 30000);

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [happiness]);

  useEffect(() => {
    localStorage.setItem('hunger', hunger.toString());
  }, [hunger]);

  // timer for decreasing hunger every minute
  useEffect(() => {
    const interval = setInterval(() => {
      // Call your function here
      // console.log("setHunger called");
      setHunger((prevHunger) => {
        const decreasedHunger = Math.max(0, prevHunger - 4);
        console.log(`Hunger decreased: ${decreasedHunger}`);
        return decreasedHunger;
      });
    }, 10000);

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [hunger]);


  useEffect(() => {
    localStorage.setItem('sleep', sleep.toString());
  }, [sleep]);

  // timer for decreasing sleep every minute
  useEffect(() => {
    const interval = setInterval(() => {
      // Call your function here
      // console.log("setSleep called");
      setSleep((prevSleep) => {
        const decreasedSleep = Math.max(0, prevSleep - 4);
        console.log(`Sleep decreased: ${decreasedSleep}`);
        return decreasedSleep;
      });
    }, 20000);

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [sleep]);

  // timer for increasing Coin every 1 min
  useEffect(() => {
    const interval = setInterval(() => {
      // Call your function here
      setCoin((prevCoin) => {
        const increasedCoin = Math.max(0, prevCoin + 4);
        console.log(`Coin increased: ${increasedCoin}`);
        return increasedCoin;
      });
    }, 60000);

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [coin]);



  useEffect(() => {
    if (hunger <= 0) {
      setHunger(0);
    } else if (hunger > 100) {
      setHunger(100)
    }
    if (happiness <= 0) {
      setHappiness(0)
    } else if (happiness > 100) {
      setHappiness(100)
    }
    if (sleep <= 0) {
      setSleep(0)
    } else if (sleep > 100) {
      setSleep(100)
    }
    // console.log('happiness: ' + happiness);
    // console.log('hunger: ' + hunger);
    // console.log('sleep: ' + sleep);
    // console.log('avg: ' + avg);
  }, [avg, sleep, hunger, happiness]);

  return (
    <>
      <div className="wrapper">
        <Menu happiness={happiness} hunger={hunger} sleep={sleep} coin={coin} />

        <h1>Peter</h1>
        <div className="avatar">

          {mood === 'happy' && <video autoPlay loop muted><source src="/happy.webm" type="video/webm" /></video>}
          {mood === 'idle' && <video autoPlay loop muted><source src="/neutral.webm" type="video/webm" /></video>}
          {mood === 'sad' && <video autoPlay loop muted><source src="/sad.webm" type="video/webm" /></video>}
        </div>
        <MenuBot setHunger={setHunger} setHappiness={setHappiness} setSleep={setSleep} sleep={sleep} coin={coin} setCoin={setCoin} setTreat={setTreat} treat={treat} setNTreat={setNTreat} NTreat={NTreat} setBTreat={setBTreat} BTreat={BTreat} />
        {/* <div className="debug-cont">
          <div>
            <button onClick={handleDecreaseStatus(setHappiness)}>hit Happiness</button>
            <button onClick={handleDecreaseStatus(setHunger)}>hit Hunger</button>
            <button onClick={handleDecreaseStatus(setSleep)}>hit Sleep</button>
          </div>

          <div>
            <button onClick={handleIncreaseStatus(setHappiness)}>heal Happiness</button>
            <button onClick={handleIncreaseStatus(setHunger)}>heal Hunger</button>
            <button onClick={handleIncreaseStatus(setSleep)}>heal Sleep</button>
          </div>
          <div>
            <button onClick={() => changeMood('happy')}>Happy Mood</button>
            <button onClick={() => changeMood('sad')}>Sad Mood</button>
            <button onClick={() => changeMood('excited')}>Excited Mood</button>
          </div>
        </div> */}
      </div>
    </>);
}

export default Home;