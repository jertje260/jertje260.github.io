function CleaningList(ctrl) {
    var self = this;
    self.ctrl = ctrl;
    self.idsURL = "\/Runescape\/Resources\/herbclean.json";
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
                    self.items[j].level = self.ids[j].level;
                    //console.log(self.items[j]);
                    self.items[j][0] = new Item(self.ids[j].herb[0], self);
                    self.items[j][1] = new Item(self.ids[j].herb[1], self);
                }
                console.log(self.items.length);

            }
        });

    }

    self.checkDone = function () {
        var done = true;
        for (i = 0; i < self.items.length; i++) {
            if (self.items[i][0].buying == undefined || self.items[i][1].selling == undefined) {
                done = false;
            }
        }
        if (done) {
            console.log("done loading");
            self.loadTable();
        }
    }

    self.loadTable = function () {
        if (!self.loading) {
            self.loading = true;
            console.log("loading table");
            for (i = 0; i < self.items.length; i++) {
                if (self.items[i][0].buying != 0 && self.items[i][1].selling != 0) {
                    var newRow = "<tr><td>" + self.items[i][1].name +
                        "</td><td>" + self.items[i].level +
                        "</td><td>" + self.items[i][0].buying +
                        "</td><td>" + self.items[i][1].buying +
                        "</td><td>" + ((parseInt(self.items[i][1].selling)) - (parseInt(self.items[i][0].buying))) +
                        "</td></tr>";
                    $('#cleaning tbody').append(newRow);
                } else {
                    console.log(self.items[i][1].name);
                }
            }
            $('#cleaning').DataTable({
                "order": [[3, "desc"]],
                "paging": false,
                "bFilter": false

            });
        }
    }


    self.loadItems();
}


