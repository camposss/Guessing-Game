import React, {Component} from 'react';

class History extends Component {

    render(){
        const {guessArray}= this.props;
        console.log(' these are the props in add history', this.props);
        const list= guessArray.map((item,index)=>{
            return <li key ={index} className='justify-content-center list-group-item list-group-item-warning'> Previous Guess | {item}</li>
        });
        return(
            <ul className='list-group previousGuessesContainer'>
                <li className='justify-content-center list-group-item list-group-item-danger'> Guesses Left | {this.props.guessesLeft}</li>
                {list}
            </ul>

        )
    }

}
export default History;