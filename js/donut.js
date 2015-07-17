var DonutShoppe = function(location, options) {
  this.locationName = location;
  this.minCustomers = options.minCustomers;
  this.maxCustomers = options.maxCustomers;
  this.averagePerCustomer = options.averagePerCustomer;
  this.opens = options.opens || 600;
  this.closes = options.closes || 1800;
  this.hoursOpen = (this.closes - this.opens)/100;
};

DonutShoppe.prototype.hourForecast = function() {
  var customers = this.generateRandom(this.minCustomers,this.maxCustomers);
  return customers * this.averagePerCustomer;
};

DonutShoppe.prototype.generateRandom = function(min, max) {
  return Math.floor((Math.random() * (max - min +1)) + min);
};
 

DonutShoppe.prototype.render = function() {
  var dayTotal = 0;
  var addRow = document.createElement('tr');
  var tbl = document.getElementById('donutTable');
  addRow.setAttribute('id', this.locationName);
  
  if (tbl.rows.length % 2 == 0) {
    // looks backwards, I know, but trust me
    addRow.setAttribute('class', 'odd');  
  } else{
    addRow.setAttribute('class', 'even');
  };
  var locationCol = document.createElement('td');
  locationCol.setAttribute('class', 'locCol');

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

  tbl.lastChild.appendChild(addRow);

}; // close render function


// updates an existing row
DonutShoppe.prototype.updateRow = function() {
  var dayTotal = 0;
  var row = document.getElementById(this.locationName);
  var cells = row.childNodes;
  for (var i = 1; i < cells.length-1; i++) {
    //console.log("times through for loop" + (i));
    var wholeDonuts = Math.ceil(this.hourForecast());
    cells[i].textContent = wholeDonuts;
    dayTotal += wholeDonuts;
  }
  cells[cells.length-1].textContent = dayTotal;
};

// creates the table
var createTable = function(){
  var tbl = document.createElement('table');
  tbl.setAttribute('id', 'donutTable');
  var tblhead = document.createElement('thead');

  
  // creates top row for header information
  var topRow = tblhead.insertRow();
  
  // create header label for locations
  var lCell = topRow.insertCell();
  lCell.rowSpan = "2";
  lCell.setAttribute('class', 'th1');
  lCell.appendChild(document.createTextNode('Location'));
  
  // create header label for hours
  var hCell = topRow.insertCell();
  hCell.colSpan = "12";
  hCell.setAttribute('align', 'center');
  hCell.appendChild(document.createTextNode('Hours'));
  
  
  // create header label for daily totals
  var tCell = topRow.insertCell();
  tCell.rowSpan = "2";
  tCell.setAttribute('class','thLast');
  tCell.appendChild(document.createTextNode('Daily Total'));
  
  // create a row for hour header and populate with for loop
  var hRow = tblhead.insertRow();
  
  for (var i = 0; i < 12; i++) {
    var newCell = hRow.insertCell();
    hourSpan = (i+6)*100;
    hourConverted = (hourSpan < 1000) ? "0" + hourSpan : hourSpan;
    newCell.appendChild(document.createTextNode(hourConverted));
    }

document.getElementById('donutDiv').appendChild(tbl);
tbl.appendChild(tblhead);
tbl.appendChild(document.createElement('tbody'));
};

// search existing locations for a locationName
var exist = function(name) {
  for (var i = 0; i < allLocations.length; i++) {
    if (name === allLocations[i].locationName) {
      return i;
    }
  }
  return false;    

};


// creates a new Donut Shoppe object, adds it to the array, then renders it at the end of the table
function addNew(event) {
  event.preventDefault();
  loc = document.getElementById('name').value;
  min = parseInt(document.getElementById('minCustomers').value);
  max = parseInt(document.getElementById('maxCustomers').value);
  average = parseFloat(document.getElementById('avgDonuts').value);
  var check = exist(loc);

  if (check !== false) {
    allLocations[check].minCustomers = min;
    allLocations[check].maxCustomers = max;
    allLocations[check].averagePerCustomer = average;
    allLocations[check].updateRow();
  } else {
    var newLoc = new DonutShoppe(loc, {minCustomers: min, maxCustomers: max, averagePerCustomer: average});
    addLocation(newLoc);
    index = allLocations.length - 1;
    allLocations[index].render();
  }
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

updateTable();

// event listener for refresh button
var buttonRefresh = document.getElementById('buttonRefresh');
buttonRefresh.addEventListener('click', updateTable);

// event listener for new location form
elForm = document.getElementById('inputAddNew');
elForm.addEventListener('submit', addNew, false);

