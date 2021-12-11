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
      <div>
        <button className = "square" onClick = {this.props.handleClick} style = {{color:(this.props.value == null ? "#3C93C9": "#1C5475"), background:(this.props.isImportant ? "#D5EBF8":"white"), borderColor:(this.props.isSelect ? '#45A1D9':'#527F9C'), borderWidth:(this.props.isSelect ? 3:2)}}>
          <div className = "notes">
            {this.props.notes}
          </div> 
          {this.props.value}
          {this.props.marking}
        </button>
      </div>
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
          a[val-1] = (a[val-1] == null) ? val:null
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
      this.setState({
        isMarking:isMarking,
        isNoting:isNoting
      })
    }else if(val == 1){
        const currMarkings = this.state.markings.slice()
        const currNotes = this.state.markings.slice()
        currMarkings[this.state.currSquare] = null
        currNotes[this.state.currSquare] = Array(9).fill(null)
        this.setState({
          markings:currMarkings,
          notes:currNotes
        })  
    }else{
      isNoting = true
      this.setState({
        isMarking:isMarking,
        isNoting:isNoting
      })
    }

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
      <div>
      {list2.map((m) => {return(
          <div>
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
    const b = [[0,1,0,0,0,6,0,0,0,0,0,0,2,7,0,3,0,0,0,0,3,1,8,0,6,9,0,0,0,0,0,3,0,8,0,0,2,0,0,0,1,0,9,0,7,0,0,7,0,0,4,0,1,6,4,0,0,8,0,0,7,0,9,0,0,8,9,5,1,4,0,0,9,0,0,0,0,0,0,0,0
    ],[0,0,5,4,0,0,0,0,0,0,0,0,1,0,0,0,2,0,1,0,4,0,9,7,0,8,0,0,8,0,0,0,0,4,0,0,0,0,0,0,0,9,0,0,3,0,0,6,2,0,0,0,1,8,0,0,7,0,1,3,2,4,6,3,0,0,5,2,0,0,0,0,0,0,2,0,6,8,3,5,0
    ],[8,0,0,0,0,0,0,0,0,0,0,0,5,0,1,0,0,0,0,0,0,0,2,0,0,1,5,0,7,0,0,0,5,9,4,0,5,0,9,0,4,0,6,3,1,1,8,0,0,3,6,0,5,0,3,0,0,0,0,9,0,0,6,0,9,0,3,0,0,0,8,0,7,0,0,8,0,0,0,0,0
    ], [0,0,6,9,0,8,0,0,0,9,0,3,7,6,0,0,0,0,1,0,7,0,4,0,9,0,0,3,0,0,0,9,0,7,0,1,0,0,1,2,7,0,0,4,3,0,0,0,3,0,4,0,0,0,0,1,9,0,0,0,0,0,6,0,0,5,0,0,7,0,9,0,0,0,2,0,0,9,0,3,8
    ], [0,0,7,0,0,0,5,2,0,0,2,0,6,0,0,0,0,3,5,0,8,0,0,0,0,4,6,9,8,5,3,6,0,2,1,0,0,1,0,8,2,0,0,0,0,0,0,0,1,0,4,0,9,0,0,0,6,0,0,3,0,0,7,0,0,0,0,7,0,0,0,0,7,0,2,0,0,0,0,6,9
    ], [5, 8, 0, 0, 0, 0, 4, 0, 0, 0, 7, 0, 0, 1, 8, 0, 3, 0, 3, 9, 1, 4, 7, 6, 0, 0, 0, 2, 6, 0, 0, 3, 0, 0, 5, 0, 0, 5, 8, 9, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 1, 8, 0, 6, 4, 7, 0, 0, 3, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 1, 8, 0, 0, 3, 0, 9, 5, 6, 0, 7],[0,0,2,0,0,0,0,0,7,4,9,0,0,0,0,5,8,0,3,8,0,0,0,4,0,0,2,5,0,0,0,0,2,0,6,0,0,0,0,0,8,5,0,7,4,0,0,1,3,4,0,8,0,0,0,2,0,0,0,3,0,1,6,9,0,5,0,6,0,2,0,0,6,0,0,7,0,0,4,5,0
    ], [0,0,0,0,1,0,7,0,4,7,0,0,8,0,6,0,2,0,0,0,0,0,0,0,6,3,9,0,0,0,0,5,0,4,0,2,0,0,1,0,4,7,3,5,0,0,0,7,3,0,0,0,0,0,0,6,8,0,0,1,2,0,0,1,0,0,0,7,0,8,4,6,0,7,0,9,0,8,0,0,0
    ], [0,0,4,0,5,6,0,0,1,0,0,0,0,1,9,4,8,0,0,0,0,0,7,2,0,0,5,0,8,0,6,3,4,0,7,0,0,0,0,0,0,0,1,0,0,0,0,0,0,2,1,6,0,0,6,0,7,0,0,0,8,0,0,4,9,0,0,6,7,0,3,0,3,0,0,2,0,8,7,0,6
    ], [3,0,0,0,5,7,2,0,4,4,6,0,3,2,0,0,0,0,2,0,0,0,0,6,1,0,0,6,0,0,0,0,0,9,0,3,0,7,0,2,0,3,8,0,0,8,0,5,0,7,0,6,0,2,1,0,2,0,4,0,0,0,6,0,0,0,0,1,0,0,0,8,0,0,6,9,0,8,0,0,0
    ], [0,4,0,8,6,0,0,5,0,5,7,0,1,0,4,0,3,0,6,0,0,7,0,0,0,0,9,0,0,2,0,0,0,0,0,4,0,0,0,9,0,0,0,1,0,4,5,0,0,0,0,0,0,0,0,1,6,4,0,0,0,8,0,9,3,5,0,0,6,0,0,7,8,0,0,0,0,0,6,0,5
    ]]
    const val = Math.floor(Math.random()*9) + 0
    const arr = b[val].slice()
    const a = Array(81).fill(false)
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
      <div> 
        <div className = "gameboard" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
          {this.generateBoard()}
        </div>
        <div className = "buttons">
          <button className = "button-4" onClick = {() => this.handleMarkingsClick(0)} style = {{background:(this.state.isMarking ? "#84CDFA":'white')}}>
            Mark
          </button>
          <button className = "button-4" onClick = {() => this.handleMarkingsClick(2)} style = {{background:(this.state.isNoting ? "#84CDFA":'white')}}>
            Note
          </button>
          <button className = "button-4" onClick = {() => this.handleMarkingsClick(1)}>
            Erase
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
