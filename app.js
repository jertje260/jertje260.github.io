function WebApp() {
    var self = this;
    self.url;
    self.pagelist = {};
    self.pagelist["/runescape/"] = "\/Runescape\/Templates\/home.html";
    self.pagelist["/runescape/?page=decanting"] = "\/Runescape\/Templates\/decanting.html";
    self.pagelist["/runescape/?page=smithing"] = "\/Runescape\/Templates\/smithing.html";
    self.pagelist["/runescape/?page=cleaning"] = "\/Runescape\/Templates\/cleaning.html";
    self.pagelist["/runescape/?page=jewellery"] = "\/Runescape\/Templates\/jewellery.html";
    self.pagelist["/"] = "\/Templates\/home.html"

    self.init = function () {
        console.log("initializing");
        $.get("config.json", function (data) {
            self.url = data.url;
            self.bindEvents();
            self.loadFromUrl();
        })


    }


    self.setCtrl = function (controller) {
        console.log("setting controller");
        self.ctrl = controller;
        self.ctrl.load();
    }


    self.loadPage = function (url, callback) {
        $.get(url, function (html) {
            //console.log(html);
            $('#view').empty().append(html);
            console.log("loading view");
            if (callback != undefined) {
                callback();
            }
        })

    }

    self.getUrlVars = function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    self.loadFromUrl = function () {
        $('.active').removeClass('active');
        console.log("loading " + location.pathname + location.search);
        var params = self.getUrlVars();
        console.log(params);
        if (params.game == "runescape") {
            $('#Runescape').addClass('active');
            switch (params.page) {
                case "decanting":
                    document.title = "RS - Decanting";
                    break;
                case "smithing":
                    document.title = "RS - Smithing";
                    break;
                case "jewellery":
                    document.title = "RS - Jewellery";
                    break;
            }
            self.setCtrl(new RSCtrl(self, params.page));
        } else if (location.pathname == "?game=factorio") {
            $('#Factorio').addClass('active');
            document.title = "Factorio"
            self.setCtrl(new FactorioCtrl(self));
        } else {
            $('#home').addClass('active');
            document.title = "Webpage RS & Factorio";
            self.setCtrl(new BaseCtrl(self));
        }
    }

    self.bindEvents = function () {
        $('nav a').click(function (e) {
            var href = e.target.href.replace(self.url, '');
            // HISTORY.PUSHSTATE
            history.pushState({ "URL": href, "toLoad": href, }, 'New URL: ' + href, href);
            console.log("creating pushstate for " + href);
            self.loadFromUrl();
            e.preventDefault();


        });

        // THIS EVENT MAKES SURE THAT THE BACK/FORWARD BUTTONS WORK AS WELL
        window.onpopstate = function (event) {
            console.log(event);
            console.log("pathname: " + location.pathname + location.search);
            self.loadFromUrl(self.pagelist[location.pathname + location.search]);
        };

    }

    self.createPopup = function (title, message, callback) {
        //TODO do this later
        $('#closebutton').unbind();
        $('#myModalLabel')[0].innerHTML = title;
        $('.modal-body')[0].innerHTML = message;
        if (callback != undefined) {
            $('#closebutton').on('click', function () {
                //console.log("click fired");
                callback();
            });
        }
        $('#myModal').modal('show');

    }
    self.init();

};

var app = new WebApp();
