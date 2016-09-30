function Item(id, list) {
    var self = this;
    self.id = id;
    self.name;
    self.buying;
    self.selling;
    self.average;
    // self.storeprice;
    // self.lowalch;
    // self.highalch


    self.load = function () {
        self.name = list.ctrl.getItemName(self.id);
        // self.storeprice = list.ctrl.getStorePrice(self.id);
        // self.lowalch = 0.3*self.storeprice;
        // self.highalch = 0.6*self.storeprice;
        $.ajax({
            type: "GET",
            datatype: "json",
            url: list.ctrl.baseurl + id,
            success: function (data) {
                //console.log(data);
                //item = data;
                self.buying = data.buying;
                self.selling = data.selling;
                self.buyingQuantity = data.buyingQuantity;
                self.sellingQuantity = data.sellingQuantity;
                //console.log(self);
                list.checkDone();
            }

        });
    };

    self.load();
}