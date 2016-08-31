function BaseCtrl(app){
    var self = this;
    
    
    self.load = function(){
        self.draw();
        self.bindEvents();
    }
    self.draw = function () {
        app.loadPage(app.pagelist["/"]);
    }
    
    self.bindEvents = function(){
        
    }
    
}

