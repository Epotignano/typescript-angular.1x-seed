/**
 * Created by mmasuyama on 10/21/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var app;
(function (app) {
    var domain;
    (function (domain) {
        var User = (function () {
            function User() {
            }
            return User;
        })();
        domain.User = User;
        var Student = (function (_super) {
            __extends(Student, _super);
            function Student() {
                _super.apply(this, arguments);
            }
            return Student;
        })(User);
        domain.Student = Student;
        var Teacher = (function (_super) {
            __extends(Teacher, _super);
            function Teacher() {
                _super.apply(this, arguments);
            }
            return Teacher;
        })(User);
        domain.Teacher = Teacher;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
//# sourceMappingURL=user.js.map