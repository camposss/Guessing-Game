import React, { Component } from 'react';
import History from './add_history';

class Game extends Component {
    constructor(props){
        super(props);
        this.backgroundSound = new Audio('assets/rainforest.mp3');
        this.backgroundSound.loop=true;
        this.state = {
            randomNumber: null,
            guessedNumber: '',
            display: '',
            guessCounter: 0,
            previousGuessedNumbers: [],
            hasWon: false,
            range: null,
            hasMounted: false,
            guessesLeft: null,
            musicOn: this.checkUserPreference()
        };
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleSubmittedGuess=this.handleSubmittedGuess.bind(this);
        this.reset=this.reset.bind(this);
    }
    componentDidMount(){
        this.getRandomValues();
    }
    checkUserPreference(){
        if(localStorage.getItem('musicOn')){
            let userPreference= true;
            this.backgroundSound.play();
            return userPreference
        }else{
            let userPreference = false;
            this.backgroundSound.pause();
            return userPreference;
        }
    }
    toggleSound(){
        const {musicOn}= this.state;
        if(musicOn){
            this.backgroundSound.pause();
            localStorage.removeItem('musicOn');
        }else{
            this.backgroundSound.play();
            localStorage.setItem('musicOn',true);
        }
        this.setState({
            musicOn: !musicOn
        })
    }
    getRandomValues(){
        const seed = Math.random()*15+1;
        const rangeMax = Math.floor(Math.pow(2, seed));
        let guesses = Math.ceil(seed);
        const newRandomNumber= Math.floor(Math.random()*rangeMax+1);

        this.setState({
            randomNumber: newRandomNumber,
            range: rangeMax,
            guessesLeft:guesses
        })
    }
    handleInputChange(e){
        const {hasWon,guessesLeft}=this.state;
        if(hasWon===false && guessesLeft!==0){
            this.setState({
                guessedNumber: e.target.value
            })
        }
            return;

    }
    handleSubmittedGuess(e){
        e.preventDefault();
        const {randomNumber,guessedNumber,hasWon,previousGuessedNumbers,guessesLeft}= this.state;
        let {guessCounter}= this.state;
        if(guessedNumber!==''){
            localStorage.setItem('previousGuesses', guessedNumber);
            previousGuessedNumbers.push(guessedNumber);
        }
        if(guessesLeft===0){
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
                    display: '',
                    guessCounter: guessCounter+1,
                    previousGuessedNumbers: previousGuessedNumbers,
                    hasWon: true,
                    guessesLeft: guessesLeft-1
                });
                // setTimeout(this.reset,3500)
            }else if (parseInt(guessedNumber) < randomNumber){
                this.setState({
                    guessedNumber:'',
                    display: 'Too Low!',
                    guessCounter: guessCounter+1,
                    previousGuessedNumbers: previousGuessedNumbers,
                    guessesLeft: guessesLeft-1
                });
            }
            else if (parseInt(guessedNumber) > randomNumber){
                this.setState({
                    guessedNumber:'',
                    display: 'Too High!',
                    guessCounter: guessCounter+1,
                    previousGuessedNumbers: previousGuessedNumbers,
                    guessesLeft: guessesLeft-1
                });
            }
        }
    }
    reset(){
        this.getRandomValues();
        const newState= {
            guessedNumber: '',
            display: '',
            guessCounter: 0,
            previousGuessedNumbers: [],
            hasWon:false,
        };
        this.setState(newState);
    }
    render(){
        console.log('the random number is ', this.state.randomNumber);
        if(this.state.hasMounted) {
            return;
        }
        const {guessedNumber, display, previousGuessedNumbers,range,guessesLeft,hasWon}=this.state;
        let smallStyle= {
            display:"block",
            textAlign: "center"
        };
        return (
            <div className='container'>
                <div className='jumbotron'>
                    <button className='btn btn-primary' onClick={()=>this.toggleSound()}>Turn Sound {this.state.musicOn? 'Off': ' On'} </button>
                    <h2 className="text-center my-3 ">Guess a Number between <span className='rangeSpanText'>1 - {range}</span>  </h2>
                    {!hasWon?
                        <p style={smallStyle}>{guessesLeft>0? <span id='chancesSpanTag'> {guessesLeft} chances to hit it...Good Luck</span>:
                            <span id='chancesSpanTag'>{guessesLeft} chances...Game Over! Click reset to start over! </span>}
                        </p>:
                        <div style={smallStyle}>
                            <span className='winSpanText'>Congratulations You Win!!!!</span><br/>
                            <span className='discretionarySpanText'>Click reset to play again</span>
                        </div>
                    }
                    <div className='row'>
                        <div className='col-md-8 offset-md-2 col-xs-12 text-center'>
                            {display}
                        </div>
                    </div>
                    <hr/>
                    <form onSubmit= {(e)=>{this.handleSubmittedGuess(e)}}>
                        <div className='form-group row'>
                            <div className=' col-md-12 col-xs-12 text-center'>
                                <input id='guessInput' onChange={(e)=>{this.handleInputChange(e)}} value={guessedNumber}
                                className ='form-control text-center' type="number" autoFocus/>
                            </div>
                        </div>
                        <div className="buttonContainer row">
                            <button style= {guessesLeft===0 || hasWon? {"display":"none"}:{"display":'inline-block'}}
                                className=' col-6 btn btn-success'>Submit</button>

                            <button onClick={this.reset} type='button'
                                    className={guessesLeft!==0 && !hasWon? 'col-6 btn btn-danger':'col-sm-12 col-lg-6 offset-lg-3 btn btn-danger'}>Reset
                            </button>
                        </div>
                    </form>
                {/*<div className='row'>*/}
                    {/*<div className='col-md-8 offset-md-2 col-xs-12 text-center'>*/}
                        {/*{display}*/}
                    {/*</div>*/}
                {/*</div>*/}
                <div className='row previousGuessesRow'>
                    <div className='col-md-8 offset-md-2 col-xs-12 text-center'>
                        {!previousGuessedNumbers.length? <h2 className='text-center'>Start Guessing Now!</h2>: ''}
                        {previousGuessedNumbers.length>0? <History guessesLeft= {guessesLeft} guessArray={previousGuessedNumbers}/>: '' }
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
export default Game;