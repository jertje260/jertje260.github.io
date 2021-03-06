function RSCtrl(app, page) {
    var self = this;
    self.baseurl = "https://api.rsbuddy.com/grandExchange?a=guidePrice&i=";
    self.pngurl = "http://cdn.rsbuddy.com/items/"; //+id.png 
    self.itemsUrl = "\/Runescape\/Resources\/newObjects.json"
    self.decanting;
    self.smithing;
    self.itemList;

    self.load = function () {
        if (self.itemList == undefined) {
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
        } else if(page == "cleaning"){
            app.loadPage(app.pagelist["/runescape/?page=cleaning"], function () {
                console.log("cleaning page loaded");
                self.loadCleaning();
            });
        } else if(page == "jewellery"){
            app.loadPage(app.pagelist["/runescape/?page=jewellery"], function () {
                console.log("cleaning page loaded");
                self.loadJewellery();
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

    self.loadCleaning = function(){
        if(self.cleaning == undefined){
            self.cleaning = new CleaningList(self);
        }
    }

    self.loadJewellery = function(){
        if(self.jewellery == undefined){
            self.jewellery = new JewelleryList(self);
        }
    }

    self.getItemName = function (id) {
        return self.itemList[id].name;
    }


}