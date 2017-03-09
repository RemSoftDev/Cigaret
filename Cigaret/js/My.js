// Actual date
var today = new Date();
var dd    = today.getDate();
var mm    = today.getMonth() + 1; //January is 0!
var yyyy  = today.getFullYear();
var yy    = today.getFullYear().toString().substr(2, 2);

// if TodayCostNum in new day and it does not exist
if (isNaN(localStorage.getItem("TodayCostNum" + dd + mm + yyyy)) ||
    localStorage.getItem("TodayCostNum" + dd + mm + yyyy) == '' ||
    localStorage.getItem("TodayCostNum" + dd + mm + yyyy) === null) {    
    localStorage.setItem("TodayCostNum" + dd + mm + yyyy, "0");
}

// if TodayAmountNum in new day and it does not exist
if (isNaN(localStorage.getItem("TodayAmountNum" + dd + mm + yyyy)) ||
    localStorage.getItem("TodayAmountNum" + dd + mm + yyyy) == '' ||
    localStorage.getItem("TodayAmountNum" + dd + mm + yyyy) === null) {
    localStorage.setItem("TodayAmountNum" + dd + mm + yyyy, "0");
}

// if PacketCostNum in new day and it does not exist
if (isNaN(localStorage.getItem("PacketCostNum")) ||
    localStorage.getItem("PacketCostNum") == '' ||
    localStorage.getItem("PacketCostNum") === null) {
    localStorage.setItem("PacketCostNum", "0");
}

// if NumberOfCigaretteNum in new day and it does not exist
if (isNaN(localStorage.getItem("NumberOfCigaretteNum")) ||
    localStorage.getItem("NumberOfCigaretteNum") == '' ||
    localStorage.getItem("NumberOfCigaretteNum") === null) {
    localStorage.setItem("NumberOfCigaretteNum", "0");
}

//localStorage.setItem("TodayAmountNum" + dd + mm + yyyy, "0");
//localStorage.setItem("TodayCostNum" + dd + mm + yyyy, "0");
//localStorage.setItem("PacketCostNum" + dd + mm + yyyy, "0");
//localStorage.setItem("NumberOfCigaretteNum" + dd + mm + yyyy, "0");

// Initialize TodayAmountNum after starting app
$("#TodayAmountNum").text(parseInt(localStorage.getItem("TodayAmountNum" + dd + mm + yyyy)));

// Hide other pages exept main
$("#SettingsPage").hide();
$("#GraphPage").hide();

// Count up a TodayCostNum
var todayCostNum = 0.00;
function TodayCostNum() {
    var PacketCostNum = parseFloat(localStorage.getItem("PacketCostNum")).toFixed(2);
    var NumberOfCigaretteNum = (parseFloat(localStorage.getItem("NumberOfCigaretteNum")) + 0.01).toFixed(2);
    var TodayAmountNum = parseFloat(localStorage.getItem("TodayAmountNum" + dd + mm + yyyy)).toFixed(2);
    todayCostNum = PacketCostNum / NumberOfCigaretteNum;
    
    if (isNaN(todayCostNum))
    {
        todayCostNum = 0;
    }

    localStorage.setItem("TodayCostNum" + dd + mm + yyyy, (parseFloat(todayCostNum) + parseFloat(localStorage.getItem("TodayCostNum" + dd + mm + yyyy))).toFixed(2));
}

// Initialize TodayCostNum after starting app
$("#TodayCostNum").text(localStorage.getItem("TodayCostNum" + dd + mm + yyyy));

// Event handler fo button Settings
$("#Settings").click(function () {
    $("#MainPage").hide();
    $("#SettingsPage").show();
    $("#PacketCostNum").text(localStorage.getItem("PacketCostNum"));
    $("#NumberOfCigaretteNum").text(localStorage.getItem("NumberOfCigaretteNum"));
});

// Event handler fo button Graph
$("#Graph").click(function () {
    $("#MainPage").hide();
    $("#GraphPage").show();
    $("#chartdivWeek").show();
});

// Event handler fo button BackSettings in page Settings
$("#BackSettings").click(function () {
    $("#SettingsPage").hide();
    $("#MainPage").show();

    $("#chartdivMonth").hide();
    $("#chartdivWeek").hide();
    $("#chartdivYear").hide();

    localStorage.setItem("PacketCostNum", $("#PacketCostNum").text());
    localStorage.setItem("NumberOfCigaretteNum", $("#NumberOfCigaretteNum").text());
});

// Event handler fo button BackSettings in page Graph
$("#BackGraph").click(function () {
    $("#GraphPage").hide();
    $("#MainPage").show();

    $("#chartdivMonth").hide();
    $("#chartdivWeek").hide();
    $("#chartdivYear").hide();
});

// Event handler fo button Add (+)
$("#Add").click(function () {
    var prevNum = $("#TodayAmountNum").text();
    $("#TodayAmountNum").text(parseInt(prevNum) + 1);
    localStorage.setItem("TodayAmountNum" + dd + mm + yyyy, $("#TodayAmountNum").text());
    TodayCostNum();
    $("#TodayCostNum").text(localStorage.getItem("TodayCostNum" + dd + mm + yyyy));
});

// var in what section is applaying changes PacketCost or NumberOfCigarette
var changingInSettings = "PacketCost";

// Digit for change
var number = "0";

// Event handler fo button PacketCost 
$("#PacketCost").click(function () {
    changingInSettings = "PacketCost";
    number = "";
});

// Event handler fo button NumberOfCigarette 
$("#NumberOfCigarette").click(function () {
    changingInSettings = "NumberOfCigarette";
    number = "";
});

// Event handler fo button 0-9 
$("#b0").add("#b1").add("#b2").add("#b3").add("#b4").add("#b5").add("#b6").add("#b7").add("#b8").add("#b9").add("#Point").click(function () {
    var temp = number.split(".");
    var filteredNumberFromButton = $(this).text();

    if ($(this).attr("id") == "Point") {
        if (temp.length < 2 && number != "")
        {
            number = number + filteredNumberFromButton;
            $("#" + changingInSettings + "Num").text(number);
        }
    }
    else
    {      
        if (number + filteredNumberFromButton != "00")
        {
            number = number + filteredNumberFromButton;
            $("#" + changingInSettings + "Num").text(number);
        }
    }
});

// Event handler fo button Del 
$("#Del").click(function () {
    number = "";
    $("#" + changingInSettings + "Num").text("?");
});

// Event handler fo button Clear 
$("#Clear").click(function () {
    number = number.substring(0, number.length - 1);
    if (number.length == 0) {
        number = "";
        $("#" + changingInSettings + "Num").text("?");
    }
    else {
        $("#" + changingInSettings + "Num").text(number);
    }
});

if (typeof (Storage) !== "undefined") {
    //alert("ok");
} else {
    alert("no");
}

// The name of months for creating chart 
var month = new Array();
month[1] = "Jan";
month[2] = "Feb";
month[3] = "Mar";
month[4] = "Apr";
month[5] = "May";
month[6] = "Jun";
month[7] = "Jul";
month[8] = "Aug";
month[9] = "Sep";
month[10] = "Oct";
month[11] = "Nov";
month[12] = "Dec";

// var Data for creation year chart
var dataForYearChartLineYear = Array();
// var Data for creation week chart
var dataForYearChartLineWeek = Array();
// var Data for creation month chart
var dataForYearChartLineMonth = Array();

// Initialize var for year chart
function DataForYearChart() {
    for (var i = 1; i < 13; i++) {
        for (var j = 0; j < 30; j++) {
            if (isNaN(localStorage.getItem("TodayCostNum" + j + i + yyyy)) ||
                localStorage.getItem("TodayCostNum" + j + i + yyyy) == '' ||
                localStorage.getItem("TodayCostNum" + j + i + yyyy) == null
                ) {
            }
            else {
                tempArray = Array();
                tempArray.push(j + "-" + month[i] + "-" + yy);
                var sdf = 1.11;
                sdf = parseFloat(localStorage.getItem("TodayCostNum" + j + i + yyyy)).toFixed(2);
                tempArray.push(parseFloat(sdf));
                dataForYearChartLineYear.push(tempArray);
            }
        }
    }

}

// Initialize var for week chart. It is counting last 7 days (1 week)
function DataForWeekChart() {
    if (dd > 6) {
        for (var i = dd; i > parseInt(dd) - 7; i--) {
            if (isNaN(localStorage.getItem("TodayCostNum" + i + mm + yyyy)) ||
                localStorage.getItem("TodayCostNum" + i + mm + yyyy) == '' ||
                localStorage.getItem("TodayCostNum" + i + mm + yyyy) == null
                ) {
            }
            else {
                tempArray = Array();
                tempArray.push(i + "-" + month[mm] + "-" + yy);
                var sdf = 1.11;
                sdf = parseFloat(localStorage.getItem("TodayCostNum" + i + mm + yyyy)).toFixed(2);
                tempArray.push(parseFloat(sdf));
                dataForYearChartLineWeek.push(tempArray);

            }
        }
    }
    else {
        var different = 7 - dd;

        for (var i = 1; i < parseInt(dd) + 1; i++) {
            if (isNaN(localStorage.getItem("TodayCostNum" + i + mm + yyyy)) ||
                localStorage.getItem("TodayCostNum" + i + mm + yyyy) == '' ||
                localStorage.getItem("TodayCostNum" + i + mm + yyyy) == null
                ) {
            }
            else {
                tempArray = Array();
                tempArray.push(i + "-" + month[mm] + "-" + yy);
                var sdf = 1.11;
                sdf = parseFloat(localStorage.getItem("TodayCostNum" + i + mm + yyyy)).toFixed(2);
                tempArray.push(parseFloat(sdf));
                dataForYearChartLineWeek.push(tempArray);
            }
        }
        //console.log(dataForYearChartLine);
        var prevMonth;
        var prevYear;
        var prevYearShort;
        if (mm == 1) {
            prevYear = yyyy - 1;
            prevYearShort = yy - 1;
            prevMonth = 12;
        }
        else {
            prevYear = yyyy;
            prevYearShort = yy;
            prevMonth = mm - 1;
        }

        var d = new Date(prevYear, prevMonth, 0);

        for (var i = d.getDate() ; i > parseInt(d.getDate()) - different; i--) {
            if (isNaN(localStorage.getItem("TodayCostNum" + i + prevMonth + prevYear)) ||
                localStorage.getItem("TodayCostNum" + i + prevMonth + prevYear) == '' ||
                localStorage.getItem("TodayCostNum" + i + prevMonth + prevYear) == null
                ) {
            }
            else {
                tempArray = Array();
                tempArray.push(i + "-" + month[prevMonth] + "-" + prevYearShort);
                var sdf = 1.11;
                sdf = parseFloat(localStorage.getItem("TodayCostNum" + i + prevMonth + prevYear)).toFixed(2);
                tempArray.push(parseFloat(sdf));
                dataForYearChartLineWeek.push(tempArray);
            }
        }
    }

}

// Initialize var for month chart. It is counting last 30 days (1 month)
function DataForMonthChart() {
    if (dd > 30) {
        for (var i = dd; i > parseInt(dd) - 30; i--) {
            if (isNaN(localStorage.getItem("TodayCostNum" + i + mm + yyyy)) ||
                localStorage.getItem("TodayCostNum" + i + mm + yyyy) == '' ||
                localStorage.getItem("TodayCostNum" + i + mm + yyyy) == null
                ) {
            }
            else {
                tempArray = Array();
                tempArray.push(i + "-" + month[mm] + "-" + yy);
                var sdf = 1.11;
                sdf = parseFloat(localStorage.getItem("TodayCostNum" + i + mm + yyyy)).toFixed(2);
                tempArray.push(parseFloat(sdf));
                dataForYearChartLineMonth.push(tempArray);

            }
        }
    }
    else {
        var different = 30 - dd;

        for (var i = 1; i < parseInt(dd) + 1; i++) {
            if (isNaN(localStorage.getItem("TodayCostNum" + i + mm + yyyy)) ||
                localStorage.getItem("TodayCostNum" + i + mm + yyyy) == '' ||
                localStorage.getItem("TodayCostNum" + i + mm + yyyy) == null
                ) {
            }
            else {
                tempArray = Array();
                tempArray.push(i + "-" + month[mm] + "-" + yy);
                var sdf = 1.11;
                sdf = parseFloat(localStorage.getItem("TodayCostNum" + i + mm + yyyy)).toFixed(2);
                tempArray.push(parseFloat(sdf));
                dataForYearChartLineMonth.push(tempArray);
            }
        }
        //console.log(dataForYearChartLine);
        var prevMonth;
        var prevYear;
        var prevYearShort;
        if (mm == 1) {
            prevYear = yyyy - 1;
            prevYearShort = yy - 1;
            prevMonth = 12;
        }
        else {
            prevYear = yyyy;
            prevYearShort = yy;
            prevMonth = mm - 1;
        }

        var d = new Date(prevYear, prevMonth, 0);

        for (var i = d.getDate() ; i > parseInt(d.getDate()) - different; i--) {
            if (isNaN(localStorage.getItem("TodayCostNum" + i + prevMonth + prevYear)) ||
                localStorage.getItem("TodayCostNum" + i + prevMonth + prevYear) == '' ||
                localStorage.getItem("TodayCostNum" + i + prevMonth + prevYear) == null
                ) {
            }
            else {
                tempArray = Array();
                tempArray.push(i + "-" + month[prevMonth] + "-" + prevYearShort);
                var sdf = 1.11;
                sdf = parseFloat(localStorage.getItem("TodayCostNum" + i + prevMonth + prevYear)).toFixed(2);
                tempArray.push(parseFloat(sdf));
                dataForYearChartLineMonth.push(tempArray);
            }
        }
    }

}

DataForYearChart();
DataForWeekChart();
DataForMonthChart();

console.log(dataForYearChartLineMonth);
$.jqplot('chartdiv1', [[[1, 2], [3, 5.12], [5, 13.1], [7, 33.6], [9, 85.9], [11, 219.9]]]);

/*
var line2 = [['23-May-08', 578.55], ['20-Jun-08', 566.5], ['25-Jul-08', 480.88], ['22-Aug-08', 509.84],
    ['26-Sep-08', 454.13], ['24-Oct-08', 379.75], ['21-Nov-08', 303], ['26-Dec-08', 308.56],
    ['23-Jan-09', 299.14], ['20-Feb-09', 346.51], ['20-Mar-09', 325.99], ['24-Apr-09', 386.15]];
*/

// Creating chart year
function chartdivYearShow() {
    $.jqplot('chartdivYear', [dataForYearChartLineYear], {
        title: 'Year -  Cost per day',
        axes: {
            xaxis: {
                renderer: $.jqplot.DateAxisRenderer,
                tickOptions: {
                    formatString: '%b&nbsp;%d'
                }
            },
            yaxis: {
                tickOptions: {
                    formatString: '%.2f'
                }
            }
        },
        highlighter: {
            show: true,
            sizeAdjust: 7.5
        },
        cursor: {
            show: false
        }
    });
}

// Creating chart week
function chartdivWeekShow() {
    $.jqplot('chartdivWeek', [dataForYearChartLineWeek], {
        title: 'Week -  Cost per day',
        axes: {
            xaxis: {
                renderer: $.jqplot.DateAxisRenderer,
                tickOptions: {
                    formatString: '%b&nbsp;%d'
                }
            },
            yaxis: {
                tickOptions: {
                    formatString: '%.2f'
                }
            }
        },
        highlighter: {
            show: true,
            sizeAdjust: 7.5
        },
        cursor: {
            show: false
        }
    });
}

// Creating chart month
function chartdivMonthShow() {
    $.jqplot('chartdivMonth', [dataForYearChartLineMonth], {
        title: 'Month -  Cost per day',
        axes: {
            xaxis: {
                renderer: $.jqplot.DateAxisRenderer,
                tickOptions: {
                    formatString: '%b&nbsp;%d'
                }
            },
            yaxis: {
                tickOptions: {
                    formatString: '%.2f'
                }
            }
        },
        highlighter: {
            show: true,
            sizeAdjust: 7.5
        },
        cursor: {
            show: false
        }
    });
}


chartdivYearShow();
$("#GraphYear").click(function () {
    $("#chartdivMonth").hide();
    $("#chartdivWeek").hide();
    $("#chartdivYear").show();

});

chartdivWeekShow();
$("#GraphWeek").click(function () {
    $("#chartdivYear").hide();
    $("#chartdivMonth").hide();
    $("#chartdivWeek").show();
});

chartdivMonthShow();
$("#GraphMonth").click(function () {
    $("#chartdivYear").hide();
    $("#chartdivWeek").hide();
    $("#chartdivMonth").show();
});

$("#chartdivMonth").hide();
$("#chartdivWeek").hide();
$("#chartdivYear").hide();

// Events handler for mousedown/mouseleave - GraphWeek
$("#GraphWeek").mousedown(function () {
    $(this).removeClass("NotPressedButtonImgCartsWeekMonthYear");
    $(this).addClass("PressedButtonImgCartsWeekMonthYear");
});
$("#GraphWeek").mouseleave(function () {
    $(this).removeClass("PressedButtonImgCartsWeekMonthYear");
    $(this).addClass("NotPressedButtonImgCartsWeekMonthYear");
});
$("#GraphWeek").mouseup(function () {
    $(this).removeClass("PressedButtonImgCartsWeekMonthYear");
    $(this).addClass("NotPressedButtonImgCartsWeekMonthYear");
});

// Events handler for mousedown/mouseleave - GraphMonth
$("#GraphMonth").mousedown(function () {
    $(this).removeClass("NotPressedButtonImgCartsWeekMonthYear");
    $(this).addClass("PressedButtonImgCartsWeekMonthYear");
});
$("#GraphMonth").mouseleave(function () {
    $(this).removeClass("PressedButtonImgCartsWeekMonthYear");
    $(this).addClass("NotPressedButtonImgCartsWeekMonthYear");
});
$("#GraphMonth").mouseup(function () {
    $(this).removeClass("PressedButtonImgCartsWeekMonthYear");
    $(this).addClass("NotPressedButtonImgCartsWeekMonthYear");
});

// Events handler for mousedown/mouseleave - GraphYear
$("#GraphYear").mousedown(function () {
    $(this).removeClass("NotPressedButtonImgCartsWeekMonthYear");
    $(this).addClass("PressedButtonImgCartsWeekMonthYear");
});
$("#GraphYear").mouseleave(function () {
    $(this).removeClass("PressedButtonImgCartsWeekMonthYear");
    $(this).addClass("NotPressedButtonImgCartsWeekMonthYear");
});
$("#GraphYear").mouseup(function () {
    $(this).removeClass("PressedButtonImgCartsWeekMonthYear");
    $(this).addClass("NotPressedButtonImgCartsWeekMonthYear");
});


// Events handler for mousedown/mouseleave - BackGraph
$("#BackGraph").mousedown(function () {
    var item = $(this);

    item.removeClass("NotPressedButtonImgBackButton");
    item.addClass("PressedButtonImgBackButton");   
});
$("#BackGraph").mouseleave(function () {
    $(this).removeClass("PressedButtonImgBackButton");
    $(this).addClass("NotPressedButtonImgBackButton");
});

// Events handler for mousedown/mouseleave - BackSettings
$("#BackSettings").mousedown(function () {
    $(this).removeClass("NotPressedButtonImgBackButton");
    $(this).addClass("PressedButtonImgBackButton");
});
$("#BackSettings").mouseleave(function () {
    $(this).removeClass("PressedButtonImgBackButton");
    $(this).addClass("NotPressedButtonImgBackButton");
});

// Events handler for mousedown/mouseleave - Add
$("#Add").mousedown(function () {
    $(this).removeClass("NotPressedButtonImgAddCigarette");
    $(this).addClass("PressedButtonImgAddCigarette");
});
$("#Add").mouseleave(function () {
    $(this).removeClass("PressedButtonImgAddCigarette");
    $(this).addClass("NotPressedButtonImgAddCigarette");
});
$("#Add").mouseup(function () {
    $(this).removeClass("PressedButtonImgAddCigarette");
    $(this).addClass("NotPressedButtonImgAddCigarette");
});

// Events handler for mousedown/mouseleave - Settings
$("#Settings").mousedown(function () {
    $(this).removeClass("NotPressedButtonImgSettings");
    $(this).addClass("PressedButtonImgSettings");
});
$("#Settings").mouseleave(function () {
    $(this).removeClass("PressedButtonImgSettings");
    $(this).addClass("NotPressedButtonImgSettings");
});

// Events handler for mousedown/mouseleave - Graph
$("#Graph").mousedown(function () {
    $(this).removeClass("NotPressedButtonImgGraph");
    $(this).addClass("PressedButtonImgGraph");
});
$("#Graph").mouseleave(function () {
    $(this).removeClass("PressedButtonImgGraph");
    $(this).addClass("NotPressedButtonImgGraph");
});

// Events handler for mousedown/mouseleave - PacketCost
$("#PacketCost").mousedown(function () {
    $(this).removeClass("NotPressedButtonImgCountRed");
    $(this).addClass("PressedButtonImgAddCigarette");
});
$("#PacketCost").mouseleave(function () {
    $(this).removeClass("NotPressedButtonImgCountRed");
    $(this).addClass("NotPressedButtonImgCountRed");
});
$("#PacketCost").mouseup(function () {
    $(this).removeClass("NotPressedButtonImgCountRed");
    $(this).addClass("NotPressedButtonImgCountRed");
});

// Events handler for mousedown/mouseleave - NumberOfCigarette
$("#NumberOfCigarette").mousedown(function () {
    $(this).removeClass("NotPressedButtonImgCountRed");
    $(this).addClass("PressedButtonImgCountRed");
});
$("#NumberOfCigarette").mouseleave(function () {
    $(this).removeClass("PressedButtonImgCountRed");
    $(this).addClass("NotPressedButtonImgCountRed");
});
$("#NumberOfCigarette").mouseup(function () {
    $(this).removeClass("PressedButtonImgCountRed");
    $(this).addClass("NotPressedButtonImgCountRed");
});