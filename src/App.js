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
      <button className = "square" onClick = {this.props.handleClick} style = {{color:(this.props.value == null ? "blue": "black"), background:(this.props.isImportant ? "grey":"white"), borderColor:(this.props.isSelect ? 'blue':'black')}}>
        {this.props.value}
        {this.props.marking}
      </button>
    )
  }
  
}
class Gameboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      board:Array(81).fill(null),
      markings:Array(81).fill(null),
      notes:Array(81).fill().map(() => Array(9).fill(null)),
      isStatic: Array(81).fill(false),
      isMarking:true,
      currSquare:0,
      isNoting:false,
    };
  }
  handleBoardClick(val){
    this.setState({
      currSquare:val
    })
  }
  handleNumButtonClick(val){
    if(!this.state.isStatic[this.state.currSquare]){
      if (this.state.currSquare != null){
        if(this.state.isMarking == true){
          const curr = this.state.markings.slice()
          curr[this.state.currSquare] = val
          this.setState({
            markings:curr
          })
      } else{
          const currNotes = this.state.notes.slice()
          const a = (currNotes[this.state.currSquare]).slice()
          a[val-1] = val
          currNotes[this.state.currSquare] = a
          this.setState({
            notes:currNotes
          })
        }
      }
    }
  }
  handleMarkingsClick(val){
    var isMarking = false
    var isNoting = false
    if(val == 0){
      isMarking = true
    }else if(val == 1){
        const currMarkings = this.state.markings.slice()
        const currNotes = this.state.markings.slice()
        currMarkings[this.state.currSquare] = null
        currNotes[this.state.currSquare] = null
        this.setState({
          markings:currMarkings,
          notes:currNotes
        })
    }else{
      isNoting = true
    }
    this.setState({
      isMarking:isMarking,
      isNoting:isNoting
    })
  }
  generateSquare(val){
    return(<Square
      isSelect = {this.state.currSquare == val}
      isImportant = {this.genImportant(this.state.currSquare).includes(val)}
      handleClick = {() => this.handleBoardClick(val)}
      marking = {this.state.markings[val]}
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
  handleReset(){
    const v = this.generateRandomBoard()
    this.setState({
      board:v[0],
      isStatic:v[1],
      markings:Array(81).fill(null),
      notes:Array(81).fill().map(() => Array(9).fill(null)),
    })
  }
  genImportant(val){
    const row = Math.floor(val/9)
    const col = val - row*9
    const arr = []
    for(var x = 0; x <9; x++){
      arr.push(x * 9 + col)
      arr.push(row*9 + x)
    }
    for(var x = Math.floor(row/3) * 3; x < Math.floor(row/3) * 3+3; x++){
      for(var y  = Math.floor(col/3)*3; y < Math.floor(col/3)*3 + 3; y++){
        arr.push(x * 9 + y)
      }
    }
    for(var x = 0; x < 81; x++){
      if(this.state.board[x] != null){
        if(this.state.board[x] == this.state.board[val] || this.state.board[x] == this.state.markings[val]){
          arr.push(x)
        }
      } else if(this.state.markings[x] != null){
        if(this.state.markings[x] == this.state.board[val] || this.state.markings[x] == this.state.markings[val]){
          arr.push(x)
        }
      }
    }
    return arr
  }
  generateBoard(){
    var list = [];
    for (var i = 0; i < 9; i++) {
      list.push(i);
    }
    var list2 = [];
    for (var x = 0; x < 3; x++){
      list2.push(x)
    }
    return( 
      <div className = "App">
      {list2.map((m) => {return(
          <div className = "board-row">
            {list2.map((n) => {return(
              <div className = "threebythree">
                {list2.map((o) => {return(
                  <div className = "float-child">
                    {list2.map((p) => {return(
                      <div>
                        {this.generateSquare((m*3 + p)*9 + n*3 + o)}
                      </div>
                    )})}
                  </div>
                )})}
              </div>
            )})}
          </div>
        )}
      )}
      </div>
    )
  }
  generateRandomBoard(){
    const arr = [5, 8, 0, 0, 0, 0, 4, 0, 0, 0, 7, 0, 0, 1, 8, 0, 3, 0, 3, 9, 1, 4, 7, 6, 0, 0, 0, 2, 6, 0, 0, 3, 0, 0, 5, 0, 0, 5, 8, 9, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 1, 8, 0, 6, 4, 7, 0, 0, 3, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 1, 8, 0, 0, 3, 0, 9, 5, 6, 0, 7]
    const a = this.state.isStatic.slice()
    for (var i = 0; i < 81; i++){
      if(arr[i] != 0){
        a[i] = true
      } else{
        arr[i] = null
      }
    }
    return([arr,a])
  }
  render(){
    return(
      <div className = "App">
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
        <div>
          <button className = "button-4" onClick = {() => this.handleReset()}>
              Reset
          </button>
        </div>
      </div>
    )
  }
}


function App() {
  return (
    <div className = "wrap">
      <div className = "App">
        <Gameboard></Gameboard>
      </div>
    </div>
  );
}

export default App;
