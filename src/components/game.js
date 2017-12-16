import React, { Component } from 'react';

class Game extends Component {
    constructor(props){
        super(props);

        this.state = {
            randomNumber: this.getRandomNumber(),
            guessedNumber: ''
        };
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
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
    handleSubmit(e){
        e.preventDefault();
        const {randomNumber}= this.state;
        const {guessedNumber}= this.state;
        console.log('Guessed Number in handleSubmit', guessedNumber);
        console.log('Random Number in handleSubmit', randomNumber);
        if (parseInt(guessedNumber)===randomNumber){
           console.log('Kid you Guessed it!');
        }else if (parseInt(guessedNumber) < randomNumber){
            console.log('Too Low!');
        }
        else if (parseInt(guessedNumber) > randomNumber){
            console.log('Too High!');
        }
    }
    reset(){
        console.log('start over');
        this.setState = {
            randomNumber: this.getRandomNumber(),
            guessedNumber: ''
        };
    }
    render(){
        const {randomNumber}=this.state;
        const {guessedNumber}=this.state;
        console.log('Guessed Number', guessedNumber);
        console.log('Random Number', randomNumber);
        return (
            <div className='container'>
                <h1 className="text-center my-3">Guess a Number between 1-10</h1>
                    <form onSubmit= {this.handleSubmit}>
                        <div className='form-group row'>
                            <div className='col-8 push-2 text-center'>
                                <input onChange={(e)=>{this.handleInputChange(e)}} className ='form-control text-center' type="text"/>
                                <button  type='button' className='btn btn-outline-success'>Submit</button>
                                <button onClick={this.reset} type='button' className='btn btn-outline-danger'>Reset</button>
                            </div>
                        </div>
                    </form>
                <div className='row'>
                    <div className='col-8 push-2 text-center'>
                        display messages here
                    </div>
                </div>
            </div>
        )
    }
}
export default Game;