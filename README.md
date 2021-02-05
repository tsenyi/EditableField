# EditableField
Make a displaying field editable.

## Demo
View [demo on stackblitz](https://stackblitz.com/github/tsenyi/EditableField)

## Usage
### Basic
```jsx
const fruit = 'Orange';
<EditableField 
  defaultValue={fruit} 
  onChange={console.log}
  renderer={({defaultValue,startEditing})=><span onClick={startEditing}>{defaultValue}</span>} 
  editor={({defaultValue, fireValueChange})=><input onChange={(e)=>fireValueChange(e,e.target.value)} 
    onMouseEnter={(e)=>e.target.select()} defaultValue={defaultValue} style={{border:'none'}}/>} 
/>
```


### In List
```jsx
const fruits = ['Apple','Orange'];
fruits.map((fruit, i)=><EditableField key={i}
  defaultValue={fruit} 
  onChange={console.log}
  renderer={({defaultValue,startEditing})=><span onClick={startEditing}>{defaultValue}</span>} 
  editor={({defaultValue, fireValueChange})=><input onChange={(e)=>fireValueChange(e,e.target.value)} 
    onMouseEnter={(e)=>e.target.select()} defaultValue={defaultValue} style={{border:'none'}}/>} 
/>)
```

## Props
|Prop Name|Description|
|---|---|
|`defaultValue`|Initial value displayed to user|
|`renderer`|A function to return React.ReactNode for displaying the value. Content could be raw value, or custom component to enrich the raw value. `{defaultValue,startEditing}=>React.ReactNode`　|
|`editor`|A function to return React.ReactNode, for displaying editor. You can use HTML node, i.e. `input` or cusom React component. Use `fireValueChange` after done editing.`{defaultValue,fireValueChange}=>React.ReactNode`|
|`onChange`|Value to be commited. You can call function with effect in the passed function, i.e. persistence into database.|

## License
MIT
