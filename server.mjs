import { LinkedList, LinkedListNode } from "@datastructures-js/linked-list";
import express from "express";
import fs from "fs";


function makeLogEntry(comment, data) {
  data['orderNumber'] = (data['orderNumber']).toString()
  const date = new Date()
  var str = date.getMonth().toString() + "/" + date.getDate().toString() + "/" + date.getFullYear().toString() + " " + date.getHours().toString() + ":" + date.getMinutes().toString();
  // orders.append(new Item([data]))
  // console.log(orders)
  return JSON.stringify([str, comment, data, date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()]);
}

function updateLog(data) {
  fs.appendFile('log' + year + '.txt', data + "\n", (err) => {
    if (err) {
      console.log(err);
    }
  });
}

async function readSETUP() {
  fs.appendFile('log' + year + '.txt', "", (err) => {
    if (err) {
      console.log(err);
    }
  });

  // log data extraction
  fs.readFile('log' + year + '.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    var t = 0
    while (data.length > 5 && t < 100000000) {
      var line = data.slice(0, data.indexOf("\n"))
      line = line.slice(line.indexOf(",") + 2, line.length);
      var orderComment = line.slice(0, line.indexOf(",") - 1);
      line = line.slice(line.indexOf(",") + 15, line.length);
      var orderName = line.slice(0, line.indexOf(",") - 1);
      line = line.slice(line.indexOf("[") + 1, line.length);
      var counts = []
      var test = 0
      while (line.indexOf("]") > line.indexOf(",") && test < 10000) {
        counts.push(line.slice(0, line.indexOf(",")))
        line = line.slice(line.indexOf(",") + 1, line.length);
        test++
      }
      counts.push(line.slice(0, line.indexOf("]")))

      line = line.slice(line.indexOf(",") + 1, line.length);
      line = line.slice(line.indexOf(":") + 1, line.length);
      var orderNumber = line.slice(1, line.indexOf(",") - 1);
      orderNumber = parseInt(orderNumber)
      if (masterOrderNum <= orderNumber) {
        masterOrderNum = orderNumber + 1
      }
      t++
      data = data.slice(data.indexOf("\n") + 1, data.length)



      if (orderComment == "New Order") {
        orders.insertLast(new LinkedListNode([orderNumber, orderName, counts]))
      } else if (orderComment == "Changed Order") {
        var node = orders.head()
        if (node.getValue()[0] == orderNumber) {
          node.getValue()[2] = counts
          node.getValue()[1] = orderName
        }
        while (node.hasNext()) {
          if (node.getValue()[0] == orderNumber) {
            node.getValue()[2] = counts
            node.getValue()[1] = orderName
          }
          node = node.getNext()
        }
        if (node.getValue()[0] == orderNumber) {
          node.getValue()[2] = counts
          node.getValue()[1] = orderName
        }
      } else if (orderComment == "Paid") {
        // console.log(orderNumber)
        var node = orders.head()
        var i = 0
        if (node.getValue()[0] == orderNumber) {
          orders.removeAt(i)
        } else {
          while (node.hasNext()) {
            i++
            node = node.getNext()
            if (node.getValue()[0] == orderNumber) {
              orders.removeAt(i)
            }
          }
        }
        for (var j = 0; j < countsNum.length; j++) {
          countsNum[j] = parseInt(countsNum[j])
        }
        // totalItemsOrdered += (sumList(countsNum))
      } else if (orderComment == "PaidCounter") {
        var countsNum = counts
        for (var j = 0; j < countsNum.length; j++) {
          countsNum[j] = parseInt(countsNum[j])
        }
        // console.log(totalItemsOrdered)
        // totalItemsOrdered += (sumList(countsNum))
        masterOrderNum += 1
      }
    }
    // var node = orders.head()
    // while (node.hasNext()) {
    //   console.log(node)
    //   node = node.getNext()
    // }
  })

  // Setup init
  var orderItems = []
  fs.readFile('SETUP.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // Order items
    data = data.slice(data.indexOf("!!!---!!!") + 9, data.length);
    data = data.slice(data.indexOf("!!!---!!!") + 9, data.length);
    data = data.slice(data.indexOf("!!!---!!!") + 10, data.length);
    let test = 0
    while (data.indexOf("!!!---!!!") != 0 && test < 1000) {
      var name = data.indexOf(",");
      name = data.slice(0, name);
      data = data.slice(data.indexOf(",") + 1, data.length);
      var price = data.indexOf(",");
      price = data.slice(1, price);
      data = data.slice(data.indexOf(",") + 1, data.length);

      var fileName = data.indexOf("\n");
      fileName = data.slice(1, fileName);
      if (fileName.indexOf("\r") != -1) {
        fileName = data.slice(1, fileName.indexOf("\r") + 1)
      }
      data = data.slice(data.indexOf("\n") + 1, data.length);
      orderItems.push([name, price, fileName])
      test++
    }

    // Large Sponsors
    //TopLeft
    data = data.slice(data.indexOf("!!!---!!!") + 9, data.length)
    data = data.slice(data.indexOf("!!!---!!!") + 10, data.length)
    if (data.indexOf("\n") == 0) {
      data = data.slice(1, data.length)
    }
    data = data.slice(data.indexOf("\n") + 1, data.length);
    var topLeft = data.indexOf("\n");
    topLeft = data.slice(0, topLeft);
    data = data.slice(data.indexOf("\n") + 1, data.length);

    //TopRight
    data = data.slice(data.indexOf("\n") + 1, data.length);
    var topRight = data.indexOf("\n");
    topRight = data.slice(0, topRight);
    data = data.slice(data.indexOf("\n") + 1, data.length);

    //BottomLeft
    data = data.slice(data.indexOf("\n") + 1, data.length);
    var bottomLeft = data.indexOf("\n");
    bottomLeft = data.slice(0, bottomLeft);
    data = data.slice(data.indexOf("\n") + 1, data.length);

    //BottomRight
    data = data.slice(data.indexOf("\n") + 1, data.length);
    var bottomRight = data.indexOf("\n");
    bottomRight = data.slice(0, bottomRight);
    data = data.slice(data.indexOf("\n") + 1, data.length);

    majSponsors = [topLeft, topRight, bottomLeft, bottomRight]

    // Cheese of Day
    data = data.slice(data.indexOf("!!!---!!!") + 9, data.length)
    data = data.slice(data.indexOf("!!!---!!!") + 10, data.length)
    if (data.indexOf("\n") == 0) {
      data = data.slice(1, data.length)
    }
    for (var i = 0; i < 5; i++) {
      data = data.slice(data.indexOf("\n") + 1, data.length);
      var cheese = data.indexOf("\n");
      cheese = data.slice(0, cheese);
      data = data.slice(data.indexOf("\n") + 1, data.length);
      cheeseOfDay.push(cheese)
    }

    // Tier3
    data = data.slice(data.indexOf("!!!---!!!") + 9, data.length)
    data = data.slice(data.indexOf("!!!---!!!") + 10, data.length)
    if (data.indexOf("\n") == 0) {
      data = data.slice(1, data.length)
    }
    test = 0
    while (data.indexOf("!!!---!!!") != 0 && test < 1000) {
      var fileName = data.indexOf("\n");
      fileName = data.slice(0, fileName);
      data = data.slice(data.indexOf("\n") + 1, data.length);
      tier3.push(fileName)
      test++
    }

    // Coupons
    data = data.slice(data.indexOf("!!!---!!!") + 9, data.length)
    data = data.slice(data.indexOf("!!!---!!!") + 10, data.length)
    if (data.indexOf("\n") == 0) {
      data = data.slice(1, data.length)
    }
    test = 0
    while (data.indexOf("!!!---!!!") != 0 && test < 1000) {
      var name = data.indexOf(",");
      name = data.slice(0, name);
      data = data.slice(data.indexOf(",") + 1, data.length);
      var value = data.indexOf(",");
      value = data.slice(1, value);
      data = data.slice(data.indexOf(",") + 1, data.length);
      var fileName = data.indexOf("\n");
      fileName = data.slice(1, fileName);
      data = data.slice(data.indexOf("\n") + 1, data.length);
      coupons.push([name, value, fileName])
      test++
    }
    for (var i = 0; i < orderItems.length; i++) {
      orderItems[i].push(false)
    }

    orderItemsG = orderItems
    var content =
      // Top
      "<!DOCTYPE html>" +
      "<html lang='en'>" +
      "<head>" +
      "<meta charset='UTF-8'>" +
      "<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
      "<title>Order Page</title>" +
      "<link rel='stylesheet' href='orderPage.css'>" +
      "</head>" +
      "<body>" +
      "<table id='thankyou'>" +
      "<tr>" +
      "<td><img src='./bdcLogo.jpg' id='clubLogos'></td>" +
      "<td>To all our sponsors thank you!</td>" +
      "<td><img src='./cfbLogo.png' id='clubLogos'></td>" +
      "</tr>" +
      "</table>" +
      "<table id='top'>" +
      "<tr>" +
      "<td id='topLeftMajSpon'><img src='./Sponsors/" + topLeft + "' class='majSpon'></img></td>" +
      "<td id='cheeseSpons' rowspan='2'>Cheese of the Day<br> brought to you by <br><img src='./Sponsors/Cheese Sponsors/<%= cheeseOfTheDayLogo %>' class='majSpon'><img src='./Sponsors/DFW.jpg' id='dfw' class='majSpon'></td>" +
      "<td id='topRightMajSpon'><img src='./Sponsors/" + topRight + "' class='majSpon'></td>" +
      "</tr>" +
      "<tr>" +
      "<td id='bottomLeftMajSpon'><img src='./Sponsors/" + bottomLeft + "' class='majSpon'></td>" +
      "<td id='bottomRightMajSpon'><img src='./Sponsors/" + bottomRight + "' class='majSpon'></td>" +
      "</tr>" +
      "</table>" +



      // Middle
      "<body>" +
      "<table id='middle'>" +
      "<tr>" +
      // Ads left
      "<td id='midLeft'>" +
      "</td>" +
      "<td id='midMid'>" +
      "<div hidden='true' id='thankYou'>Order Number: <br> <div id='orderNumber'>Error</div><br>Thank you for your order! <div id='changeOrder'>Change Order</div></div>" +
      "<div id='ordering'>" +
      "<p>Cheese Stand Hours:<br>9am - 7pm<br><br>Schedule pickups for orders larger than 40 items <br>(atleast 2 hours in advance)</p>" +
      "<div class='button' id='largeOrder'>Large Order</div>" +
      "<p>Please remember your order number or enter your name below.</p>" +
      "<p>Name: <input id='nameInput'></p>"
    for (var i = 0; i < orderItems.length; i++) {
      content = content +
        "<div id='" + orderItems[i][0] + "orderItemTable'>" +
        "<p>" + orderItems[i][0] + "</p>" +

        "<table class='orderItemTable'>" +
        "<tr>" +
        "<td class='foodItem'>"
      if (orderItems[i][2] != "NA") {
        content = content + "<img class='foodImage' src='./FoodItems/" + orderItems[i][2] + "'>"
      }

      content = content + "</td>" +
        "<td class='decrease' id='" + orderItems[i][0] + "dec'><div class='button'>-</div></td>" +
        "<td class='number' id='" + orderItems[i][0] + "Num'>0</td>" +
        "<td class='increase' id='" + orderItems[i][0] + "inc'><div class='button'>+</div></td>" +
        "<td class='price'>" + "$" + orderItems[i][1] + "</td>" +
        "</tr>" +
        "</table></div>"

      "$" + orderItems[i][1]
    }
    content = content +
      "</div>" +
      "<table id='soldOut'></table></td>" +
      // Ads right
      "<td id='midRight'>" +
      "</td>" +
      "</tr>" +
      "</table>" +

      // Bottom
      "<table id='cart'>" +
      "<tr>" +
      "<td id='cartLeft'>Cart Total: $<span id='total'>Error</span></td>" +
      "<td id='cartMid'></td>" +
      "<td id='cartRight'><img id='cartImg' src='cart.png' alt='BDC Logo'><br>Checkout</td>" +
      "</tr>" +
      "</table>"


    content += "<div hidden='true' id='-_-'><img src='-_-.jpg'></div></body> <script src='orderPage.js'></script></html>"
    fs.writeFile('./views/pages/orderPage.ejs', content, err => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
      }
    });
    // console.log(orderItemsG, majSponsors, cheeseOfDay, tier3, coupons)
  });
}

var orders = new LinkedList()
var orderItemsG
var majSponsors = []
var cheeseOfDay = []
var tier3 = []
var coupons = []
var masterOrderNum = 1
const date = new Date()
var year = date.getFullYear().toString()
async function init() {
  await readSETUP()
}
init()










const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.set('view engine', 'ejs');
app.use(express.static('public'))
const port = 80;







// Global varibales
var order = {}





app.get('/', (req, res) => {
  const date = new Date()
  var cheeseOfTheDayLogo
  if (date.getDay() < 1 || date.getDay() > 5) {
    cheeseOfTheDayLogo = cheeseOfDay[0]
  } else {
    cheeseOfTheDayLogo = cheeseOfDay[date.getDay() - 1]
  }
  res.render('pages/orderPage', { cheeseOfTheDayLogo: cheeseOfTheDayLogo, tier3: tier3 });
});

app.post('/load', (req, res) => {
  let data = req.body;
  res.json(
    {
      data: orderItemsG,
      tier3: tier3
    })
});


app.post('/submit', (req, res) => {
  let data = req.body;
  var orderNumber = data['orderNumber']
  if (orderNumber == "Error") {
    orderNumber = masterOrderNum
    masterOrderNum += 1
    data['orderNumber'] = orderNumber
    var couponCounts = []
    for (var i = 0; i < coupons.length; i++) {
      couponCounts.push(0)
    }
    data['couponCounts'] = couponCounts
    updateLog(makeLogEntry("New Order", data));
    orders.insertLast(new LinkedListNode([orderNumber, data['orderName'], data['counts']]))
  } else {
    var couponCounts = []
    for (var i = 0; i < coupons.length; i++) {
      couponCounts.push(0)
    }
    data['couponCounts'] = couponCounts
    updateLog(makeLogEntry("Changed Order", data));
    var node = orders.findOrderNumber(orderNumber)
    node.getValue()[2] = data['counts']
    node.getValue()[1] = data['orderName']
  }
  res.status(200).json({ orderNumber: orderNumber });
})

app.get('/op', (req, res) => {
  res.render('pages/orderProcessing');
});

app.post('/orderLookUp', (req, res) => {
  let data = (req.body)
  var ticket = data['ticket']
  var orderNumber = parseInt(ticket)
  var returnData = null
  var node = orders.head()
  if (node == null) {
    res.status(200).json({ orderData: null });
  } else {
    if (node.getValue()[0] == orderNumber) {
      returnData = node.getValue()
    }
    while (node.hasNext()) {
      if (node.getValue()[0] == orderNumber) {
        returnData = node.getValue()
      }
      node = node.getNext()
    }
    if (node.getValue()[0] == orderNumber) {
      returnData = node.getValue()
    }
    res.status(200).json({ orderData: returnData });
  }
})

app.post('/orders', (req, res) => {
  var data = []
  var node = orders.head()
  if (node == null) {
    res.status(200).json({
      orderData: null,
      orderItemsG: orderItemsG,
      coupons: coupons
    });
  } else {
    data.push(node.getValue())
    while (node.hasNext()) {
      node = node.getNext()
      data.push(node.getValue())
    }
    res.status(200).json({
      orderData: data,
      orderItemsG: orderItemsG,
      coupons: coupons
    });
  }
})

app.post('/of', (req, res) => {
  let orderNumber = (req.body['orderNumber'])
  let node = orders.findOrderNumber(orderNumber)
  var orderData = null
  if (node != null) {
    orderData = node.getValue()
  }
  res.status(200).json({
    orderData: orderData
  });
});

app.post('/finalSubmit', (req, res) => {
  let orderNumber = (req.body['orderNumber'])
  if (orderNumber == null) {
    let counts = (req.body['countsCart'])
    let couponCounts = (req.body['countsCoupons'])
    let data = ({
      orderName: "",
      counts: counts,
      orderNumber: masterOrderNum,
      couponCounts: couponCounts
    })
    masterOrderNum += 1
    updateLog(makeLogEntry("PaidCounter", data))
    console.log("Order #: " + orderNumber + " completed")

    var test = true
    res.status(200).json({
      test: test
    });
  } else {
    let node = orders.findOrderNumber(orderNumber).getValue()
    for (var j = 0; j < node[2].length; j++) {
      node[2][j] = parseInt(node[2][j])
    }
    let couponCounts = (req.body['countsCoupons'])
    let data = ({
      orderName: node[1],
      counts: node[2],
      orderNumber: node[0],
      coupons: couponCounts
    })
    updateLog(makeLogEntry("Paid", data))
    console.log("Order #: " + orderNumber + " completed")
    var test = orders.removeOrderNumber(orderNumber)
    res.status(200).json({
      test: test
    });
  }
});

app.get('/dp', (req, res) => {
  fs.readFile('log' + year + '.txt', 'utf8', async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    (await data)
    res.render('pages/dataProcessing', { 
      data: data,
      orderItemsG: orderItemsG
     });
  })
});

app.post('/dpp', (req, res) => {
  fs.readFile('log' + year + '.txt', 'utf8', async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    (await data)
    res.status(200).json({
      data: data
     });
  })
});

app.get('/settings', (req, res) => {
  res.render('pages/settings', { orderDataG: orderItemsG });
});

app.post('/settings', (req, res) => {
  let id = (req.body['id'])
  for (var i = 0; i < orderItemsG.length; i++) {
    if (orderItemsG[i][0] == id) {
      var truth = req.body['truth']
      orderItemsG[i][3] = truth
    }
  }
  res.status(200).json({
    test: true
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




LinkedList.prototype.findOrderNumber = function (orderNumber) {
  var node = orders.head()
  var i = 0
  if (node.getValue()[0] == orderNumber) {
    return node
  } else {
    while (node.hasNext()) {
      i++
      node = node.getNext()
      if (node.getValue()[0] == orderNumber) {
        return node
      }
    }
  }
  return null
}

LinkedList.prototype.removeOrderNumber = function (orderNumber) {
  var node = orders.head()
  var i = 0
  if (node.getValue()[0] == orderNumber) {
    this.removeAt(0)
    return true
  } else {
    while (node.hasNext()) {
      i++
      node = node.getNext()
      if (node.getValue()[0] == orderNumber) {
        this.removeAt(i)
        return true
      }
    }
  }
  return false
}

function sumList(list) {
  var total = 0
  for (var i = 0; i < list.length; i++) {
    total += list[i]
  }
  return total
}