
//Models////////////////////////////////////////
var Model = ( function( window, $ ) {

  function Model() {
    this._list = [];

  }

  // this method will handle adding observers to the internal list
  Model.prototype.addObserver = function( obj ) {
    console.log( 'added new observer' );
    this._list.push( obj );
  };


  
  Model.prototype.unobserve = function( obj ) {
    for( var i = 0, len = this._list.length; i < len; i++ ) {
      if( this._list[ i ] === obj ) {
        this._list.splice( i, 1 );
        console.log( 'removed existing observer' );
        return true;
      }
    }
    return false;
  };
  
  Model.prototype.notify = function() {
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
      console.log(this.schema);

      return schema;

    }else{
      // 
      
    }

  }

  Model.prototype.Update = function(){

  }

  Model.prototype.Delete = function(){

  }

  return Model;

} )( window, jQuery );


//View////////////////////////////////////////////////////////////////////////////////
var View = ( function( window, $, _ ) {


  function View() {
    
    console.log("in view");
    

  }


  // this method will handle adding observers to the internal list
  View.prototype.addTemplate = function( element ) {
      var compiled = _.template("hello: <%= name %>");

      var temp = compiled({name: 'moe'});
      $(element).append(temp);
  };

  View.prototype.addEvent = function(ref, Event){
    console.log("hello");
    //we need to split the string
    
    for( prop in Event){
      var theSplit = prop.split(" ");
      var Obj = Event[prop]
      for(prop2 in Obj ){
        $(theSplit[0]).on(theSplit[1], Obj[prop2]);
      }
    }

  }

  View.prototype.EventFunction = {};

  

  Object.defineProperty(this, 'schema', {
    value: {},
    writable: true,
    enumerable: true,
    configurable: true
  });
  

  return View;

} )( window, jQuery, _ );


function ExchangeModel(){
  var model = new Model();
  console.log("this is the model", model);
  
  this.addView = function(newObserver){
    model.addObserver(newObserver)
  }

  this.updateView = function(){
    //hello 
    model.notify();
  }

  this.getView = function(){
    console.log("in get view");
    var data = model.Read(true);
  }

  this.getSchemaProperty = function(){
    console.log("this is the console ",model.schema);
  }
  this.setSchemaProperty = function(property){
    model.schema = property;
    console.log(model.schema);
  }
};

function myView(){
  var view = new View();


  this.theTestFunction = function(){
    console.log('need this');
  }
  
  view.addEvent(this, { 
    '.test click':{
      'myfunc': function(){
        console.log('clicked homie')
      }}
  });

  view.render('.container', {"name":model});
  

  
  
}

// var View = {
//   update : function() {
//     console.log( '"update" called on StockUpdater with: ', arguments );
//   }
// };

//Views////////////////////////////////////////

// var View = ( function( window, $ ) {


//   })(window, jQuery);

var template = '

    <table>
    </table>
'

var myModel = new ExchangeModel();
var view = new myView();
console.log('view comming up');
console.log(view)
// myModel.addView(View);
// myModel.updateView();
myModel.getSchemaProperty();
myModel.setSchemaProperty({"h":"h"});
myModel.getView();

