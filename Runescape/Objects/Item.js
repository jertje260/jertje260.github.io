function Item(id,list) {
    var self = this;
    self.id = id;
    self.name;
    self.buying;
    self.selling;
    self.average;


    self.load = function () {
        //item.load(baseurl+itemid);
        $.ajax({
            type: "GET",
            datatype: "json",
            url: list.ctrl.baseurl + id,
            success: function (data) {
                console.log(data);
                //item = data;


            }

        });
    };
    self.load();
}