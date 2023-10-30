import React from 'react';

const NumeroSeguro = ({ numeroLargo }) => {
    // Convertir el número a cadena
    const numeroCadena = numeroLargo.toString();
  
    // Obtener los últimos 4 caracteres
    const ultimos4Digitos = numeroCadena.slice(-4);
  
    // Crear una cadena con asteriscos para los dígitos anteriores
    const asteriscos = '*'.repeat(numeroCadena.length - 4);
  
    // Combinar los asteriscos con los últimos 4 dígitos
    const numeroSeguro = asteriscos + ultimos4Digitos;
  
    return (
      <div>
         {numeroSeguro}
      </div>
    );
  };
  
  export default NumeroSeguro;