function BaseCtrl(app){
    var self = this;
    
    
    self.load = function(){
        self.draw();
        self.bindEvents();
    }
    self.draw = function () {
        app.loadPage(app.pagelist["/"]);
        document.title = "Webpage RS & Factorio";
    }
    
    self.bindEvents = function(){
        
    }
    
}

