import React from "react";
import ReactDOM from "react-dom";

import EditableField from "./EditableField";

function Demo(props){
  const data = [
    {name:'John', age:30, marital: 'Single'},
    {name:'Resig', age:35, marital: 'Married'},
    {name:'Marry', age:30, marital: 'Married with kids'},
  ]
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Marital</th>
        </tr>
      </thead>
      <tbody>
      {data.map((person,i)=>{
        return <tr key={i}>
          {['name','age','marital'].map((prop,j)=>{
            return (<td key={j}>
            <EditableField 
              defaultValue={person[prop]} 
              renderer={({defaultValue,startEditing})=><span onClick={startEditing}>{defaultValue}</span>} 
              editor={({defaultValue, fireValueChange})=><input onChange={(e)=>fireValueChange(e,e.target.value)} onMouseEnter={(e)=>e.target.select()} defaultValue={defaultValue} size={String.valueOf(defaultValue||'').length+3}/>} 
              onChange={(newValue)=>console.log(j,newValue)}/>
            </td>)}
          )}
        </tr>
      })}
      </tbody>
    </table>
  )
}

ReactDOM.render(<Demo />, document.getElementById("root"));
