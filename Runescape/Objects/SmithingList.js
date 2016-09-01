function SmithingList(ctrl) {
    var self = this;
    self.ctrl = ctrl;
    self.idsURL = "\/Runescape\/Resources\/bars.json";
    self.bar = {};
    self.items = [];
    self.loading = false;
    self.ids = [];
    self.tabledata;
    self.table;


    self.loadItems = function () {

        console.log("loading items");
        $.ajax({
            url: self.idsURL,
            success: function (result) {
                self.ids = result;
                self.bindselector();
                self.loadFromMaterial();

                // for (j = 0; j < self.ids.length; j++) {
                //     self.items[j] = {};
                //     //console.log(self.items[j]);
                //     self.items[j].three = new Item(self.ids[j].three, self);
                //     self.items[j].four = new Item(self.ids[j].four, self);
                // }
                // console.log(self.items.length);

            }
        });

    }

    self.checkDone = function () {
        var done = true;
        for (i = 0; i < self.items.length; i++) {
            if (self.items[i].selling == undefined) {
                done = false;
            }
        }
        if (done) {
            console.log("done loading");
            self.loadTable();
        }
    }

    self.loadFromMaterial = function () {
        var material = $('#smithselector').val();
        var matno;
        for (j = 0; j < self.ids.length; j++) {
            if (self.ids[j].name == material) {
                matno = j;
                break;
            }
        }
        self.material = {};
        self.material = new Item(self.ids[matno].bar, self);
        self.items = [];
        for (k = 0; k < self.ids[matno].items.length; k++) {
            self.items[k] = new Item(self.ids[matno].items[k].id, self);
            if (self.ids[matno].items.makes != undefined) {
                self.items[k].makes = self.ids[matno].items.makes;
            } else {
                self.items[k].makes = 1;
            }
            if (self.ids[matno].items.needs != undefined) {
                self.items[k].needs = self.ids[matno].items.needs;
            } else {
                self.items[k].needs = 1;
            }
        }
    }

    self.loadTable = function () {
        if (!self.loading) {
            self.loading = true;
            console.log("loading table");
            $('#material').text(" " + self.material.name);
            $('#materialprice').text(" " + self.material.buying);
            self.tabledata = [];
            
            for (i = 0; i < self.items.length; i++) {
                var data = [self.items[i].name, 
                self.items[i].makes, 
                self.items[i].selling, 
                self.items[i].needs, 
                (parseInt(self.items[i].makes) * parseInt(self.items[i].selling) - parseInt(self.material.buying) * parseInt(self.items[i].needs))];
                self.tabledata.push(data);
            }
            if(self.table == undefined){
                self.table = $('#smithtable').dataTable({
                    data: self.tabledata,
                    order: [[4, "desc"]],
                    paging: false,
                    bFilter: false
                });
            } else {
                self.table.fnClearTable()
                self.table.fnAddData(self.tabledata);
            }
        }
    };

    self.bindselector = function () {
        $('#smithselector').on('change', function () {
            console.log("changed material needs reloading");
            self.loading = false;
            self.loadFromMaterial();
        });

    }






    self.loadItems();
}


