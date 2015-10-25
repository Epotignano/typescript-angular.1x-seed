/**
 * Created by mmasuyama on 10/24/2015.
 */

module app.components.user {

  interface IUserDropDown {}

  export class UserDropdownController implements IUserDropDown{

    private thread: any;
    private run: any;
    private init: any;
    public user: app.domain.Teacher;

    /*@ngInject */
    constructor(private threadsService: app.threads.Threads,
                private userService: app.services.UserService) {
      this.thread = this.threadsService.getThread("User");


      // initialization
      this.init = () => {
        this.userService.get()
      };

      this.init();

      // Resolves update and get;
      this.thread.subscribe(this.run = (userEvent: any) => {
        this.user = userEvent.data;
      })

    }

  }

  /** @ngInject */

  export function UserDropdown (): ng.IDirective {
    var directive = <ng.IDirective> {
      restrict: 'EA',
      scope: {},
      controller: UserDropdownController,
      controllerAs: 'userVm',
      bindToController: true,
      templateUrl: 'app/components/user/user.dropdown.html'
    };

    return directive
  }

  angular.module('smz.components.user')
    .directive('smzUserDropdown', UserDropdown)





}
