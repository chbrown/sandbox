/*jslint browser: true, multistr: true */

var TEMPLATES = {
  subform:
    '<div class="schema">' +
    '  <div class="description">{{schema.description}}</div><input>' +
    '</div>',
    // '<div class="subform"></div>'
  enum:
    '<div ng-repeat="option in schema.enum">' +
    '  <input type="radio" name="{{schema.title}}" value="{{option}}" ng-required="schema.required"> {{option}}' +
    '</div>',
  string:
    '<input name="{{schema.title}}" ng-required="schema.required">',
  date:
    '<input name="{{schema.title}}" ng-required="schema.required" type="date">',
};

(function(angular) {
  var app = angular.module('subforms', []);

  function generateTemplate(schema) {
    if (schema === undefined) {
      return '';
    }
    else if (schema.enum) {
      return TEMPLATES.enum;
    }
    else if (schema.union) {
      return 'union.html';
    }
    else if (schema.type == 'string' && schema.format == 'date-time') {
      return TEMPLATES.date;
    }
    else if (schema.type == 'string') {
      return TEMPLATES.string;
    }
    return 'no template found';
  }

  app.directive('subform', function($compile) {
    return {
      restrict: 'E',
      template: TEMPLATES.subform,
      replace: true,
      scope: {
        // the schema is a JSON schema object with title, description, and type/enum properties
        schema: '=',
      },
      link: function(scope, el, attrs) {
        console.log('el', el);
        scope.$watch('schema', function() {
          // var html = generateTemplate(scope.schema);
          // el.html(html);
          // $compile(el.contents())(scope);
        }, true);
      }
    };
  });

})(angular);

