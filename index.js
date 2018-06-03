// Get references to the tbody element, input fields and button
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");

var $loadMoreBtn = document.querySelector("#pagination");

// Control
var start = 0;
var perPage = 50;
$searchBtn.addEventListener("click", handleSearchButtonClick);
var filteredData = dataSet;

// renderTable renders dataset to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredData.length; i++) {
    // Get the current object and its fields
    var data = filteredData[i];
    var fields = Object.keys(data);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = data[field];
    }
  }
}

function handleSearchButtonClick() {
  var f_Date = $dateInput.value.trim().toLowerCase();
  var f_City = $cityInput.value.trim().toLowerCase();
  var f_Country = $countryInput.value.trim().toLowerCase();
  var f_State = $stateInput.value.trim().toLowerCase();
  var f_Shape = $shapeInput.value.trim().toLowerCase();

  filteredData = dataSet.filter(function(data) {
    var date_row = data.datetime.toLowerCase();
    var city_row = data.city.toLowerCase();
    var state_row = data.state.toLowerCase();
    var country_row = data.country.toLowerCase();
    var shape_row = data.shape.toLowerCase();

    var rows = 
      (f_Date === "" || date_row === f_Date) &&
      (f_City === "" || city_row === f_City) &&
      (f_Country === "" || country_row === f_Country) &&
      (f_State === "" || state_row === f_State) &&
      (f_Shape === "" || shape_row === f_Shape);
    return rows;

  });
  renderTable();
}

$loadMoreBtn.addEventListener("click", handleButtonClick);

function handleButtonClick() {
  start += perPage;
  renderTable();

  if (start + perPage >= filteredData.length) {
    $loadMoreBtn.classList.add("disabled");
    $loadMoreBtn.innerText = "All Data Loaded";
    $loadMoreBtn.removeEventListener("click", handleButtonClick);
  }
}

// Render the table for the first time on page load
renderTable();
