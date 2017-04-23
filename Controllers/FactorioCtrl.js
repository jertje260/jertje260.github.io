function FactorioCtrl(app){
    var self = this;
    
    
    self.load = function(){
        self.draw();
        self.bindEvents();
    }
    self.draw = function () {
        app.loadPage(app.pagelist["/factorio"]);
    }
    
    self.bindEvents = function(){
        
    }
    
}