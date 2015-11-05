/**
 * Created by mmasuyama on 11/5/2015.
 */


module app.modules.teachers {

  interface ITeachersList {}

  export class teachersListController implements ITeachersList{
    public thread;
    constructor( private teachersService : app.services.TeachersService,
                 private threadService : app.threads.Threads
    ) {
      this.teachersService.getCollection();
      this.thread = this.threadService.getThread('Teacher')
    }
  }

}

