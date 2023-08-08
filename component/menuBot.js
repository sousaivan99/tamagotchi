'use client'
import React, { useEffect, useState, useRef } from 'react';
import '@style/menu.css';

const MenuBot = ({ setHappiness, setHunger, setSleep, sleep, coin, setCoin, treat, setTreat, NTreat, setNTreat, BTreat, setBTreat }) => {
    const [isFoodOpen, setIsFoodOpen] = useState(false);
    const [isShopOpen, setIsShopOpen] = useState(false);

    const foodRef = useRef(null);
    const shopRef = useRef(null);

    useEffect(() => {
        const handleDocumentClick = (event) => {
            // Check if the click event occurred outside the relevant components
            if (
                foodRef.current && !foodRef.current.contains(event.target) &&
                shopRef.current && !shopRef.current.contains(event.target)
            ) {
                // Close all the relevant states
                setIsFoodOpen(false);
                setIsShopOpen(false);
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);
    const sleepAdjustment = sleep > 80
        ? 10
        : sleep > 50
            ? 25
            : sleep > 20
                ? 35
                : 50;

    const handleWork = () => {
        setCoin((prevCoin) => Math.min(100, prevCoin + 17));
        setHunger((prevHunger) => Math.min(100, prevHunger - 35));
        setHappiness((prevHappiness) => Math.min(100, prevHappiness - 35));
        setSleep((prevSleep) => Math.min(100, prevSleep - 35));
    }
    const handleShop = (size) => {
        if (size === 's' && coin >= 5) {
            setCoin((prevCoin) => Math.min(100, prevCoin - 5));
            setTreat((prevTreat) => Math.min(100, prevTreat + 1));

        } else if (size === 'm' && coin >= 15) {
            setCoin((prevCoin) => Math.min(100, prevCoin - 15));
            setNTreat((prevNTreat) => Math.min(100, prevNTreat + 1));


        } else if (size === 'l' && coin >= 45) {
            setCoin((prevCoin) => Math.min(100, prevCoin - 45));
            setBTreat((prevBTreat) => Math.min(100, prevBTreat + 1));


        }
    }

    const handleItem = (size, type) => {
        if (size === 'l') {
            if (type === 'hunger' && BTreat >= 1) {
                // Add 50 to the current hunger value
                setHunger((prevHunger) => Math.min(100, prevHunger + 50));
                setHappiness((prevHappiness) => Math.min(100, prevHappiness + 50));
                setBTreat((prevBTreat) => Math.min(100, prevBTreat - 1));
            }
        } else if (size === 'm') {
            if (type === 'hunger' && NTreat >= 1) {
                // Add 50 to the current hunger value
                setHunger((prevHunger) => Math.min(100, prevHunger + 35));
                setHappiness((prevHappiness) => Math.min(100, prevHappiness + 35));
                setNTreat((prevNTreat) => Math.min(100, prevNTreat - 1));

            } else if (type === 'pet') {
                setHappiness((prevHappiness) => Math.min(100, prevHappiness + 15));
            } else if (type === 'sleep') {
                if (sleep >= 100) {
                    return
                }
                setHappiness((prevHappiness) => Math.min(100, prevHappiness - sleepAdjustment));
                setHunger((prevHunger) => Math.min(100, prevHunger - sleepAdjustment));
                setSleep((prevSleep) => Math.min(100, prevSleep + 100));
                setCoin((prevCoin) => Math.min(100, prevCoin + 10));
            }
        } else {
            if (type === 'hunger') {
                if (treat >= 1) {
                    // Add 50 to the current hunger value
                    setHunger((prevHunger) => Math.min(100, prevHunger + 20));
                    setHappiness((prevHappiness) => Math.min(100, prevHappiness + 20));
                    setTreat((prevTreat) => Math.min(100, prevTreat - 1));

                }
            }
        }
    };
    return (
        <>
            <div className="action-cont">
                {isFoodOpen && (
                    <div className="hidden-cont">
                        <div className="item">
                            <div className='item-info'>
                                <span>Small Treat</span>
                                <span>{treat}</span>
                            </div>
                            <button onClick={() => handleItem('s', 'hunger')}>use</button>
                        </div>
                        <div className="item">
                            <div className='item-info'>
                                <span>Treat</span>
                                <span>{NTreat}</span>
                            </div>
                            <button onClick={() => handleItem('m', 'hunger')}>use</button>
                        </div>
                        <div className="item">
                            <div className='item-info'>
                                <span>Big Treat</span>
                                <span>{BTreat}</span>
                            </div>
                            <button onClick={() => handleItem('l', 'hunger')}>use</button>
                        </div>
                    </div>

                )}
                {isShopOpen && (

                    <div className="hidden-cont" >

                        <div className="item">
                            <div className='item-info'>
                                <span>Small Treat</span>
                                <span>{treat}</span>
                            </div>
                            <button onClick={() => handleShop('s')}>buy</button>
                        </div>
                        <div className="item">
                            <div className='item-info'>
                                <span>Treat</span>
                                <span>{NTreat}</span>
                            </div>
                            <button onClick={() => handleShop('m')}>buy</button>
                        </div>
                        <div className="item">
                            <div className='item-info'>
                                <span>Big Treat</span>
                                <span>{BTreat}</span>
                            </div>
                            <button onClick={() => handleShop('l')}>buy</button>
                        </div>

                    </div>

                )}

                <div className="action-items" ref={foodRef}>
                    <span onClick={() => { setIsFoodOpen(!isFoodOpen); setIsShopOpen(false) }}>Food</span>
                </div>
                <div className="action-items" >
                    <span onClick={() => { setIsFoodOpen(false); setIsShopOpen(false); handleItem('m', 'pet') }}>Pet</span>
                </div>
                <div className="action-items" >
                    <span onClick={() => { setIsFoodOpen(false); setIsShopOpen(false); handleItem('m', 'sleep') }}>Sleep</span>
                </div>
                <div className="action-items" >
                    <span onClick={() => { setIsShopOpen(false); setIsFoodOpen(false); handleWork() }}>Work</span>
                </div>
                <div className="action-items" ref={shopRef}>
                    <span onClick={() => { setIsShopOpen(!isShopOpen); setIsFoodOpen(false); handleItem('', 'shop') }}>Shop</span>
                </div>

            </div>
        </>
    );
};

export default MenuBot;
