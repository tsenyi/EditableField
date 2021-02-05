import React from "react";
import styled,{css,Link} from "styled-components";

class EditableField extends React.Component {
  constructor(props){
    super(props)
    this.state = {value:props.defaultValue, editing:false}
    this.startEditing = this.startEditing.bind(this)
    this.onEditorValueChanged = this.onEditorValueChanged.bind(this)
    this.onEditingStopped = this.onEditingStopped.bind(this)
    this.onEditingStopped = this.onEditingStopped.bind(this)
  }
  startEditing(e){
    const rendererRect = e.target.getClientRects()[0]
    // console.log('ef.startEditing',e,this.state,rendererRect)
    const {x,y}=rendererRect
    this.setState({...this.state, editing:true, x, y})
  }
  onEditorValueChanged(e,newValue){
    // console.log('ef.onEditorValueChanged',this.state)
    this.setState({...this.state, value: newValue, editing:false})
    this.props.onChange(newValue)
  }
  onEditingStopped(){
    // console.log('ef.onEditingStopped',this.state)
    this.setState({...this.state, editing:false})
  }
  
  render() {
    const Renderer = wrapRenderer({renderer: this.props.renderer, startEditing: this.startEditing})
    const Editor = wrapEditor({editor: this.props.editor, onEditorValueChanged: this.onEditorValueChanged, onEditingStopped: this.onEditingStopped})
    // console.log('ef.render',Renderer) 
      return (
        <>
        <Renderer defaultValue={this.state.value}/>
        {!this.state.editing?<></>:<Editor defaultValue={this.state.value} top={this.state.y} left={this.state.x-1}/>}
        </>
      );
  }
}
function wrapRenderer({renderer,startEditing,...otherProps}){//HOC
  return class extends React.Component{
    constructor(props){
      super(props)
    }
    render(){
      // console.log('renderer.render')
      // return <div {...otherProps} onClick={startEditing}>{renderer(defaultValue)}</div>
      return <React.Fragment>{renderer({defaultValue:this.props.defaultValue,startEditing})}</React.Fragment>
    }
  }
}
function wrapEditor({editor, onEditorValueChanged, onEditingStopped, ...otherProps}){//HOC
  const Button = styled.button`margin:0px;`
  const StyledEditorWrapper = styled.div`
    /* This renders the buttons above... Edit me! */
    display: inline-block;
    border-radius: 2px;
    background: white;
    color: inherit;
    border: 2px solid grey;
    padding: 1px;
    z-index:9999;
    position: absolute;

    /* The GitHub button is a primary button
    * edit this to target it specifically! */
    ${props => css`
      top: ${props.top}px;
      left: ${props.left}px;
    `}
  `
  return class extends React.Component{
    constructor(props){
      super(props)
      this.state={value: props.defaultValue}
      this.fireValueChange = this.fireValueChange.bind(this)
      this.onCancel = this.onCancel.bind(this)
      this.onSave = this.onSave.bind(this)
      this.handleClickOutside = this.handleClickOutside.bind(this)
      this.onKeyPressed = this.onKeyPressed.bind(this)
      this.wrapperRef = React.createRef()
    }
    fireValueChange(e,newValue){
      // console.log('editor.fireValueChange',newValue)
      if(this.state.value !== newValue)
        this.setState({value: newValue})
    }
    onCancel(e){
      // console.log('editor.onCancel',this.state,this.props.defaultValue)
      this.setState({value: this.props.defaultValue})
      onEditingStopped(e)
      e.preventDefault()
    }
    onSave(e){
      // console.log('editor.onSave',this.state,this.props.defaultValue)
      onEditorValueChanged(e,this.state.value)
      e.preventDefault()
    }
    /**
     * if clicked on outside of element
     */
    handleClickOutside(e) {
      // console.log('handleClickSomewhere',this.wrapperRef.current, e.target)
      if (this.wrapperRef && this.wrapperRef.current!=null && 
        this.wrapperRef.current!=e.target && 
        !this.wrapperRef.current.contains(e.target)) {
          // console.log('You clicked outside of me!');
          this.onCancel(e)
      }
    }
    /**
     * Escape - cancel editing
     * Enter - save changes
     */
    onKeyPressed(e) {
      // console.log('onKeyPressed', e.keyCode)
      const isEnter = e.keyCode===13
      const isEscape = e.keyCode===27
      if(isEnter){this.onSave(e)}
      else if(isEscape){this.onCancel(e)}
    }
    componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
    render(){
      // console.log('editor.render',this.state)
      // const x = <div ref={this.wrapperRef} tabIndex={-1} onKeyDown={this.onKeyPressed} style={{zIndex:9999, position:'absolute', backgroundColor:'white',top:this.props.top, left:this.props.left}}>
      //     {editor(this.props.defaultValue, this.fireValueChange)}
      //     <button onClick={this.onSave}>OK</button>
      //     <button onClick={this.onCancel}>Cancel</button>
      //   </div>
      return (
        <StyledEditorWrapper ref={this.wrapperRef} tabIndex={-1} onKeyDown={this.onKeyPressed} top={this.props.top} left={this.props.left}>
          {editor({defaultValue:this.props.defaultValue, fireValueChange:this.fireValueChange})}
          <Button onClick={this.onSave}>OK</Button>
          <Button onClick={this.onCancel}>Cancel</Button>
        </StyledEditorWrapper>
      )
    }
  }
}
export default EditableField