function RSCtrl(app, page) {
    var self = this;
    self.baseurl = "https://api.rsbuddy.com/grandExchange?a=guidePrice&i=";
    self.pngurl = "http://cdn.rsbuddy.com/items/"; //+id.png 
    self.itemsUrl = "\/Runescape\/Resources\/objects.json"
    self.decanting;
    self.smithing;
    self.itemList = [];

    self.load = function () {
        if (self.itemList.length == 0) {
            $.ajax({
                url: self.itemsUrl,
                success: function (data) {
                    self.itemList = data;
                }
            });
        }
        self.draw();
        self.bindEvents();
    }

    self.draw = function () {
        if (page == "decanting") {
            app.loadPage(app.pagelist["/runescape/?page=decanting"], function () {
                console.log("decanting page loaded");
                self.loadDecanting();
            });

        } else if(page == "smithing"){
            app.loadPage(app.pagelist["/runescape/?page=smithing"], function () {
                console.log("smithing page loaded");
                self.loadSmithing();
            });
        }
    }

    self.bindEvents = function () {
        console.log("binding events rsctrl");
    }

    self.loadDecanting = function () {
        if (self.decanting == undefined) {
            self.decanting = new DecantingList(self);
        }
    }

    self.loadSmithing = function(){
        if(self.smithing == undefined){
            self.smithing = new SmithingList(self);
        }
    }

    self.getItemName = function (id) {
        for (i = 0; i < self.itemList.length; i++) {
            if (self.itemList[i].id == id) {
                return self.itemList[i].name;
            }
        }
    }


}