/**
 * Ordena los números en orden ascendente
 * @param {Array} numbers
 * @param {Array} checked
 * @returns
 */
function ordenarAscendente(numbers, checked) {
    const selectedNumbers = numbers
      .map((num, index) => (checked[index] ? parseFloat(num) : null))
      .filter((num) => num !== null);
  
    return selectedNumbers.sort((a, b) => a - b);
  }
  
  /**
   * Ordena los números en orden descendente
   * @param {Array} numbers
   * @param {Array} checked
   * @returns 
   */
  function ordenarDescendente(numbers, checked) {
    const selectedNumbers = numbers
      .map((num, index) => (checked[index] ? parseFloat(num) : null))
      .filter((num) => num !== null);
  
    return selectedNumbers.sort((a, b) => b - a);
  }
  
  module.exports = {
    ordenarAscendente,
    ordenarDescendente
  };
  