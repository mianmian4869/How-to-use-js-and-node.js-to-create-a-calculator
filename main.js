let history = [];
const baseUrl = 'http://localhost:3000';
const num1Element = document.getElementById('input1');
const num2Element = document.getElementById('input2');
const resultElement = document.getElementById('result');

function postResult(result) {
    fetch(`${baseUrl}/calculate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({result}) // 将结果作为JSON发送到后端
    })
        .then(response => response.json())
}

function add() {
    let num1 = num1Element.value;
    let num2 = num2Element.value;

    const result = parseFloat(num1) + parseFloat(num2);

    resultElement.innerText = result;
    postResult({input1: num1, input2: num2, result: result, operator: '+'}); // 将结果存入本地的history数组
}

function minus() {
    let num1 = num1Element.value;
    let num2 = num2Element.value;

    let result = parseFloat(num1) - parseFloat(num2);

    resultElement.innerText = result;
    postResult({input1: num1, input2: num2, result: result, operator: '-'});
}

function multiply() {
    let num1 = num1Element.value;
    let num2 = num2Element.value;

    let result = parseFloat(num1) * parseFloat(num2);

    resultElement.innerText = result;
    postResult({input1: num1, input2: num2, result: result, operator: '*'});
}

function divide() {
    let num1 = num1Element.value;
    let num2 = num2Element.value;

    let result = parseFloat(num1) / parseFloat(num2);

    resultElement.innerText = result;
    postResult({input1: num1, input2: num2, result: result, operator: '/'});
}

function mod() {
    let num1 = num1Element.value;
    let num2 = num2Element.value;
    let result = parseFloat(num1) % parseFloat(num2);

    resultElement.innerText = result;
    postResult({input1: num1, input2: num2, result: result, operator: '%'});
}

//修改三
function showHistory() {
    resultElement.innerText = '';
    fetch(`${baseUrl}/history`, {method: 'GET'})  // 发送GET请求到后端
        .then(response => response.json())  // 获取后端返回的结果
        .then(data => {  // 处理返回的结果
            console.log(data)
            data.forEach((item) => {
                let row = document.createElement('p');
                let operator = item.operator;
                row.innerText = `输入 ${item.input1} ${operator} ${item.input2} = ${item.result}`;
                resultElement.appendChild(row);
            });
        });
}
