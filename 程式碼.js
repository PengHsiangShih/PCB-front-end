//Connect between apps script and html
function doGet() {
  var html_1 = HtmlService.createTemplateFromFile("index")
  var check_1 = html_1.evaluate();
  var display_1 = check_1.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return display_1;
}

//Get data range from Google Sheet
function getData(sheet_name, column_number, column_range){
  var spreadsheet_1 = SpreadsheetApp.getActiveSpreadsheet();
  var sheet_1 = spreadsheet_1.getSheetByName(sheet_name);
  var data_1 = sheet_1.getDataRange().getValues();
  if (column_range===1){
    return transfer_func(sheet_1.getRange(2, column_number, data_1.length-1, column_range).getValues());
  }
  else {
    return sheet_1.getRange(2, column_number, data_1.length-1, column_range).getValues();
  } 
}

//Get defect data
function show_defect(defect_1){
  defect_array = getData('工作表2',1,7);
  sub_defect_array = [];
  for(var i=1;i<defect_array.length;i++){
    if(defect_array[i][0]==defect_1){
      sub_defect_array.push(defect_array[i]);
    }
  }
  //console.log(sub_defect_array[0][1].split('.')[0])
  if(sub_defect_array.length>=1){
    return sub_defect_array
  }
  if(sub_defect_array.length==0){
  return -1
  }
  
}

//Sum array of defect
function show_sum(){
  defect_array = getData('工作表2',1,1)
  const count = {}
  for(var i=0;i<defect_array.length;i++){
    var ele = defect_array[i];
    if(count[ele]){
      count[ele] += 1;
    }else{
      count[ele] = 1;
    }  
  }
  console.log(Object.entries(count))
  return Object.entries(count)
}


//Transfer second level elements to first level
function transfer_func(trans_array){
  var new_array = [];
  for(var i=0; i<trans_array.length;i++){
    new_array.push(trans_array[i][0]);
  }
  return new_array;
}


//Get file list from google drive
function getFilesName(){
var files = DriveApp.searchFiles(
    'modifiedDate > "2024-3-1" and title contains "ann_"');
var sheet = SpreadsheetApp.getActive().getSheetByName("工作表3");
sheet.clear();
var rows = [];
rows.push(["Name", "ID" , "Url"]);
    while (files.hasNext()) {
        var file = files.next();
           if(file != null) {
                rows.push([file.getName(),file.getId(), file.getUrl()]);
   }
        //console.log(file.getName());
}
sheet.getRange(1,1,rows.length,3).setValues(rows);
}

//Test function
function test_1(){
test_array = show_defect('Spur');
console.log(test_array)
}


