var ticket
var loadedOrder
var allOrders
var orderItemsG
var buttons = []
var scrollLocY

var myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json')
var data = {}
const URL = '/orders';
fetch(URL, {
    method: 'POST',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify(data)
}).then((res) => res.json()).then((data) => {
    allOrders = data['orderData']
    orderItemsG = data['orderItemsG']
    var table = document.getElementById("orders")
    var total = 0
    table.innerHTML += "<tr><th>Order #<br><p>(Click to open order)</p></th><th>Order Name</th><th>Order Total</th></tr>"
    for (var i = 0; i < allOrders.length; i++) {
        for (var j = 0; j < allOrders[i][2].length; j++) {
            total += (allOrders[i][2][j] * orderItemsG[j][1])
        }
        table.innerHTML += "<tr class='orderRow'>" +
            "<td class='orderCol'><div class='orderBox' id='order-" + allOrders[i][0] + "'>" + allOrders[i][0] + "</div></td>" +
            "<td class='orderCol'>" + allOrders[i][1] + "</td>" +
            "<td class='orderCol'>$" + total + "</td>" +
            "<td class='orderCol'><div class='showDetail' id='sd-" + allOrders[i][0] + "'>Show Details</div></td>" +
            "</tr>"
        total = 0
    }

    for (var i = 0; i < allOrders.length; i++) {
        var orderNumber = allOrders[i][0]
        buttons.push(document.getElementById("order-" + orderNumber).onclick = function () {
            var orderNumber = (this.id.slice(this.id.indexOf("-") + 1, this.id.length))
            for (var i = 0; i < allOrders.length; i++) {
                if (allOrders[i][0] == orderNumber) {
                    bringUpOrder(allOrders[i])
                }
            }
        })
    }

    for (var i = 0; i < allOrders.length; i++) {
        var orderNumber = allOrders[i][0]
        buttons.push(document.getElementById("sd-" + orderNumber).onclick = function () {
            var orderNumber = (this.id.slice(this.id.indexOf("-") + 1, this.id.length))
            for (var i = 0; i < allOrders.length; i++) {
                if (allOrders[i][0] == orderNumber) {
                    showDetails(allOrders[i])
                }
            }
        })
    }

    run()
})

document.getElementById("search").onclick = function () {
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
        bringUpOrder(loadedOrder['orderData'])
    })
}

document.getElementById("newOrder").onclick = function () {
    bringUpOrder(null)
}














function bringUpOrder(data) {
    console.log(data)
}

function showDetails(data) {
    scrollLocY = window.scrollY
    var ordering = document.getElementById("ordering")
    ordering.hidden = true
    var showingDetails = document.getElementById("showingDetails")
    showingDetails.hidden = false
    var table = document.getElementById("infoo")
    table.innerHTML = ""
    for (var i = 0; i < data[2].length; i++) {
        if (data[2][i] != 0) {
            table.innerHTML += ('<tr><td>' + orderItemsG[i][0] + ":</td><td>" + data[2][i] + "</td></tr>")
        }
    }

    document.getElementById("close").onclick = function () {
        var ordering = document.getElementById("ordering")
        ordering.hidden = false
        var showingDetails = document.getElementById("showingDetails")
        showingDetails.hidden = true
        window.scrollTo(0, scrollLocY)
    }
}





async function run() {
    while (true) {
        console.log("reloading")
        await sleep(15000)
        if (document.getElementById("ordering").hidden == false) {
            location.reload()
        }
    }
}


const sleep = ms => new Promise(r => setTimeout(r, ms));