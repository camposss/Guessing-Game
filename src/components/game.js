import React, { Component } from 'react';

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
            range: '10',
            hasMounted: false
        };
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleSubmittedGuess=this.handleSubmittedGuess.bind(this);
        this.reset=this.reset.bind(this);
        this.changeRange= this.changeRange.bind(this);
    }
    componentDidMount(){
        this.setState({
            hasMounted: true
        });
    }

    getRandomNumber(){
        const randomNumber= Math.floor(Math.random()*10+1);
        return randomNumber;
    }
    handleInputChange(e){
        const {hasWon}=this.state;
        if(hasWon===false){
            this.setState({
                guessedNumber: e.target.value
            })
        }
    }
    handleSubmittedGuess(e){
        e.preventDefault();
        const {randomNumber,guessedNumber,hasWon,previousGuessedNumbers}= this.state;
        let {guessCounter}= this.state;
        if(guessedNumber!==''){
            localStorage.setItem('previousGuesses', guessedNumber);
            previousGuessedNumbers.push(guessedNumber);
        }
        if(guessCounter===5){
            this.reset();
            return;
        }
        if(!hasWon){
            if (guessedNumber===''){
                this.setState({
                    display: 'Please enter a number!',
                });
            }
            if (parseInt(guessedNumber)===randomNumber){
                this.setState({
                    display: 'Kid you Guessed it',
                    guessCounter: guessCounter+1,
                    previousGuessedNumbers: previousGuessedNumbers,
                    hasWon: true
                });
                setTimeout(this.reset,1000)
            }else if (parseInt(guessedNumber) < randomNumber){
                this.setState({
                    guessedNumber:'',
                    display: 'Too Low!',
                    guessCounter: guessCounter+1,
                    previousGuessedNumbers: previousGuessedNumbers
                });
            }
            else if (parseInt(guessedNumber) > randomNumber){
                this.setState({
                    guessedNumber:'',
                    display: 'Too High!',
                    guessCounter: guessCounter+1,
                    previousGuessedNumbers: previousGuessedNumbers
                });
            }
        }
        let previousGuessContainer= document.getElementById('previousGuessContainer');
        previousGuessContainer.scrollIntoView();
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
        this.setState({
            randomNumber: newRandomNumber,
            range: newRange
        })
    }
    reset(){
        const newState= {
            randomNumber: this.getRandomNumber(),
            guessedNumber: '',
            display: '',
            guessCounter: 0,
            previousGuessedNumbers: [],
            hasWon:false
        };
        // localStorage.clear();
        this.setState(newState);
    }
    render(){
        const {guessedNumber, display, guessCounter,previousGuessedNumbers,range}=this.state;
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
                {/*{!this.state.hasMounted? <h2>Loading</h2>: ''}*/}
                <div className='jumbotron'>
                    <h1 className="text-center my-3 ">Guess a Number between 1- {range}</h1>
                    <small style={smallStyle}>You got 5 chances to hit it...Good Luck</small>
                    <hr/>
                    <form onSubmit= {(e)=>{this.handleSubmittedGuess(e)}}>
                        <div className='form-group row'>
                            <div className='col-md-12 col-xs-12 text-center'>
                                <input onChange={(e)=>{this.handleInputChange(e)}} value={guessedNumber}
                                className ='form-control text-center' type="number" autoFocus/>
                            </div>
                        </div>
                        <div className=" buttonContainer row">
                            <button type='button' className='col-xs-12 col-lg-4 btn btn-outline-success'>Submit</button>
                            <button onClick={this.reset} type='button' className='col-xs-12 col-lg-4 btn btn-outline-danger'>Reset</button>
                            <button onClick={this.changeRange} type='button' className=' col-xs-12 col-lg-4 btn btn-outline-warning'>Randomize Range</button>
                        </div>
                    </form>
                <div className='display-div row'>
                    <div className='col-8 push-2 text-center'>
                        {display}
                    </div>
                </div>
                <div className='row'>
                    <div id = 'previousGuessContainer' className='col-md-8 offset-md-2 col-xs-12 text-center'>
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