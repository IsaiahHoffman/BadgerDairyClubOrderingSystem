var orderItems = document.getElementById("orderItems").innerHTML
var orderData = []
var buttons = []
var i = 0
var j = -1
while (orderItems.indexOf(",") != -1) {
    if (i % 4 == 0) {
        orderData.push([])
        j++
    }
    var newVal = orderItems.slice(0, orderItems.indexOf(","))
    if (i % 4 == 3) {
        if (newVal == "true") {
            newVal = true
        } else {
            newVal = false
        }
    }

    orderData[j].push(newVal);
    orderItems = orderItems.slice(orderItems.indexOf(",") + 1, orderItems.length);
    i++
}
var newVal = orderItems
if (newVal == "true") {
    newVal = true
} else {
    newVal = false
}
orderData[orderData.length - 1].push(newVal);
// console.log(orderData)




var bodyTag = document.getElementById("active")
for (var i = 0; i < orderData.length; i++) {
    bodyTag.innerHTML += "<tr><td>" + orderData[i][0] + "</td>" + "<td id='" + orderData[i][0] + "name' class='button'>" + orderData[i][3] + "</td></tr>"
}

for (var i = 0; i < orderData.length; i++) {
    buttons.push(document.getElementById(orderData[i][0] + "name").onclick = function () {
        var truth
        if (this.innerHTML == "true") {
            this.innerHTML = false
            truth = false
        } else {
            this.innerHTML = true
            truth = true
        }

        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        var data = {
            truth: truth,
            id: this.id.slice(0, -4)
        }
        const URL = '/settings';
        fetch(URL, {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(data)
        }).then((res) => res.json()).then((data) => {
            
        })
    })
}