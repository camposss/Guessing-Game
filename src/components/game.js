import React, { Component } from 'react';
// import Sound from 'react-sound';

class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            randomNumber: this.getRandomNumber(),
            guessedNumber: '',
            display: '',
            guessCounter: 0,
            previousGuessedNumbers: [],
            hasWon: false,
            range: '10'
        };
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleSubmittedGuess=this.handleSubmittedGuess.bind(this);
        this.reset=this.reset.bind(this);
        this.changeRange= this.changeRange.bind(this);
    }
    getRandomNumber(){
        const randomNumber= Math.floor(Math.random()*10+1);
        return randomNumber;
    }
    handleInputChange(e){
        const {hasWon}=this.state;
        if(hasWon===false){
            console.log(e.target.value);
            this.setState({
                guessedNumber: e.target.value
            })
        }
    }
    handleSubmittedGuess(e){
        const {randomNumber,guessedNumber,hasWon,previousGuessedNumbers}= this.state;
        let {guessCounter}= this.state;
        localStorage.setItem('previousGuesses', guessedNumber);
        previousGuessedNumbers.push(guessedNumber);
        if(!hasWon){
        e.preventDefault();
        console.log('Guessed Number in handleSubmit', guessedNumber);
        console.log('Random Number in handleSubmit', randomNumber);
        // console.log('previous guessed numbers in handleSubmit' ,previousGuessedNumbers);
            if (guessedNumber===''){
                this.setState({
                    display: 'Please enter a number',
                });
            }
            if (parseInt(guessedNumber)===randomNumber){
                console.log('Kid you Guessed it!');
                this.setState({
                    display: 'Kid you Guessed it',
                    guessCounter: guessCounter+1,
                    previousGuessedNumbers: previousGuessedNumbers,
                    hasWon: true
                });
                setTimeout(this.reset,1000)
            }else if (parseInt(guessedNumber) < randomNumber){
                console.log('Too Low!');
                this.setState({
                    guessedNumber:'',
                    display: 'Too Low!',
                    guessCounter: guessCounter+1,
                    previousGuessedNumbers: previousGuessedNumbers
                });
            }
            else if (parseInt(guessedNumber) > randomNumber){
                console.log('Too High!');
                this.setState({
                    guessedNumber:'',
                    display: 'Too High!',
                    guessCounter: guessCounter+1,
                    previousGuessedNumbers: previousGuessedNumbers
                });
            }
        }

    }
    changeRange(){
        const {range}= this.state;
        const rangeArray= [2,10,100,1000,10000,100000,1000000];
        const newRange= rangeArray[Math.floor(Math.random()*rangeArray.length)];
        if(parseInt(range)===newRange){
            this.changeRange();
            return;
        }
        const newRandomNumber= Math.floor(Math.random()*newRange+1);
        console.log(newRandomNumber);
        this.setState({
            randomNumber: newRandomNumber,
            range: newRange
        })
    }
    reset(){
        console.log('Resetting the Game');
        const newState= {
            randomNumber: this.getRandomNumber(),
            guessedNumber: '',
            display: '',
            guessCounter: 0,
            previousGuessedNumbers: [],
            hasWon:false
        };
        localStorage.clear();
        this.setState(newState);
    }
    render(){
        const {randomNumber,guessedNumber, display, guessCounter,previousGuessedNumbers,range}=this.state;
        // let previousGuessedNumbers=localStorage.getItem('previousGuesses');
        console.log('previous guessed numbers' ,previousGuessedNumbers);
        console.log('Guessed Number', guessedNumber);
        console.log('Random Number', randomNumber);
        console.log('Number of guesses:', guessCounter);
        let listOfPreviousGuesses=previousGuessedNumbers.map((item,index) =>{
            return(
                <li key ={index} className='justify-content-center list-group-item list-group-item-warning'> Previous Guess | {item} </li>
            )
        });
        let smallStyle= {
            display:"block",
            textAlign: "center"
        };
        return (
            <div className='container'>
                <div className='jumbotron'>
                    <h1 className="text-center my-3 ">Guess a Number between 1- {range}</h1>
                    <small style={smallStyle}>Who knows, you might just hit it</small>
                    <hr/>
                    <form onSubmit= {(e)=>{this.handleSubmittedGuess(e)}}>
                        <div className='form-group row'>
                            <div className='col-8 push-2 text-center'>
                                <input onChange={(e)=>{this.handleInputChange(e)}} value={guessedNumber}
                                       className ='form-control text-center' type="number" autoFocus
                                />
                                <button  type='button' className='btn btn-outline-success'>Submit</button>
                                <button onClick={this.reset} type='button' className='btn btn-outline-danger'>Reset</button>
                                <button onClick={this.changeRange} type='button' className='btn btn-outline-warning'>Randomize Range</button>
                            </div>
                        </div>
                    </form>
                <div className='display-div row'>
                    <div className='col-8 push-2 text-center'>
                        {display}
                    </div>
                </div>
                <div className='guessed-numbers-display row'>
                    <div className='col-8 push-2 text-center'>
                        <ul className='list-group'>
                            <li className='justify-content-center list-group-item list-group-item-danger'> Number of Guesses | {guessCounter}</li>
                            {listOfPreviousGuesses}
                        </ul>
                        {/*<AddHistory history={this.state.previousGuessedNumbers}/>*/}
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
export default Game;