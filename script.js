var ids;
var itemsURL = "objects.json";
var idsURL = "pots.json";
var allItems;
var rsbase = "http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item="
var baseurl = "https://api.rsbuddy.com/grandExchange?a=guidePrice&i=";
var items = [];
var loading = false;

var loadItem = function (itemid, itemlistId, three) {
    //item.load(baseurl+itemid);
    $.ajax({
        type: "GET",
        datatype: "json",
        itemlistId: itemlistId,
        three: three,
        url: "" + baseurl + itemid,
        success: function (data) {
            //console.log(data);
            item = data;
            ti = getItemName(itemid);
            if (ti != undefined) {
                item.name = ti.name;
                item.id = ti.id;
            }
            if (three) {
                items[itemlistId].three = item;
            } else {
                items[itemlistId].four = item;
            }
            checkDone();
        }

    });
};
var getItemName = function (id) {
    console.log(id);
    for (i = 0; i < allItems.length; i++) {
        if (allItems[i].id === id) {
            return allItems[i];
        }
    }
    return null;
}
var loadItems = function () {
    $.ajax({
        url: itemsURL
    }).done(function (data) {
        allItems = data;
        $.ajax({
            url: idsURL
        }).done(function (result) {
            //console.log(allItems);
            ids = result;
            for (i = 0; i < ids.length; i++) {
                items[i] = {};
                items[i].three = {};
                items[i].four = {};
                loadItem(ids[i].three, i, true);
                loadItem(ids[i].four, i, false);
            }
        });

    });
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
            var newRow = "<tr><td>" + items[i].three.name.replace("(3)", "") +
                "</td><td>" + items[i].three.buying +
                "</td><td>" + items[i].four.buying +
                "</td><td>" + (parseInt(items[i].three.buying) / 3) +
                "</td><td>" + (parseInt(items[i].four.buying) / 4) +
                "</td><td>" + ((parseInt(items[i].four.buying) / 4) - (parseInt(items[i].three.buying) / 3)) +
                "</td></tr>"
            $('#decanting tbody').append(newRow);
        }
    }
}

loadItems();