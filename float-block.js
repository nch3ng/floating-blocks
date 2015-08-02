angular.module("float.block", [])
  .directive("floatBlock", ["$timeout", function($timeout){
  return {
    restrict: 'E',
    template: "<span></span>",
    replace: true, 
    scope: {
      shape: "@",
      radius: "@",
      timer:"@",
      width:"@",
      height:"@"
    },
    link: function(scope, element, attrs){
      scope.default={};
      
      scope.default.shapes = ["circle", "square", "rectangle"];
      scope.default.shapes.ops = 3;
      
      scope.default.shape="rectangle";
      scope.default.radius=30;
      scope.default.width=50;
      scope.default.height=20;
      scope.default.timer=1000;
      
      scope.config={};
      scope.config=scope.default;
      
      //console.log(scope.shape);
      
      if(scope.shape){
        
        scope.config.shape=scope.shape;
        //scope.config.radius=0;
        
        if(scope.shape=="random"){
     
          var op = Math.floor(Math.random()*scope.default.shapes.ops);
          scope.config.shape = scope.default.shapes[op];
          
          scope.config.radius = Math.floor(Math.random()*scope.default.radius*2);
          scope.config.width=Math.floor(Math.random()*scope.default.width);
          scope.config.height=Math.floor(Math.random()*scope.default.height);
        }
        
        //console.log(scope.config.shape);
        if(scope.config.shape=="circle"){
          scope.radius==null?"": scope.config.radius=scope.radius;
          scope.config.width=scope.config.radius;
          scope.config.height=scope.config.radius;
        }
        else if (scope.config.shape == "square"){
          scope.config.radius=0;
          scope.width==null?"":scope.config.width=scope.width;
          scope.config.height = scope.config.width;
          console.log(scope);
          console.log(scope.width);
          
        }
        else {
          // Default or Rectangle
          scope.config.radius=0;
          scope.width==null?"":scope.config.width=scope.width;
          scope.height==null?"":scope.config.height=scope.height;
        }
      }
      else {
        // Default or Rectangle

        scope.width==null?"":scope.config.width=scope.width;
        scope.height==null?"":scope.config.height=scope.height;
        scope.config.radius=0;
      }
      
      
      
      scope.randomColor = function(){
        var rgba = 'rgba(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + Math.random()*0.4 + ')';
        return rgba;
      }
      
      //console.log(scope.randomColor());
     
      element.css("background-color", scope.randomColor());
      
      var rect = element[0].getBoundingClientRect();

      var top = rect.top;
      var left = rect.left;
      
      element.css({
        width: scope.config.width+"px",
        height: scope.config.height+"px",
        borderRadius: scope.config.radius+"px"
      });
      scope.setNewColor = function(){
        element.css("background-color", scope.randomColor());
        $timeout(function(){
          scope.setNewColor();
        }, 5000);
      }
      scope.setNewPos = function(sTop, sLeft){
        var plusOrMinusX = 1;
        var plusOrMinusY = 1;

        if(sLeft < 15)
          plusOrMinusX =1
        else if(sLeft > window.innerWidth-50)
          plusOrMinusX = -1;
        else
          plusOrMinusX = Math.random() < 0.5 ? -1 : 1;
        
        if(sTop < 15)
          plusOrMinusY = 1;
        else if (sTop > window.innerHeight-20)
          plusOrMinusY = -1;
        else
          plusOrMinusY = Math.random() < 0.5 ? -1 : 1;
        
        
        var x = Math.floor(Math.random()*10) * plusOrMinusX;
        var y = Math.floor(Math.random()*10) * plusOrMinusY;

        var ntop = sTop + y;
        var nleft = sLeft + x;

        element.css({
          top: ntop, 
          left: nleft,
        });
        $timeout(function(){
          scope.setNewPos(ntop, nleft);
        }, Math.random()*1500)
      }
      
      scope.setNewPos(top, left);
      scope.setNewColor();
    }
  }
}]);
