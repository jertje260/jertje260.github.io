function DecantingList(ctrl) {
    var self = this;
    self.ctrl = ctrl;
    self.idsURL = "\/Runescape\/Resources\/pots.json";
    self.items = [];
    self.loading = false;
    self.ids = [];

    self.loadItems = function () {
        console.log("loading items");
        $.ajax({
            url: self.idsURL,
            success: function (result) {
                self.ids = result;
                //console.log(self.ids.length);
                for (j = 0; j < self.ids.length; j++) {
                    self.items[j] = {};
                    //console.log(self.items[j]);
                    self.items[j].three = new Item(self.ids[j].three, self);
                    self.items[j].four = new Item(self.ids[j].four, self);
                }
                console.log(self.items.length);

            }
        });

    }

    self.checkDone = function () {
        var done = true;
        for (i = 0; i < self.items.length; i++) {
            if (self.items[i].three.buying == undefined || self.items[i].four.selling == undefined) {
                done = false;
            }
        }
        if (done) {
            console.log("done loading");
            self.loadTable();
        }
    }

    self.loadTable = function(){
        if (!self.loading) {
        self.loading = true;
        console.log("loading table");
        for (i = 0; i < self.items.length; i++) {
            if (self.items[i].three.buying != 0 && self.items[i].four.selling != 0) {
                var newRow = "<tr><td>" + self.items[i].three.name.replace("(3)", "") +
                    "</td><td>" + self.items[i].three.buying +
                    "</td><td>" + self.items[i].four.buying +
                    "</td><td>" + (parseInt(self.items[i].three.buying) / 3) +
                    "</td><td>" + (parseInt(self.items[i].four.selling) / 4) +
                    "</td><td>" + ((parseInt(self.items[i].four.selling) / 4) - (parseInt(self.items[i].three.buying) / 3)) +
                    "</td></tr>"
                $('#decanting tbody').append(newRow);
            }else {
                console.log(self.items[i].three.name);
            }
        }
        $('#decanting').DataTable({
            "order": [[5, "desc"]],
            "paging": false
            
        });
    }
    };

    self.loadItems();
}


