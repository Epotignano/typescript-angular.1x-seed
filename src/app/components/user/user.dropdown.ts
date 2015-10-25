/**
 * Created by mmasuyama on 10/24/2015.
 */

module app.components.user {

  interface IUserDropDown {}


  export function UserDropdown (): ng.IDirective {
    var directive = <ng.IDirective> {
      restrict: 'EA',
      controller: UserDropdownController,
      controllerAs: 'userVm',
      template: 'app/components/user/user.dropdown.html'
    };

    return directive
  }

  export class UserDropdownController implements IUserDropDown{
    /*@ngInject */

    constructor(private threadServ: app.threads.Threads,
                private thread: any,
                private run: any,
                private init: any,
                private userService: app.services.UserService,
                public user: app.domain.Teacher) {
      this.thread = this.threadServ.getThread("User");


      //initialization
      this.init = () => {
        this.userService.get()
      };

      //Resolves update and get;
      this.thread.subscribe(this.run = (userEvent) => {
        this.user = userEvent.data;
      })

    }

  }




}
