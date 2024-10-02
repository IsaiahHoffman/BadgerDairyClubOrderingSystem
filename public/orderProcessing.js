var ticket
var loadedOrder
var allOrders
var orderItemsG
var buttons = []
var scrollLocY
var coupons
var countsCoupons = []
var countsCart = []
var cartDiscount = 0
var cartTotal = 0

document.getElementById("cartTotal").innerHTML = 0
document.getElementById("cartDiscount").innerHTML = 0
document.getElementById("cash").innerHTML = 0
document.getElementById("card").innerHTML = 0

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
    if (allOrders != null) {
        orderItemsG = data['orderItemsG']
        coupons = data['coupons']
        for (var j = 0; j < coupons.length; j++) {
            countsCoupons.push(0)
        }
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
    } else {
        orderItemsG = data['orderItemsG']
        coupons = data['coupons']
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
        if (loadedOrder['orderData'] == null) {
            alert("No such order/Order Completed Already")
            location.reload()
        } else {
            bringUpOrder(loadedOrder['orderData'])
        }
    })
}

document.getElementById("newOrder").onclick = function () {
    bringUpOrder(null)
}














async function bringUpOrder(orderData) {
    countsCart = []
    for (var j = 0; j < orderItemsG.length; j++) {
        countsCart.push(0)
    }
    if (orderData != null) {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        var data = {
            orderNumber: orderData[0]
        }
        const URL = '/of';
        await fetch(URL, {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(data)
        }).then((res) => res.json()).then((data) => {
            loadedOrder = data['orderData']
            if (loadedOrder != null) {
                countsCart = loadedOrder[2]
                var total = 0
                for (var j = 0; j < countsCart.length; j++) {
                    countsCart[j] = parseInt(countsCart[j])
                    total += (countsCart[j] * orderItemsG[j][1])
                }
                cartTotal = total
                document.getElementById("cartTotal").innerHTML = total
                document.getElementById("cash").innerHTML = parseFloat(cartTotal - cartDiscount).toFixed(2)
                document.getElementById("card").innerHTML = parseFloat((cartTotal - cartDiscount) * 0.026 + .1 + (cartTotal - cartDiscount)).toFixed(2)
            } else {
                alert("Order already completed")
                location.reload()

            }
        })
    }

    scrollLocY = window.scrollY
    window.scrollTo(0, 0)
    var ordering = document.getElementById("ordering")
    ordering.hidden = true
    var showingDetails = document.getElementById("showingDetails")
    showingDetails.hidden = true
    var bringUpOrder = document.getElementById("bringUpOrder")
    bringUpOrder.hidden = false

    var couponsT = document.getElementById("coupons")
    couponsT.innerHTML = ""
    for (var i = 0; i < coupons.length; i++) {
        couponsT.innerHTML = couponsT.innerHTML + "<tr>" +
            "<td class='left'><div>" + coupons[i][0] + "</div>" +
            "<div>Value: $" + coupons[i][1] + "</div>" +
            "<table id='decInc'><tr>" +
            "<td class='decrease' id='" + coupons[i][0] + "dec'><div class='button'>-</div></td>" +
            "<td class='number' id='" + coupons[i][0] + "Num'>0</td>" +
            "<td class='increase' id='" + coupons[i][0] + "inc'><div class='button'>+</div></td>" +
            "</tr></table>" +
            "</td>" +
            "<td><img class='couponImg' src='./Sponsors/Coupons/" + coupons[i][2] + "'></div></td>" +
            "</tr>"
    }
    var content = ""
    for (var i = 0; i < orderItemsG.length; i++) {
        content = content +
            "<p class='foodName'>" + orderItemsG[i][0] + "</p>" +

            "<table class='orderItemTable'>" +
            "<tr>" +
            "<td class='foodItem'>"
        if (orderItemsG[i][2] != "NA") {
            content = content + "<img class='foodImage' src='./FoodItems/" + orderItemsG[i][2] + "'>"
        }
        content = content + "</td>" +
            "<td class='decrease' id='" + orderItemsG[i][0] + "dec'><div class='button2'>-</div></td>" +
            "<td class='number' id='" + orderItemsG[i][0] + "Num'>" + countsCart[i] + "</td>" +
            "<td class='increase' id='" + orderItemsG[i][0] + "inc'><div class='button2'>+</div></td>" +
            "<td class='price'>" + "$" + orderItemsG[i][1] + "</td>" +
            "</tr>" +
            "</table>"

        "$" + orderItemsG[i][1]
    }

    document.getElementById("menuItems").innerHTML = content

    for (var j = 0; j < coupons.length; j++) {
        countsCoupons[j] = 0
    }

    for (var i = 0; i < coupons.length; i++) {
        // set up increase buttons
        buttons.push(document.getElementById(coupons[i][0] + "inc").onclick = function () {
            for (var j = 0; j < coupons.length; j++) {
                if (coupons[j][0] + "inc" == this.id) {
                    countsCoupons[j] += 1
                    document.getElementById(coupons[j][0] + "Num").innerHTML = countsCoupons[j]
                    cartDiscount += parseInt(coupons[j][1])
                    document.getElementById("cartDiscount").innerHTML = cartDiscount
                    document.getElementById("cash").innerHTML = parseFloat(cartTotal - cartDiscount).toFixed(2)
                    document.getElementById("card").innerHTML = parseFloat((cartTotal - cartDiscount) * 0.026 + .1 + (cartTotal - cartDiscount)).toFixed(2)
                }
            }
        })

        // // set up decrease buttons
        buttons.push(document.getElementById(coupons[i][0] + "dec").onclick = function () {
            for (var j = 0; j < coupons.length; j++) {
                if (coupons[j][0] + "dec" == this.id) {
                    if (countsCoupons[j] - 1 > -1) {
                        countsCoupons[j] -= 1
                        document.getElementById(coupons[j][0] + "Num").innerHTML = countsCoupons[j]
                        cartDiscount -= parseInt(coupons[j][1])
                        document.getElementById("cartDiscount").innerHTML = cartDiscount
                        document.getElementById("cash").innerHTML = parseFloat(cartTotal - cartDiscount).toFixed(2)
                        document.getElementById("card").innerHTML = parseFloat((cartTotal - cartDiscount) * 0.026 + .1 + (cartTotal - cartDiscount)).toFixed(2)
                    }
                }
            }
        })
    }
    for (var i = 0; i < orderItemsG.length; i++) {
        // set up increase buttons
        buttons.push(document.getElementById(orderItemsG[i][0] + "inc").onclick = function () {
            for (var j = 0; j < orderItemsG.length; j++) {
                if (orderItemsG[j][0] + "inc" == this.id) {
                    countsCart[j] += 1
                    document.getElementById(orderItemsG[j][0] + "Num").innerHTML = countsCart[j]
                    cartTotal += parseInt(orderItemsG[j][1])
                    document.getElementById("cartTotal").innerHTML = cartTotal
                    document.getElementById("cash").innerHTML = parseFloat(cartTotal - cartDiscount).toFixed(2)
                    document.getElementById("card").innerHTML = parseFloat((cartTotal - cartDiscount) * 0.026 + .1 + (cartTotal - cartDiscount)).toFixed(2)
                }
            }
        })

        // set up decrease buttons
        buttons.push(document.getElementById(orderItemsG[i][0] + "dec").onclick = function () {
            for (var j = 0; j < orderItemsG.length; j++) {
                if (orderItemsG[j][0] + "dec" == this.id) {
                    if (countsCart[j] - 1 > -1) {
                        countsCart[j] -= 1
                        document.getElementById(orderItemsG[j][0] + "Num").innerHTML = countsCart[j]
                        cartTotal -= parseInt(orderItemsG[j][1])
                        document.getElementById("cartTotal").innerHTML = cartTotal
                        document.getElementById("cash").innerHTML = parseFloat(cartTotal - cartDiscount).toFixed(2)
                        document.getElementById("card").innerHTML = parseFloat((cartTotal - cartDiscount) * 0.026 + .1 + (cartTotal - cartDiscount)).toFixed(2)
                    }
                }
            }
        })
        buttons.push(document.getElementById("cartRight").onclick = async function () {
            var myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/json')
            var data
            if (orderData != null) {
                data = {
                    orderNumber: orderData[0],
                    countsCart: countsCart,
                    countsCoupons: countsCoupons
                }
            } else {
                data = {
                    orderNumber: null,
                    countsCart: countsCart,
                    countsCoupons: countsCoupons
                }
            }
            const URL = '/finalSubmit';
            await fetch(URL, {
                method: 'POST',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: JSON.stringify(data)
            }).then((res) => res.json()).then(async (data) => {
                document.getElementById("showingDetails").hidden = false
                document.getElementById("bringUpOrder").hidden = true
                var table = document.getElementById("infoo")
                table.innerHTML = ""
                for (var i = 0; i < countsCart.length; i++) {
                    if (countsCart[i] != 0) {
                        table.innerHTML += ('<tr><td>' + orderItemsG[i][0] + ":</td><td>" + countsCart[i] + "</td></tr>")
                    }
                }
                document.getElementById("close").onclick = function () {
                    var ordering = document.getElementById("ordering")
                    ordering.hidden = false
                    var showingDetails = document.getElementById("showingDetails")
                    showingDetails.hidden = true
                    window.scrollTo(0, scrollLocY)
                    location.reload()
                }
                await sleep(100000)

                location.reload()
                document.getElementById("cartTotal").innerHTML = 0
                document.getElementById("cartDiscount").innerHTML = 0
                document.getElementById("cash").innerHTML = 0
                document.getElementById("card").innerHTML = 0
                cartDiscount = 0
                cartTotal = 0
                for (var j = 0; j < coupons.length; j++) {
                    countsCoupons[j] = 0
                }
            })
        })
    }



    document.getElementById("back").onclick = function () {
        var ordering = document.getElementById("ordering")
        ordering.hidden = false
        var showingDetails = document.getElementById("showingDetails")
        showingDetails.hidden = true
        var bringUpOrder = document.getElementById("bringUpOrder")
        bringUpOrder.hidden = true
        window.scrollTo(0, scrollLocY)
        location.reload()
        document.getElementById("cartTotal").innerHTML = 0
        document.getElementById("cartDiscount").innerHTML = 0
        document.getElementById("cash").innerHTML = 0
        document.getElementById("card").innerHTML = 0
        cartDiscount = 0
        cartTotal = 0
        for (var j = 0; j < coupons.length; j++) {
            countsCoupons[j] = 0
        }
    }
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
        location.reload()
    }
}





async function run() {
    while (true) {
        console.log("reloading")
        await sleep(30000)
        if (document.getElementById("ordering").hidden == false) {
            location.reload()
        }
    }
}


const sleep = ms => new Promise(r => setTimeout(r, ms));