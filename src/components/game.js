import React, { Component } from 'react';

class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            randomNumber: this.getRandomNumber(),
            guessedNumber: '',
            display: '',
            guessCounter: 0,
            previousGuessedNumbers: ''
        };
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleSubmittedGuess=this.handleSubmittedGuess.bind(this);
        this.reset=this.reset.bind(this);
    }
    getRandomNumber(){
        const randomNumber= Math.floor(Math.random()*10+1);
        return randomNumber;
    }
    handleInputChange(e){
        console.log(e.target.value);
        this.setState({
            guessedNumber: e.target.value
        })
    }
    handleSubmittedGuess(e){
        const {randomNumber,guessedNumber}= this.state;
        let {guessCounter}= this.state;
        localStorage.setItem('previousGuesses', guessedNumber);
        // localStorage.setItem('previousGuessedNumbers', JSON.stringify(previousGuessedNumbers));
        e.preventDefault();
        console.log('Guessed Number in handleSubmit', guessedNumber);
        console.log('Random Number in handleSubmit', randomNumber);
        if (guessedNumber===''){
            this.setState({display: 'Please enter a number'});
        }
        if (parseInt(guessedNumber)===randomNumber){
           console.log('Kid you Guessed it!');
           this.setState({
               display: 'Kid you Guessed it',
               guessCounter: guessCounter+1,
           });
           setTimeout(this.reset,1000)
        }else if (parseInt(guessedNumber) < randomNumber){
            console.log('Too Low!');
            this.setState({
                    guessedNumber:'',
                    display: 'Too Low!',
                    guessCounter: guessCounter+1
            });
        }
        else if (parseInt(guessedNumber) > randomNumber){
            console.log('Too High!');
            this.setState({
                guessedNumber:'',
                display: 'Too High!',
                guessCounter: guessCounter+1
            });
        }
    }
    reset(){
        console.log('Resetting the Game');
        const newState= {
            randomNumber: this.getRandomNumber(),
            guessedNumber: '',
            display: '',
            guessCounter: 0
        };
        this.setState(newState);
    }
    render(){
        const {randomNumber,guessedNumber, display, guessCounter}=this.state;
        const previousGuessedNumbers=localStorage.getItem('previousGuesses');
        console.log('previous guessed numbers' ,previousGuessedNumbers);
        console.log('Guessed Number', guessedNumber);
        console.log('Random Number', randomNumber);
        console.log('Number of guesses:', guessCounter);
        return (
            <div className='container'>
                <h1 className="text-center my-3">Guess a Number between 1-10</h1>
                    <form onSubmit= {(e)=>{this.handleSubmittedGuess(e)}}>
                        <div className='form-group row'>
                            <div className='col-8 push-2 text-center'>
                                <input onChange={(e)=>{this.handleInputChange(e)}} value={guessedNumber}
                                       className ='form-control text-center' type="number" autoFocus
                                />
                                <button  type='button' className='btn btn-outline-success'>Submit</button>
                                <button onClick={this.reset} type='button' className='btn btn-outline-danger'>Reset</button>
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
                        {previousGuessedNumbers}
                    </div>
                </div>

            </div>
        )
    }
}
export default Game;