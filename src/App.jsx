import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'
import Die from "./components/Die"


function App() {
    
    const [dice, setDice] = useState(allNewDice)

    const [tenzies, setTenzies] = useState(false)

    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
      }, [dice]);

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    const diceElements = dice.map(idx => 
        <Die 
            key={idx.id} 
            value={idx.value} 
            isHeld={idx.isHeld} 
            hold={() => holdDice(idx.id)} 
        />)

    function allNewDice() {
        
        const newDice = []
    
        for(var i = 0; i < 10; i++){
                newDice.push(generateNewDie())
        }
            
        return newDice
        }

    

    function rollDice(){
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie()
        }))
        
        if (tenzies) {
            setDice(allNewDice())
            setTenzies(false)
        }
    }

    function holdDice(id){
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
            {...die, isHeld: !die.isHeld} : 
            die
        })) 
    }
    
    
    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="btn-roll" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
            {tenzies && <Confetti/>}
        </main>
    )
}

export default App