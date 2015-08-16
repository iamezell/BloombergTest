
//Models////////////////////////////////////////
var Model = ( function( window, $ ) {

  function Model() {
    this._list = [];
  }

  // this method will handle adding observers to the internal list
  Model.prototype.addObserver = function( obj ) {
    // console.log( 'added new observer' );
    this._list.push( obj );
  };


  
  Model.prototype.unobserve = function( obj ) {
    for( var i = 0, len = this._list.length; i < len; i++ ) {
      if( this._list[ i ] === obj ) {
        this._list.splice( i, 1 );
        // console.log( 'removed existing observer' );
        return true;
      }
    }
    return false;
  };
  
  Model.prototype.notify = function() {
    console.log("in notify");

    var args = Array.prototype.slice.call( arguments, 0 );
    
    for( var i = 0, len = this._list.length; i < len; i++ ) {
      this._list[i].update.apply( null, args );
    }
  };

  

  Object.defineProperty(this, 'schema', {
    value: {},
    writable: true,
    enumerable: true,
    configurable: true
  });
  

  // we should also place in  CRUD calls to get info

  Model.prototype.Create = function(){
    var args = Array.prototype.slice.call( arguments, 0 );
  	
  }

  Model.prototype.Read = function(){
    //read info from database then update the view
    var args = Array.prototype.slice.call( arguments, 0 );

    if(args[0]){
      // to test if this is a fake call
      this.schema = [{ticker:'APPL', volume:6},{ticker:'MSFT', volume:8},{ticker:'GE', volume:10},{ticker:'DIS', volume:2},{ticker:'PEP', volume:1},{ticker:'T', volume:5}]
      // console.log(this.schema);

      return schema;

    }else{
      // 
      
    }

  }

  Model.prototype.Update = function(object){

      this.notify(object);
    
  }

  Model.prototype.Delete = function(){

  }

  return Model;

} )( window, jQuery );


//View////////////////////////////////////////////////////////////////////////////////
var View = ( function( window, $, _ ) {


  function View(Controller, Model) {
    
    // console.log("in view");
   
    

  }


  // this method will handle adding observers to the internal list
  View.prototype.render = function( element, templateString,response ) {
      var compiled = _.template(templateString);

      var temp = compiled(response);
      $(element).html('');
      $(element).append(temp);
  };

  View.prototype.addEvent = function(ref, Event){
    // console.log("hello from add Event");
    //we need to split the string
    $(document).ready(function(){
      for( prop in Event){
      var theSplit = prop.split(" ");
      var Obj = Event[prop]
      console.log(theSplit[0])
      console.log(theSplit[1])

      for(prop2 in Obj ){
        
        $(theSplit[0]).on(theSplit[1], Obj[prop2]);

      }
    }

    })

  }

  View.prototype.EventFunction = {};

  View.prototype.update = function(){
    console.log("update called");
  }

  Object.defineProperty(this, 'schema', {
    value: {},
    writable: true,
    enumerable: true,
    configurable: true
  });
  

  return View;

} )( window, jQuery, _ );


//Controller////////////////////////////////////////////////////////////////////////////////
var Controller = ( function( Model, window, $, _ ) {
  function Controller(Model) {
    
    console.log("in controller and this is the model", Model); 
    

    Controller.prototype.update = function(bool,object){
      console.log("from controller base", object);
      Model.updateServer(bool, object);
    }

  }

  return Controller;

} )( window, jQuery, _ );





function ExchangeModel(){
  var model = new Model();
  //hardcode data

  this.data =  {'name':
   [
     {ticker:'APPL', volume:6},
     {ticker:'MSFT', volume:8},
     {ticker:'GE', volume:10},
     {ticker:'DIS', volume:2},
     {ticker:'PEP', volume:1},
     {ticker:'T', volume:5}
   ]
 }

 this.foundMatch = false;

  this.addView = function(newObserver){
    model.addObserver(newObserver)
  }

  this.updateView = function(){
    model.notify();
  }

  this.getView = function(){
    var data = model.Read(true);
  }

  this.getSchemaProperty = function(){
  }

  this.setSchemaProperty = function(property){
    model.schema = property;
    // console.log(model.schema);
  }

  this.updateServer = function(bool, object){

    //check if data needs to update its volume

    console.log(object);

    for (var i = 0; i < this.data.name.length; i++) {
      console.log(this.data.name[i]['ticker']);
      if(this.data.name[i]['ticker'] === object['ticker']){
        this.foundMatch = true;
        var thisVolume = parseInt(this.data.name[i]['volume'])
        var oldVolume = parseInt(object['volume']);
        var volume = thisVolume+oldVolume;
        this.data.name[i]['volume'] = volume;
        model.notify(this.data);
        
        
      }else{
        console.log("no match");

      }


    };
     if(!this.foundMatch){
        console.log("there are no matches so lets add a new row", object);
        this.data.name.push(object);
        model.notify(this.data);
      }

  }
};


function ExchangeController(Model){
  var controller = new Controller(Model);

  this.update = function(bool, object){
    console.log(object)
    controller.update(false, object);
  }



}

function ExchangeView(model,controller){
  var view = new View(model, controller);


  var template = '<table><tr><th>Ticker</th><th>Trade Volume</th></tr><% for (var i = 0; i < name.length; i++){ %>'+
    '<tr>'+
    '<td><%= name[i]["ticker"] %></td>'+
    '<td><%= name[i]["volume"] %></td>'+
    '</tr>'+
    
  '<% } %>'+

  '</table>'+
  'Ticker:<br>'+
    '<input type="text" name="ticker" class="tickerInput">'+
    '<br>'+
    'Volume<br>'+
    '<input type="text" name="volume" class="volumeInput">';
    


  this.theTestFunction = function(){
    // console.log('need this');
  }
  
  view.addEvent(this, { 
    '.subBtn click':{
      'myfunc': function(e){
        console.log('clicked');
        e.preventDefault();
        var volume = $('.volumeInput').val();
        var ticker = $('.tickerInput').val();

        var data = { 'ticker':ticker, 'volume':volume };
        controller.update(false, data);
        
      }}
  });

  
this.update = function(object){
  console.log('in update', object);
  view.render('.container', template, object);

}

  view.render('.container', template, {'name':[{ticker:'APPL', volume:6},{ticker:'MSFT', volume:8},{ticker:'GE', volume:10},{ticker:'DIS', volume:2},{ticker:'PEP', volume:1},{ticker:'T', volume:5}]});
  
}





var myModel = new ExchangeModel();
var myController = new  ExchangeController(myModel)
var myView = new ExchangeView(myModel, myController);

myModel.addView(myView);
myModel.getView();

