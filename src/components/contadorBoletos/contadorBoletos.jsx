import React from 'react'
import './contadorBoletos.scss'


const ContadorBoletos= ( {handleMinus, handlePLus, value} ) => {
 
  return (
    <div className='contador'>
    <button className='contador__menos' onClick={handleMinus}>-</button>
      <span className='contador__valor'>{value}</span>
      <button className='contador__mas' onClick={handlePLus}>+</button>
    </div>
  )
}

export default ContadorBoletos