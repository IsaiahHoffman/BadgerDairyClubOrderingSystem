

async function load() {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    var data = {
    }
    var response
    const URL = '/load';
    await fetch(URL, {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(data)
    }).then((res) => res.json()).then((data) => {
        response = data['data'];
        tier3 = data['tier3']
        orderItems = response
        init()
    })
}
load()
var orderItems
var tier3
var counts = []
var buttons = []
var cartPrice = 0

function init() {
    document.getElementById("total").innerHTML = cartPrice
    for (var j = 0; j < orderItems.length; j++) {
        counts.push(0)
    }

    for (var i = 0; i < orderItems.length; i++) {
        // set up increase buttons
        buttons.push(document.getElementById(orderItems[i][0] + "inc").onclick = function () {
            for (var j = 0; j < orderItems.length; j++) {
                if (orderItems[j][0] + "inc" == this.id) {
                    counts[j] += 1
                    document.getElementById(orderItems[j][0] + "Num").innerHTML = counts[j]
                    cartPrice += parseInt(orderItems[j][1])
                    document.getElementById("total").innerHTML = cartPrice
                }
            }
        })

        // set up decrease buttons
        buttons.push(document.getElementById(orderItems[i][0] + "dec").onclick = function () {
            for (var j = 0; j < orderItems.length; j++) {
                if (orderItems[j][0] + "dec" == this.id) {
                    if (counts[j] - 1 > -1) {
                        counts[j] -= 1
                        document.getElementById(orderItems[j][0] + "Num").innerHTML = counts[j]
                        cartPrice -= parseInt(orderItems[j][1])
                        document.getElementById("total").innerHTML = cartPrice
                    }
                }
            }
        })

        buttons.push(document.getElementById("cartRight").onclick = async function () {
            var orderName = document.getElementById("nameInput").value
            var myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/json')
            var data = {
                orderName: orderName,
                counts: counts,
                orderNumber: document.getElementById("orderNumber").innerText
            }
            const URL = '/submit';
            await fetch(URL, {
                method: 'POST',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: JSON.stringify(data)
            }).then((res) => res.json()).then((data) => {
                document.getElementById("ordering").hidden = true
                document.getElementById("cart").hidden = true
                document.getElementById("thankYou").hidden = false
                document.getElementById("orderNumber").innerText = data['orderNumber']
                buttons.push(document.getElementById("changeOrder").onclick = async function () {
                    document.getElementById("ordering").hidden = false
                    document.getElementById("cart").hidden = false
                    document.getElementById("thankYou").hidden = true
                })
            })
        })
    }
    var o = []
    for (var i = 0; i < tier3.length; i++) {
        o.push(i)
    }
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    var midRight = document.getElementById("midRight")
    var midLeft = document.getElementById("midLeft")
    var refs = [midLeft, midRight]
    var r = 0
    for (var i = 0; i < o.length; i++) {
        var ref = refs[r % 2]
        ref.innerHTML += "<img src='./Sponsors/Tier 3/" + tier3[o[i]] + "' class='tier3'></img><br>"
        r++
    }
}
