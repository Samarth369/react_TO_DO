import { useEffect, useRef, useState } from 'react'
import './App.css'


function App() {
  
  const [ list , setlist ] = useState([])
  
  const inref = useRef()

  function List ({ id , text }) {

    const li = useRef()
    const editref = useRef()

    const [ line , setline ] = useState(false)
    const [ Edit , setEdit ] = useState(false)
    const [ litext , setlitext ] = useState(text)

    useEffect( () => {
      if (!Edit) {
      {line ? 
      li.current.style.textDecoration ="line-through" 
      :
      li.current.style.textDecoration = "none"}
    }} , [line , Edit ]) 

    function changestate () {
      setline(x => !x)
    }

    function deletit () {
      let newarr = list.filter((x , index) => index != id)
      setlist(newarr)
    }

    function handle_edit () {
      setEdit(x => !x)
    }
    
    useEffect( () => {
      if(li.current) {
        let livalue = li.current.innerText
        setlitext(livalue)
      }
    } , [])

    useEffect( () => {
      console.log(window.innerWidth); 
    } , [])


    useEffect( () => {

      if(li.current) {
        li.current.innerText = litext
      }

      if (editref.current) {
        editref.current.value = litext
        let newtext = editref.current.value
      }
    } , [Edit])

    return (
      <>
      <div className='list-block' > <input type="checkbox" className='cli' onClick={changestate}/> {Edit ? <input type='text' className='editin' ref={editref} onChange={ (e) => {
        setlitext(e.target.value)
      }}/> : <li ref={li}>{litext}</li> } <div className='edit' onClick={handle_edit}>{Edit ? "Done" : "Edit"}</div> <button onClick={deletit}>Del</button> </div>
      </>
    )
  }

  useEffect( () => {
    inref.current.focus()
  } , [])

  function addtolist () {
    let val = inref.current.value
    if (val != "") {
      setlist([ ...list , val ])
      inref.current.value = null
    }
  }

  return (
    <>
      <div className="to-do-in-block">
      <input type="text" ref={inref} onKeyDown={(e) => {
        if (e.key == "Enter") {
          addtolist()
        }
      }}/>
      <button onClick={addtolist}>ADD</button>
      </div>

      <div className="to-do-list-block">
        <ul>
          {list.map((( x , index ) => <List key={index} id={index} text={x} />))}
        </ul>
      </div>
    </>
  )
}

export default App  
