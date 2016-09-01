function Item(id, list) {
    var self = this;
    self.id = id;
    self.name;
    self.buying;
    self.selling;
    self.average;


    self.load = function () {
        self.name = list.ctrl.getItemName(self.id);
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