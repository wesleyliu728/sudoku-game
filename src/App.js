import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';



class Square extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      notes:this.props.notes,
      value:this.props.value,
    };
  }
  render(){
    return(
      <button className = "square" onClick = {this.props.handleClick}>
        {this.props.value}
      </button>
    )
  }
  
}
class Gameboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      board:Array(81).fill(0),
      markings:Array(81).fill(0),
      notes:Array(81).fill(Array(9).fill(null)),
      isStatic: Array(81).fill(false),
      isMarking:true,
      currNum:8,
      isErasing:false,
      isNoting:false,
    };
  }
  handleBoardClick(val){
    if(this.state.isStatic[val]){
      if(this.state.isMarking){
        const curr = this.state.markings.slice()
        curr[val] = this.state.currNum
        this.setState({
          markings:curr
        })
      }else if(this.state.isErasing){
        const currMarkings = this.state.markings.slice()
        const currNotes = this.state.markings.slice()
        currMarkings[val] = null
        currNotes[val] = null
        this.setState({
          markings:currMarkings,
          notes:currNotes
        })
      }else{
        const currNotes = this.state.markings.slice()
        currNotes[val][this.state.currNum] = this.state.currNum
        this.setState({
          notes:currNotes
        })
      }
    }
  }
  handleNumButtonClick(val){
    this.setState(
      {
        currNum:val,
      }
    )
  }
  handleMarkingsClick(val){
    var isMarking = false
    var isErasing = false
    var isNoting = false
    if(val == 0){
      isMarking = true
    }else if(val == 1){
      isErasing = true
    }else{
      isNoting = true
    }
    this.setState({
      isMarking:isMarking,
      isErasing:isErasing,
      isNoting:isNoting
    })
  }
  generateSquare(val){
    return(<Square
      handleClick = {() => this.handleBoardClick(val)}
      value = {this.state.board[val]}
      notes = {this.state.notes[val]}
    />)
  }
  generateNumButtons(){
    var list = [];
    for (var i = 1; i <= 9; i++) {
      list.push(i);
    }
    return(list.map((m) => {return(
      <button className = "button-4" onClick = {() => this.handleNumButtonClick(m)}>
        {m}
      </button>
    )}))
  }
  generateBoard(){
    var list = [];
    for (var i = 0; i < 9; i++) {
      list.push(i);
    }
    var list2 = [];
    for (var x = 0; x < 9; x++){
      list2.push(x)
    }
    return(
      list2.map((m) => {return(
          <div className = "board-row">
            {list.map((n) => {return this.generateSquare(m*(9)+n);})}
          </div>
        )}
      )
    )
  }
  generateRandomBoard(){
    return(Array(81).fill(10))
  }
  render(){
    return(
      <div>
        <div>
          {this.generateBoard()}
        </div>
        <div>
          <button className = "button-4" onClick = {() => this.handleMarkingsClick(0)} style = {{background:(this.state.isMarking ? 'cyan':'white')}}>
            Mark
          </button>
          <button className = "button-4" onClick = {() => this.handleMarkingsClick(1)} style = {{background:(this.state.isErasing ? 'cyan':'white')}}>
            Erase
          </button>
          <button className = "button-4" onClick = {() => this.handleMarkingsClick(2)} style = {{background:(this.state.isNoting ? 'cyan':'white')}}>
            Note
          </button>
        </div>
        <div>
          {this.generateNumButtons()}
        </div>
      </div>
    )
  }
}


function App() {
  return (
    <Gameboard></Gameboard>
  );
}

export default App;
