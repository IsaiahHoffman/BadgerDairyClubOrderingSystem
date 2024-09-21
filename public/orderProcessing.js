var ticket
var loadedOrder
document.getElementById("order").onclick = function () {
    ticket = document.getElementById("ticket").value
    
    var myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/json')
    var data = {
        ticket: ticket,
    }
    const URL = '/orderLookUp';
            fetch(URL, {
                method: 'POST',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: JSON.stringify(data)
            }).then((res) => res.json()).then((data) => {
                loadedOrder = data
            })
}

