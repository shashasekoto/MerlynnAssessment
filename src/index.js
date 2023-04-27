import React, { useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Text from 'react';
import $ from 'jquery';


function MyForm() {
  const drinkChoice = [];
  const [drinks, setDrinks] = useState([]);
  const [head, setHead] = useState([]);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/vnd.api+json");
  myHeaders.append("Authorization", "Token 9307bfd5fa011428ff198bb37547f979");
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };


  const fetchDrinks = () => {
    fetch("https://api.up2tom.com/v3/models/58d3bcf97c6b1644db73ad12", requestOptions)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setDrinks(JSON.stringify(data.data.attributes.metadata.prediction.domain.values))
      })
  }

  useEffect(() => {
    fetchDrinks()
  }, [])



  const fetchModel = () => {
    fetch("https://api.up2tom.com/v3/models/58d3bcf97c6b1644db73ad12", requestOptions)
      .then(resp => {
        return resp.json()
      })
      .then(newModel => {
        setHead(JSON.stringify(newModel.data.attributes.name))
      })
  }

  useEffect(() => {
    fetchModel()
  }, [])

  
  
  var newStr = drinks.slice(1);
  var lStr = newStr.slice(0,-1);
  let newDC = (lStr + ",").toString();
  for(var i = 0; i < newDC.length; i++)
  {
    drinkChoice.push(newDC.substring(1,newDC.indexOf(',')-1));
    newDC = newDC.slice(newDC.indexOf(',')+1);
    if(newDC === "")
    {
      break;
    }
  }


  var newH = head.slice(1);
  var hStr = newH.slice(0,-1);
  const arrayDataItems = drinkChoice.map((course) => <li>{course}</li>);




  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const [jResults, setResults] = useState(null);

  function MyModel() {
    var jsonData = JSON.stringify({
      "data": {
          "type": "scenario",
          "attributes": {
              "timestamp": "2017-08-03T08:06:50.777Z",
              "input": {
                "INPUTVAR1": 1.0,
                "INPUTVAR2": "Yes",
                "INPUTVAR3": "Green",
                "INPUTVAR4": 4.0
              },
              "decision": "Yes",
              "meets-confidence": false
          }
        }
      });
      
      var postOptions = {
        method: 'POST',
        headers: myHeaders,
        body: jsonData,
        redirect: 'follow'
      };
      
      fetch("https://api.up2tom.com/v3/decision/58d3bcf97c6b1644db73ad12", postOptions)
        .then(postResp => postResp.json())

        setResults(jsonData);
  }

  return (
    <form>
      <div>
      <div>
        <h1>{hStr}</h1>
      </div> 
        <ul>{arrayDataItems}</ul>
      </div>
      <br/>
      <div>
        <label>
        <input ref={inputRef1} type="text" /> : 1.0
      </label>
      </div>
      <div>
        <label>
        <input ref={inputRef2} type="text" /> : Yes
      </label>
      </div>
      <div>
        <label>
        <input ref={inputRef3} type="text" /> : Green
      </label>
      </div>
      <div>
        <label>
        <input ref={inputRef4} type="text" /> : 4.0
      </label>
      </div>
      <div>
      <button type="button" onClick={MyModel}>
        Submit
      </button>
      </div>
      <br/>
      <div>
      <label>{jResults}</label>
      </div>
      

    </form>
  );

}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyForm />);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
