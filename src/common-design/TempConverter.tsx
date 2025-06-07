

export default function TempConverter() {

  const enterDegree = 'F';

  function convertFromFahrenheitToCelcius(degrees: number) {
    return (degrees - 32) * 5 / 9;
  }

  function convertFromCelciusToKelvin(degrees: number) {
    return degrees + 273.15;
  }

  function convertFromKelvinToAbsolute(degrees: number) {
    const maxAbsolute = 1;
    const maxKelvin = 1.416808 * Math.pow(10, 32)
    return maxAbsolute * degrees / maxKelvin;
  }

  function convertToAbsolute(degrees: number, scale: string) {
    let num = degrees;
    
    if (scale === 'F') {
      num = convertFromFahrenheitToCelcius(num);
    }
    if (scale !== 'K') {
      num = convertFromCelciusToKelvin(num);
    }
    num = convertFromKelvinToAbsolute(num);

    return `${num} °A`;
  }

  function absoluteToValuesText() {
    const absolute = 0.000000000000000000000000000002;
    const kelvin = absolute * 1.416808 * Math.pow(10, 32);
    const celcius = kelvin - 273.15;
    const fahrenheit = celcius * 9 / 5 + 32;

    return `Absolute zero is ${absolute} °A, ${kelvin} K, ${celcius} °C, or ${fahrenheit} °F.`;
  }


  // Make sure keypress only allows numbers, backspace, negative, arrow keys, and one decimal.
  function handleKeypress(event: React.KeyboardEvent<HTMLInputElement>) {
    const key = event.key;
    if (key === 'Backspace') { return; }
    if (key === '-') { return; }
    if (key === 'ArrowUp') { return; }
    if (key === 'ArrowDown') { return; }
    if (key === 'ArrowLeft') { return; }
    if (key === 'ArrowRight') { return; }
    if (key === '.') {
      const input = event.currentTarget.value;
      if (input.includes('.')) {
        event.preventDefault();
      }
      return;
    }
    if (!/^\d$/.test(key)) {
      event.preventDefault();
    }
  }

  function convertInputToAbsolute(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;
    const result = document.querySelector('.absolute-result') as HTMLSpanElement;
    if (input === '') {
      result.innerText = 'type a number to convert';
      return;
    }
    const num = parseFloat(input);
    if (isNaN(num)) {
      result.innerText = 'Not a number';
    } else {
      result.innerText = `${convertToAbsolute(num, enterDegree)} °A`;
    }
  }

  return (<>
    <div>
      <input type="number" className="absolute-input" 
      step="0.5" 
      onChange={convertInputToAbsolute} onKeyDown={handleKeypress}></input>°{enterDegree}
      
      &nbsp;&nbsp;&nbsp;
      <span className="absolute-result">type a number to convert</span>
    </div>
    <div>
      Common tempuratures - <br />
      Freezing 32°F: {convertToAbsolute(32, 'F')}; <br />
      Cold 50°F: {convertToAbsolute(50, 'F')}; <br />
      Room temp 70°F: {convertToAbsolute(70, 'F')}; <br />
      Hot 90°F: {convertToAbsolute(90, 'F')}; <br />
      Human body 98.6°F: {convertToAbsolute(98.6, 'F')}; <br />
      Boiling 212°F: {convertToAbsolute(212, 'F')}; <br />
    </div>
    <div>{absoluteToValuesText()}</div>
  </>);
}