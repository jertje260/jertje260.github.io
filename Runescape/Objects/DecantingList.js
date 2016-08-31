function DecantingList(ctrl) {
    var self = this;
    self.ctrl = ctrl;
    self.idsURL = "\/Runescape\/Resources\/pots.json";
    self.items = [];
    self.loading = false;
    self.ids;

    self.loadItems = function () {
        console.log("loading items");
        // $.ajax({
        //     url: self.idsURL,
        //     success: function (result) {
        //         console.log(result);
        //         self.ids = result;
        //         // for (i = 0; i < self.ids.length; i++) {
        //         //     self.items[i] = {};
        //         //     self.items[i].three = new Item(self.ids[i].three, self);
        //         //     self.items[i].four = new Item(self.ids[i].four, self);
        //         // }
        //     }
        // });

    }
    
    self.loadItems();
}


