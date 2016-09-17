function JewelleryList(ctrl) {
    var self = this;
    self.ctrl = ctrl;
    self.idsURL = "\/Runescape\/Resources\/enchanting.json";
    self.gem = {};
    self.cosmic = {};
    self.goldbar = {};
    self.items = [];
    self.loading = false;
    self.ids = [];
    self.tabledata;
    self.table;
    self.componentPrice;


    self.loadItems = function () {

        console.log("loading items");
        $.ajax({
            url: self.idsURL,
            success: function (result) {
                self.ids = result;
                self.bindselector();
                self.loadFromMaterial();
            }
        });

    }

    self.checkDone = function () {
        var done = true;
        if(self.goldbar.buying == undefined || self.cosmic.buying == undefined || self.gem.buying == undefined){
            done = false;
        }
        for (i = 0; i < self.items.length; i++) {
            if (self.items[i].unen.selling == undefined || self.items[i].en.selling == undefined || (self.items[i].stringed != undefined && self.items[i].stringed.buying == undefined)) {
                done = false;
            }
        }
        if (done) {
            console.log("done loading");
            self.loadTable();
        }
    }

    self.loadFromMaterial = function () {
        var material = $('#gemselector').val();
        var matno;
        for (j = 0; j < self.ids.length; j++) {
            if (self.ids[j].gem == material) {
                matno = j;
                break;
            }
        }
        self.goldbar = new Item(2357, self);
        self.cosmic = new Item(564, self);
        self.gem = new Item(self.ids[matno].id, self);
        // ring
        self.items[0] = {};
        self.items[0].unen = new Item(self.ids[matno].ring[0], self);
        self.items[0].en = new Item(self.ids[matno].ring[1], self);
        // necklace
        self.items[1] = {};
        self.items[1].unen = new Item(self.ids[matno].necklace[0], self);
        self.items[1].en = new Item(self.ids[matno].necklace[1], self);
        // bracelet
        self.items[2] = {};
        self.items[2].unen = new Item(self.ids[matno].bracelet[0], self);
        self.items[2].en = new Item(self.ids[matno].bracelet[1], self);
        // amulet
        self.items[3] = {};
        self.items[3].unen = new Item(self.ids[matno].amulet[0], self);
        self.items[3].stringed = new Item(self.ids[matno].amulet[1], self);
        self.items[3].en = new Item(self.ids[matno].amulet[2], self);
        console.log(self.items);

    }

    self.loadTable = function () {
        if (!self.loading) {
            self.loading = true;
            console.log("loading table");
            $('#gem').text(" " + self.gem.name);
            $('#gemprice').text(" " + self.gem.buying);
            $('#goldprice').text(" " + self.goldbar.buying);
            $('#cosmicprice').text(" " + self.cosmic.buying);
            self.tabledata = [];
            self.componentPrice = (parseInt(self.goldbar.buying) + parseInt(self.gem.buying));
            //ring
            for (i = 0; i < 3; i++) {
                self.tabledata[i] = [
                    self.items[i].unen.name,
                    self.componentPrice,
                    self.items[i].unen.selling,
                    (parseInt(self.items[i].unen.selling) - self.componentPrice),
                    self.items[i].unen.buying,
                    self.items[i].en.name,
                    self.items[i].en.selling,
                    (parseInt(self.items[i].en.selling) - parseInt(self.items[i].unen.buying) - parseInt(self.cosmic.buying)),
                    (parseInt(self.items[i].en.selling) - self.componentPrice - self.cosmic.buying)
                ]
            }
            self.tabledata[3] = [
                self.items[3].unen.name,
                self.componentPrice,
                self.items[3].unen.selling,
                (parseInt(self.items[3].unen.selling)-self.componentPrice),
                self.items[3].stringed.buying,
                self.items[3].en.name,
                self.items[3].en.selling,
                (parseInt(self.items[3].en.selling)-parseInt(self.items[3].stringed.buying)-parseInt(self.cosmic.buying)),
                (parseInt(self.items[3].en.selling)-self.componentPrice - self.cosmic.buying)
            ]


            if (self.table == undefined) {
                self.table = $('#jewellerytable').dataTable({
                    data: self.tabledata,
                    order: [[3, "desc"]],
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
        $('#gemselector').on('change', function () {
            console.log("changed material needs reloading");
            self.loading = false;
            self.loadFromMaterial();
        });

    }






    self.loadItems();
}


