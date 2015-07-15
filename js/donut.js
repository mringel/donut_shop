var DonutShoppe = function(location, options) {
  this.locationName = location;
  this.minCustomers = options.minCustomers;
  this.maxCustomers = options.maxCustomers;
  this.averagePerCustumer = options.averagePerCustomer;
  this.opens = options.opens || 600;
  this.closes = options.closes || 1800;
  this.hoursOpen = (this.closes - this.opens)/100;
};

DonutShoppe.prototype.hourForecast = function() {
  var customers = this.generateRandom(this.minCustomers,this.maxCustomers);
  return customers * this.averagePerCustumer;
};

DonutShoppe.prototype.generateRandom = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
 

DonutShoppe.prototype.render = function() {
  var dayTotal = 0;
  var addRow = document.createElement('tr');
  var tbl = document.getElementById('donutTable');
  
  if (tbl.rows.length % 2 == 0) {
    addRow.style.background = "#CCCCCC";  
  } else{
    addRow.style.background = "#A4BCC8";
  };
  var locationCol = document.createElement('td');

  // Set first cell in each row to the name of the location
  locationCol.innerHTML = this.locationName;
  addRow.appendChild(locationCol);

  // append hourly donut forecast to table
  for (var i = 0; i < this.hoursOpen; i++) {
    var hourEntry = document.createElement('td');
    var wholeDonuts = Math.ceil(this.hourForecast());
    dayTotal += wholeDonuts;
    hourEntry.innerHTML = wholeDonuts;
    addRow.appendChild(hourEntry);    
  }

  // append total daily counts to table
  var totalCol = document.createElement('td');
  totalCol.innerHTML = dayTotal;
  addRow.appendChild(totalCol);
  tbl.appendChild(addRow);

}; // close render function

// creates the table
var createTable = function(){
  var tbl = document.createElement('table');
  tbl.setAttribute('id', 'donutTable')
  tbl.cellPadding = "10";
  tbl.border = "1";
  
  // creates top row for header information
  var topRow = tbl.insertRow();
  
  // create header label for locations
  var lCell = topRow.insertCell();
  lCell.rowSpan = "2";
  lCell.appendChild(document.createTextNode('Location'));
  //lCell.style.border = '1px solid black';
  
  // create header label for hours
  var hCell = topRow.insertCell();
  hCell.colSpan = "12";
  hCell.setAttribute('align', 'center');
  hCell.appendChild(document.createTextNode('Hours'));
  //hCell.style.border = '1px solid black';
  
  // create header label for daily totals
  var tCell = topRow.insertCell();
  tCell.rowSpan = "2";
  tCell.appendChild(document.createTextNode('Daily Total'));
  //tCell.style.border = '1px solid black';
  
  // create a row for hour header and populate with for loop
  var hRow = tbl.insertRow();
  
  for (var i = 0; i < 12; i++) {
    var newCell = hRow.insertCell();
    hourSpan = (i+6)*100;
    hourConverted = (hourSpan < 1000) ? "0" + hourSpan : hourSpan;
    newCell.appendChild(document.createTextNode(hourConverted));
    }

document.getElementById('donutDiv').appendChild(tbl);
};

function addNew() {
  loc = prompt('Location Name?');
  min = prompt('Minimum customers per hour?');
  max = prompt('Maximum customers per hour?');
  average = prompt('Average donuts purchased per customer?');
  // location.replace(/\s/g, '');
  var newLoc = new DonutShoppe(loc, {minCustomers: min, maxCustomers: max, averagePerCustomer: average});
  addLocation(newLoc);
}

function addLocation(store) {
  allLocations.push(store);
}

function updateTable () {
  var tbl = document.getElementById('donutTable');

  // delete previous table
  while (tbl.rows.length > 2) {
    tbl.deleteRow(-1);
  }
  // and rebuild
  for (var i = 0; i < allLocations.length; i++) {
    allLocations[i].render();
  }
}

createTable();

var downtown  = new DonutShoppe('Downtown', {minCustomers: 8, maxCustomers: 43, averagePerCustomer: 4.5});
var capHill   = new DonutShoppe('Capitol Hill', {minCustomers: 4, maxCustomers: 37, averagePerCustomer: 2});
var slu       = new DonutShoppe('South Lake Union', {minCustomers: 9, maxCustomers: 23, averagePerCustomer: 6.33});
var wedgewood = new DonutShoppe('Wedgewood', {minCustomers: 2, maxCustomers: 28, averagePerCustomer: 1.25});
var ballard   = new DonutShoppe('Ballard', {minCustomers: 8, maxCustomers: 58, averagePerCustomer: 3.75});

var allLocations = [downtown, capHill, slu, wedgewood, ballard]


wedgewood.render();
slu.render();
capHill.render();
downtown.render();
ballard.render();

