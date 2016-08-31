var ids;
var itemsURL = "objects.json";
var idsURL = "pots.json";
var allItems;
var rsbase = "http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item="
var baseurl = "https://api.rsbuddy.com/grandExchange?a=guidePrice&i=";
var items = [];
var loading = false;


var getItemName = function (id) {
    //console.log(id);
    for (i = 0; i < allItems.length; i++) {
        if (allItems[i].id === id) {
            return allItems[i];
        }
    }
    return null;
}


var checkDone = function () {
    var done = true;
    for (i = 0; i < items.length; i++) {
        if (items[i].three.buying == undefined || items[i].four.buying == undefined) {
            done = false;
        }
    }
    if (done) {
        console.log(items);
        console.log("done loading");
        loadTable();
    }
}

var loadTable = function () {
    if (!loading) {
        loading = true;
        console.log("loading table");
        for (i = 0; i < items.length; i++) {
            if (items[i].three.buying != 0 && items[i].four.selling != 0) {
                var newRow = "<tr><td>" + items[i].three.name.replace("(3)", "") +
                    "</td><td>" + items[i].three.buying +
                    "</td><td>" + items[i].four.buying +
                    "</td><td>" + (parseInt(items[i].three.buying) / 3) +
                    "</td><td>" + (parseInt(items[i].four.selling) / 4) +
                    "</td><td>" + ((parseInt(items[i].four.selling) / 4) - (parseInt(items[i].three.buying) / 3)) +
                    "</td></tr>"
                $('#decanting tbody').append(newRow);
            }else {
                console.log(items[i]);
            }
        }
        $('#decanting').DataTable({
            "order": [[5, "desc"]],
            "paging": false
            
        });
    }
}

var recalculate = function(){
    console.log('recalculating');
    var t = $('#3').val();
    var f = $('#4').val();
    var out = (f/4-t/3);
    // console.log(t);
    // console.log(f);
    // console.log(out);
    $('#output').text(out);
}

loadItems();

$('#3').change(function(){
    recalculate();
});
$('#4').change(function(){
    recalculate();
})
