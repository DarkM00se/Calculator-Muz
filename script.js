const calcData = [//calculator data, array that includes the calculator button numbers
    { id: "clear", value: "AC" },//AC=all clear
    { id: "divide", value: "/" },
    { id: "multiply", value: "x" },
    { id: "seven", value: 7 },
    { id: "eight", value: 8 },
    { id: "nine", value: 9 },
    { id: "subtract", value: "-" },
    { id: "four", value: 4 },
    { id: "five", value: 5 },
    { id: "six", value: 6 },
    { id: "add", value: "+" },
    { id: "one", value: 1 },
    { id: "two", value: 2 },
    { id: "three", value: 3 },
    { id: "equals", value: "=" },
    { id: "zero", value: 0 },
    { id: "decimal", value: "." },
  ];
  
  const operators = ["AC", "/", "x", "+", "-", "="];//calculator array that contains the operators
  
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];//array with the nuumbers

const Display=({input,output})=>(
//functional display component. this will display the numbers put into the calculator for caluclation
    <div className="output">
    <span className="result">{output}</span>
    <span id="display" className="input">{input}</span>
    </div>
);

const Key=({keyData:{id, value},handleInput})=>( //represents key value button
<button id={id} onClick={()=> handleInput(value)}> 
    {value}                                         
    </button>//returns the value clicked


);

const Board= ({handleInput})=>(                    //keyboard component for holding the array data

<div className= "keys">
    {calcData.map((key)=>(//passing the calc data to the key property so that each key press is linked to the id in the array
        <Key key ={key.id} keyData={key} handleInput={handleInput}/>
    ))}
</div>



);

  const App=()=>{
    const [input, setInput]=React.useState("0")//move props down to display
    const [output, setOutput]=React.useState("")
   const[calculatorData, setCalculatorData]=React.useState("")
   
   const handleSubmit=()=>{
    console.log=("handleSubmit", calculatorData)//console data
const total =eval(calculatorData)
setInput(`${total}`)
setOutput(`${total}`)
setCalculatorData(`${total}`)
}


   const handleClear=()=>{
    setInput ("0")
    setOutput("")
    setCalculatorData("")
   }
   
   const handleNumbers=(value)=>{
    
    if(!calculatorData.length){ ///consitions to return 1  0 value instead of multiple 0s 
        setInput(`${value}`);
        setCalculatorData(`${value}`);
    }
    else{//
        
        if(value === 0 &&(calculatorData === "0"|| input ==="0"))
        {setCalculatorData(`${calculatorData}`);


}
else{ 
    const lastChar =calculatorData.charAt(calculatorData.length-1);//charAt helps detect characters in the strings inputed
    const isLastCharOperator=
    lastChar === "*" || operators.includes(lastChar);
    
    
    setInput(isLastCharOperator ? `${value}` : `${input}${value}`);
    setCalculatorData(`${calculatorData}${value}`);
}
}
   }

   const dot=()=>{
    const lastChar = calculatorData.charAt(calculatorData.length - 1);
    if (!calculatorData.length) {
      setInput("0.");
      setCalculatorData("0.");
    } else {
      if (lastChar === "*" || operators.includes(lastChar)) {
        setInput("0.");
        setCalculatorData(`${calculatorData} 0.`);
      } else {
        setInput(
          lastChar === "." || input.includes(".") ? `${input}` : `${input}.`
        );
        const formattedValue =
          lastChar === "." || input.includes(".")
            ? `${calculatorData}`
            : `${calculatorData}.`;
        setCalculatorData(formattedValue);
      }
    }}

   const handleOperators=(value)=>{
    if (calculatorData.length) {
        setInput(`${value}`);
        const beforeLastChar = calculatorData.charAt(calculatorData.length - 2);
  
        const beforeLastCharIsOperator =
          operators.includes(beforeLastChar) || beforeLastChar === "*";
  
        const lastChar = calculatorData.charAt(calculatorData.length - 1);
        
        const lastCharIsOperator = operators.includes(lastChar) || lastChar === "*";
        
        const validOp = value === "x" ? "*" : value;
        if (
          (lastCharIsOperator && value !== "-") ||
          beforeLastCharIsOperator && lastCharIsOperator
        ) {
          if (beforeLastCharIsOperator) {
            const updatedValue = `${calculatorData.substring(
              0,
              calculatorData.length - 2
            )}${value}`;
            setCalculatorData(updatedValue);
          } else {
            setCalculatorData(`${calculatorData.substring(0, calculatorData.length - 1)}${validOp}`);
          }
        } else {
          setCalculatorData(`${calculatorData}${validOp}`);
        }
      }

   }
   

   const handleInput=(value)=>{    ///value of the button
const number= numbers.find((num)=>num === value);
const operator= operators.find((op)=>op === value);//if value exists..it returns value or undefined if not

switch (value)//switch statments handles the input matching the correct value
{case "=": handleSubmit();
break;

case "AC":handleClear();
break;

case number: handleNumbers(value);
break;

case ".": dot(value);
break;

case operator: handleOperators(value);
break;
default:break;


}
    //console.log({value})
        }
    const handleOutput=()=>{
    setOutput(calculatorData)

    }
   
    React.useEffect(()=>{
     handleOutput()

   }, [calculatorData]
   )
   
    return( 
        <div className="container">
            <div className="calculator">
 <Display input={input} output={output}/>
    <Board handleInput={handleInput}/>
    </div>
    </div>
   );


}



ReactDOM.render(<App/>, document.getElementById("app"))
