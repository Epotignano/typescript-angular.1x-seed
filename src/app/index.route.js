var smileMotivationz;
(function (smileMotivationz) {
    'use strict';
    var RouterConfig = (function () {
        /** @ngInject */
        function RouterConfig($stateProvider, $urlRouterProvider) {
            $stateProvider.state('home', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'main'
            });
            $urlRouterProvider.otherwise('/');
        }
        return RouterConfig;
    })();
    smileMotivationz.RouterConfig = RouterConfig;
})(smileMotivationz || (smileMotivationz = {}));
//# sourceMappingURL=index.route.js.map