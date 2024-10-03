const sleep = ms => new Promise(r => setTimeout(r, ms));



init()


var orders = []
var totalCounts
async function init() {
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')
    var data = {
    }

    const URL = '/dpp';
    await fetch(URL, {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(data)
    }).then((res) => res.json()).then(async (data) => {
        console.log(data['data'])
        document.getElementById("data").innerText = data['data']
    })
    // await sleep(500)
    // var data = document.getElementById("data").innerText
    // var data = document.getElementById("orderItemsG").innerText
    // // document.getElementById("data").hidden = true
    // document.getElementById("orderItemsG").hidden = true
    // t = 0
    // // console.log(t, data.length)
    // while (data.length > 10 && t < 50000000) {
    //     var line = ""
    //     line = line + data.slice(0, data.indexOf("]") + 1)
    //     data = data.slice(data.indexOf("]") + 1, data.length)
    //     line = line + data.slice(0, data.indexOf("]") + 1)
    //     data = data.slice(data.indexOf("]") + 1, data.length)
    //     line = line + data.slice(0, data.indexOf("]") + 1)
    //     data = data.slice(data.indexOf("]") + 1, data.length)

    //     // console.log(line)

    //     line = line.slice(line.indexOf(",") + 2, line.length);
    //     var orderComment = line.slice(0, line.indexOf(",") - 1);
    //     line = line.slice(line.indexOf(",") + 15, line.length);
    //     var orderName = line.slice(0, line.indexOf(",") - 1);
    //     line = line.slice(line.indexOf("[") + 1, line.length);
    //     var counts = []
    //     var test = 0
    //     while (line.indexOf("]") > line.indexOf(",") && test < 10000) {
    //         counts.push(parseInt(line.slice(0, line.indexOf(","))))
    //         line = line.slice(line.indexOf(",") + 1, line.length);
    //         test++
    //     }
    //     counts.push(parseInt(line.slice(0, line.indexOf("]"))))
    //     console.log(counts)

    //     line = line.slice(line.indexOf(",") + 1, line.length);
    //     line = line.slice(line.indexOf(":") + 1, line.length);
    //     var orderNumber = line.slice(1, line.indexOf(",") - 1);
    //     orderNumber = parseInt(orderNumber)
    //     t++
    //     // console.log(counts, orderName, orderComment)
    //     if (totalCounts == undefined) {
    //         totalCounts = []
    //         for (var i = 0; i < counts.length; i++) {
    //             totalCounts.push(0)
    //         }
    //     }
    //     if (orderComment == "New Order") {
    //         for (var i = 0; i < counts.length; i++) {
    //             totalCounts[i] += counts[i]
    //         }
    //     }

    //     if (orderComment == "Paid") {
    //         for (var i = 0; i < counts.length; i++) {
    //             totalCounts[i] -= counts[i]
    //         }
    //     }

    // }
    // console.log(totalCounts)
}


//     if (orderComment == "New Order") {
//         orders.insertLast(new LinkedListNode([orderNumber, orderName, counts]))
//     } else if (orderComment == "Changed Order") {
//         var node = orders.head()
//         if (node.getValue()[0] == orderNumber) {
//             node.getValue()[2] = counts
//             node.getValue()[1] = orderName
//         }
//         while (node.hasNext()) {
//             if (node.getValue()[0] == orderNumber) {
//                 node.getValue()[2] = counts
//                 node.getValue()[1] = orderName
//             }
//             node = node.getNext()
//         }
//         if (node.getValue()[0] == orderNumber) {
//             node.getValue()[2] = counts
//             node.getValue()[1] = orderName
//         }
//     } else if (orderComment == "Paid") {
//         // console.log(orderNumber)
//         var node = orders.head()
//         var i = 0
//         if (node.getValue()[0] == orderNumber) {
//             orders.removeAt(i)
//         } else {
//             while (node.hasNext()) {
//                 i++
//                 node = node.getNext()
//                 if (node.getValue()[0] == orderNumber) {
//                     orders.removeAt(i)
//                 }
//             }
//         }
//         for (var j = 0; j < countsNum.length; j++) {
//             countsNum[j] = parseInt(countsNum[j])
//         }
//         // totalItemsOrdered += (sumList(countsNum))
//     } else if (orderComment == "PaidCounter") {
//         var countsNum = counts
//         for (var j = 0; j < countsNum.length; j++) {
//             countsNum[j] = parseInt(countsNum[j])
//         }
//         // console.log(totalItemsOrdered)
//         // totalItemsOrdered += (sumList(countsNum))
//         masterOrderNum += 1
//     }