

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
var warnedLargeOrder = false
var warnedLargeOrder2 = false

function init() {
    document.getElementById("total").innerHTML = cartPrice
    for (var j = 0; j < orderItems.length; j++) {
        counts.push(0)
    }
    for (var i = 0; i < orderItems.length; i++) {
        if (!orderItems[i][3]) {
            document.getElementById(orderItems[i][0] + "orderItemTable").hidden = true
        }
    }
    for (var i = 0; i < orderItems.length; i++) {
        // set up increase buttons
        if (!orderItems[i][3]) {
            continue
        }
        buttons.push(document.getElementById(orderItems[i][0] + "inc").onclick = async function () {
            for (var j = 0; j < orderItems.length; j++) {
                if (orderItems[j][0] + "inc" == this.id) {
                    counts[j] += 1
                    if (!warnedLargeOrder && sumList(counts) > 40) {
                        alert("Please consider making a large order request!")
                        warnedLargeOrder = true
                    }
                    if (!warnedLargeOrder2 && sumList(counts) > 99) {
                        document.getElementById("-_-").hidden = false
                        warnedLargeOrder2 = true
                        await sleep(3000)
                        document.getElementById("-_-").hidden = true
                    }
                    document.getElementById(orderItems[j][0] + "Num").innerHTML = counts[j]
                    cartPrice += parseInt(orderItems[j][1])
                    document.getElementById("total").innerHTML = cartPrice
                }
            }
        })

        // set up decrease buttons
        buttons.push(document.getElementById(orderItems[i][0] + "dec").onclick = function () {
            for (var j = 0; j < orderItems.length; j++) {
                if (!orderItems[i][3]) {
                    continue
                }
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

        buttons.push(document.getElementById("largeOrder").onclick = function () {
            alert("Please text or call Grace: 612-246-7162 or Isaiah: 717-803-1649 with your order.") //ToDo
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
    o = o.concat(o).concat(o)
    var midRight = document.getElementById("midRight")
    var midLeft = document.getElementById("midLeft")
    var refs = [midLeft, midRight]
    var r = 0
    for (var i = 0; i < o.length; i++) {
        var ref = refs[r % 2]
        ref.innerHTML += "<img src='./Sponsors/Tier 3/" + tier3[o[i]] + "' class='tier3' alt='" + tier3[o[i]].slice(0, tier3[o[i]].indexOf('.')) + "'></img><br>"
        r++
    }
}


function sumList(list) {
    var total = 0
    for (var i = 0; i < list.length; i++) {
        total += list[i]
    }
    return total
}

const sleep = ms => new Promise(r => setTimeout(r, ms));