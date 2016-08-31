function RSCtrl(app) {
    var self = this;
    self.baseurl = "https://api.rsbuddy.com/grandExchange?a=guidePrice&i=";
    self.pngurl = "http://cdn.rsbuddy.com/items/"; //+id.png 
    self.itemsUrl = "\/Runescape\/Resources\/objects.json"
    self.decanting;
    self.itemList = [];

    self.load = function () {

        if (self.itemList == undefined) {
            $.ajax({
                url: self.itemsUrl,
                success: function (data) {
                    self.itemList = data;
                    console.log(self.itemList);
                }
            });
        }
        self.draw();
        self.bindEvents();
    }

    self.draw = function () {
        app.loadPage(app.pagelist["runescape/?page=decanting"], function () {
            console.log("decanting page loaded");
            self.loadDecanting();
        });


    }

    self.bindEvents = function () {
        console.log("binding events rsctrl");
    }

    self.loadDecanting = function () {
        if (self.decanting == undefined) {
            self.decanting = new DecantingList(self);
        }
    }


}