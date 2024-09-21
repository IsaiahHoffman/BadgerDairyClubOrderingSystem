import express from "express";
import fs from "fs";
import { List } from "linked-list";

function makeLogEntry(comment, data) {
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
    var line = data.slice(0, data.indexOf("\n"))
    console.log(line)
    data = data.slice(data.indexOf("\n") + 1, data.length);
    console.log("(", data, ")")
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
      "<td id='cheeseSpons' rowspan='2'>Cheese of the Day<br> brought to you by <br><img src='./Sponsors/Cheese Sponsors/<%= cheeseOfTheDayLogo %>' class='majSpon'></td>" +
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
      "<p>Name: <input id='nameInput'></p>"
    for (var i = 0; i < orderItems.length; i++) {
      content = content +
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
        "</table>"

      "$" + orderItems[i][1]
    }
    content = content +
      "</div>" +
      "</td>" +
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


    content += "</body> <script src='orderPage.js'></script></html>"
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

var orders = new List()
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
const port = 3000;







// Global varibales
var orders = {}





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
    orders[data['orderNumber']] = data
    updateLog(makeLogEntry("New Order", data));
  } else {
    updateLog(makeLogEntry("Changed Order", data));
    orders[data[orderNumber]] = data
  }
  res.status(200).json({ orderNumber: orderNumber });
})

app.post('/resubmit', (req, res) => {
  let data = (req.body)
  var ticket = data.ticket
  orders[ticket] = data;
  updateLog(makeLogEntry("Change Order", data));
  // console.log(data)
})

app.get('/op', (req, res) => {
  res.render('pages/orderProcessing');
});

app.post('/orderLookUp', (req, res) => {
  let data = (req.body)
  var ticket = data['ticket']

  res.status(200).json({ orderData: orders[ticket] });

})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
