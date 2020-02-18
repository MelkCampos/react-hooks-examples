import React, { useState, useEffect, useMemo, useCallback } from 'react'
 
function App() {

  const [ techs, setTech ] = useState([]) // array
  const [ newTechs, setNewTechs ] = useState('') // string vazia

  const handleAdd = useCallback(() => {
    setTech([ ...techs, newTechs ])

    // limpar input apos adicionar um valor no 'input'
    setNewTechs('')

  }, [techs, newTechs]) // array de depedencias | depedendcias que a variavel reutiliza

// -------------------------------------------- # -----------------------------------

  // A função "handleAdd" apenas será recriada na memória
  // quando as variáveis [ "techs", "newTechs" ] forem alteradas

  // isso irá ajudar com um melhor desempenho e economia de memória
 // dentro do JavaScript
 
// -------------------------------------------- # -----------------------------------


  // buscas de informações no ArrayList. Ira executar apenas uma única vez
  useEffect(() => {

    const storageTech = localStorage.getItem('techs')

    if(storageTech) {
      setTech(JSON.parse(storageTech))
    }

  }, [])


  // 'useEffect' será executado toda vez que o valor de 'techs', ser alterado
  useEffect(() => {

    localStorage.setItem('techs', JSON.stringify(techs))
  }, [ techs ])

  // sera executada sempre que houver alterações na quantidade de items no Array
  // useMemo usando em casos de calculos mais complexos

  const techSize = useMemo(() => techs.length, [techs])
    
  return (
  <>
    <ul>
      {techs.map(tech => (

          <li key={tech}>{tech}</li>
      ))}
    </ul>                             
        <strong>you have {techSize} technologies</strong> <br />                 
                                                                {/* valor do </inpu> */}
        <input value={ newTechs } onChange={ event => setNewTechs(event.target.value) } />
        <button type="button" onClick={ handleAdd }> add </button>
    </>
  )
}

export default App