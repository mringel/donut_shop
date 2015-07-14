var DonutShoppe = function(location, options) {
  this.locationName = location;
  this.minCustomers = options.minCustomers;
  this.maxCustomers = options.maxCustomers;
  this.averagePerCustumer = options.averagePerCustomer;
  this.opens = options.opens || 600;
  this.closes = options.closes || 1800;
  this.hoursOpen = (this.closes - this.opens)/100;
}

DonutShoppe.prototype.hourForecast = function() {
  var customers = this.generateRandom(this.minCustomers,this.maxCustomers);
  return customers * this.averagePerCustumer;
}

DonutShoppe.prototype.generateRandom = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
 

DonutShoppe.prototype.render = function() {
  var dayTotal = 0;
  var addRow = document.createElement('tr');
  addRow.setAttribute('id', this.locationName);
  var locationCol = document.createElement('td');
  locationCol.innerHTML = this.locationName;
  addRow.appendChild(locationCol);

  for (var i = 0; i < this.hoursOpen; i++) {
    var hourEntry = document.createElement('td');
    hourEntry.setAttribute('class', this.locationName);
    var wholeDonuts = Math.ceil(this.hourForecast());
    dayTotal += wholeDonuts;
    hourEntry.innerHTML = wholeDonuts;
    addRow.appendChild(hourEntry);    
  };

  var totalCol = document.createElement('td');
  totalCol.innerHTML = dayTotal;
  addRow.appendChild(totalCol);

  document.getElementById('outputTable').appendChild(addRow);
} // close render function

var downtown = new DonutShoppe('Downtown', {minCustomers: 8, maxCustomers: 43, averagePerCustomer: 4.5});
downtown.render();

var capHill = new DonutShoppe('Capitol Hill', {minCustomers: 4, maxCustomers: 37, averagePerCustomer: 2});
capHill.render();

var slu = new DonutShoppe('South Lake Union', {minCustomers: 9, maxCustomers: 23, averagePerCustomer: 6.33});
slu.render();

var wedgewood = new DonutShoppe('Wedgewood', {minCustomers: 2, maxCustomers: 28, averagePerCustomer: 1.25});
wedgewood.render();

var ballard = new DonutShoppe('Ballard', {minCustomers: 8, maxCustomers: 58, averagePerCustomer: 3.75});
ballard.render();

