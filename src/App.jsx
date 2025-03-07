import { useState } from "react"
import InputBox from "./components/InputBox"
import useCurrency from "./hooks/useCurrency"

 
function App() {
  const [amountGiven, setAmountGiven] = useState(0)
  const [amountConverted, setamountConverted] = useState(0)
  const [fromCurrency, setfromCurrency] = useState("usd")
  const [toCurrency, settoCurrency] = useState("inr")

  const currencyData = useCurrency(fromCurrency)
  console.log(currencyData);
  const option = Object.keys(currencyData)

  const swap = () => {
    setfromCurrency(toCurrency)
    settoCurrency(fromCurrency)
    setamountConverted(amountGiven)
    setAmountGiven(amountConverted)
  }
  const convert = () => {
    setamountConverted(amountGiven * currencyData[toCurrency])
  }

  return (
<>
    <div
    className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
    style={{
      backgroundImage : `url("https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`
    }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount = {amountGiven}
                currenyOptions = {option}
                onAmountChange = {(amount) => setAmountGiven(amount)}
                onCurrencyChange = {(currency) => setfromCurrency(currency)}
                selectCurrency= {fromCurrency}

              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                currenyOptions = {option}
                amount={amountConverted}
                onCurrencyChange = {(currency) => settoCurrency(currency)}
                amountDisable
                selectCurrency={toCurrency}
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg" onClick={convert}>
              Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default App
