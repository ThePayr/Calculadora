import React, { useState, useEffect } from 'react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [equation, setEquation] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isRadians, setIsRadians] = useState(true);
  const [showScientific, setShowScientific] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleNumber = (num: string) => {
    if (display === '0') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (operator: string) => {
    setEquation(display + operator);
    setDisplay('0');
  };

  const handleEqual = () => {
    try {
      const result = eval(equation + display);
      setDisplay(result.toString());
      setEquation('');
    } catch (error) {
      setDisplay('Error');
      setEquation('');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleScientificOperation = (operation: string) => {
    try {
      let result = 0;
      const num = parseFloat(display);
      
      switch(operation) {
        case 'sin':
          result = isRadians ? Math.sin(num) : Math.sin(num * Math.PI / 180);
          break;
        case 'cos':
          result = isRadians ? Math.cos(num) : Math.cos(num * Math.PI / 180);
          break;
        case 'tan':
          result = isRadians ? Math.tan(num) : Math.tan(num * Math.PI / 180);
          break;
        case 'sqrt':
          result = Math.sqrt(num);
          break;
        case 'square':
          result = Math.pow(num, 2);
          break;
        case 'cube':
          result = Math.pow(num, 3);
          break;
        case 'log':
          result = Math.log10(num);
          break;
        case 'ln':
          result = Math.log(num);
          break;
        case 'pi':
          result = Math.PI;
          break;
        case 'e':
          result = Math.E;
          break;
        case '1/x':
          result = 1 / num;
          break;
        case 'abs':
          result = Math.abs(num);
          break;
      }
      setDisplay(result.toString());
    } catch (error) {
      setDisplay('Error');
    }
  };

  const buttonBase = "w-full h-14 text-xl font-medium rounded-lg transition-all duration-200 active:scale-95 hover:brightness-110";
  const numberButton = `${buttonBase} ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'} shadow-sm`;
  const operatorButton = `${buttonBase} ${isDarkMode ? 'bg-gray-700 text-orange-500' : 'bg-gray-100 text-orange-500'} font-bold`;
  const scientificButton = `${buttonBase} ${isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-100 text-blue-600'} text-sm`;

  return (
    <div className={`relative w-[360px] ${isDarkMode ? 'bg-black' : 'bg-gray-50'} rounded-2xl p-6 shadow-xl ${isDarkMode ? 'border border-gray-800' : 'border border-gray-200'}`}>
      <div className="flex justify-between mb-4">
        <button 
          onClick={() => setShowScientific(!showScientific)} 
          className={`px-4 py-2 rounded-lg ${
            isDarkMode 
              ? 'bg-gray-700 text-blue-300 hover:bg-gray-600' 
              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
          } transition-colors duration-200 text-sm`}
        >
          {showScientific ? '123' : 'f(x)'}
        </button>
        <button 
          onClick={toggleTheme} 
          className={`px-4 py-2 rounded-lg ${
            isDarkMode 
              ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          } transition-colors duration-200`}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
      <div className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} p-4 rounded-xl mb-4 shadow-inner border`}>
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} min-h-[20px] mb-1 text-right`}>{equation}</div>
        <div className={`text-3xl ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} font-bold text-right overflow-hidden`}>{display}</div>
      </div>
      
      {showScientific && (
        <div className="grid grid-cols-4 gap-2 mb-3">
          <button onClick={() => handleScientificOperation('sin')} className={scientificButton}>sin</button>
          <button onClick={() => handleScientificOperation('cos')} className={scientificButton}>cos</button>
          <button onClick={() => handleScientificOperation('tan')} className={scientificButton}>tan</button>
          <button onClick={() => setIsRadians(!isRadians)} className={scientificButton}>{isRadians ? 'RAD' : 'DEG'}</button>
          
          <button onClick={() => handleScientificOperation('sqrt')} className={scientificButton}>√</button>
          <button onClick={() => handleScientificOperation('square')} className={scientificButton}>x²</button>
          <button onClick={() => handleScientificOperation('cube')} className={scientificButton}>x³</button>
          <button onClick={() => handleScientificOperation('1/x')} className={scientificButton}>1/x</button>
          
          <button onClick={() => handleScientificOperation('log')} className={scientificButton}>log</button>
          <button onClick={() => handleScientificOperation('ln')} className={scientificButton}>ln</button>
          <button onClick={() => handleScientificOperation('pi')} className={scientificButton}>π</button>
          <button onClick={() => handleScientificOperation('e')} className={scientificButton}>e</button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-3 grid grid-cols-3 gap-3">
          <button onClick={handleClear} className={`${buttonBase} ${isDarkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white`}>C</button>
          <button onClick={() => handleOperator('/')} className={operatorButton}>÷</button>
          <button onClick={() => handleOperator('*')} className={operatorButton}>×</button>
          
          <button onClick={() => handleNumber('7')} className={numberButton}>7</button>
          <button onClick={() => handleNumber('8')} className={numberButton}>8</button>
          <button onClick={() => handleNumber('9')} className={numberButton}>9</button>
          
          <button onClick={() => handleNumber('4')} className={numberButton}>4</button>
          <button onClick={() => handleNumber('5')} className={numberButton}>5</button>
          <button onClick={() => handleNumber('6')} className={numberButton}>6</button>
          
          <button onClick={() => handleNumber('1')} className={numberButton}>1</button>
          <button onClick={() => handleNumber('2')} className={numberButton}>2</button>
          <button onClick={() => handleNumber('3')} className={numberButton}>3</button>
          
          <button onClick={() => handleNumber('0')} className={`${numberButton} col-span-2`}>0</button>
          <button onClick={() => handleNumber('.')} className={numberButton}>.</button>
        </div>
        
        <div className="grid grid-rows-5 gap-3">
          <button onClick={() => handleOperator('-')} className={operatorButton}>-</button>
          <button onClick={() => handleOperator('+')} className={operatorButton}>+</button>
          <button onClick={handleEqual} className={`${buttonBase} ${isDarkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white row-span-3 h-full`}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
