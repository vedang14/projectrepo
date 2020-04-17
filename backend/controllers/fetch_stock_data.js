exports.fetch_stock = async function fetchstockdatapi(company_name){
  var arr = [];
  var tickerMap = {
  "apple" : "AAPL",
  "microsoft" : "MSFT",
  "ibm" : "IBM",
  "google" : "GOOG",
  "facebook" : "FB",
  "snapchat" : "SNAP",
  "amazon" : "AMZN"
  };
  var stockticker = tickerMap[company_name.toLowerCase()];
   let requestResponse = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockticker}&outputsize=compact&apikey=VME7LOCQWYTM7N9F`)
  .then(res => res.json())
  .then(result => {
    console.log("beforeeeeeeeee");
//complete this
        console.log(result["Time Series (Daily)"][Object.keys(result["Time Series (Daily)"])[0]])
        arr.push(result["Time Series (Daily)"][Object.keys(result["Time Series (Daily)"])[0]]["1. open"])
        arr.push(result["Time Series (Daily)"][Object.keys(result["Time Series (Daily)"])[0]]["2. high"])
        arr.push(result["Time Series (Daily)"][Object.keys(result["Time Series (Daily)"])[0]]["3. low"])
        arr.push(result["Time Series (Daily)"][Object.keys(result["Time Series (Daily)"])[0]]["4. close"])
        arr.push(result["Time Series (Daily)"][Object.keys(result["Time Series (Daily)"])[0]]["5. volume"])
      //  console.log(arr);
        return arr;
  })
  .catch(err => console.error(err));
  return requestResponse
}
