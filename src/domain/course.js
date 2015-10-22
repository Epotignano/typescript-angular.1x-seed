/**
 * Created by mmasuyama on 10/21/2015.
 */
/// <reference path="user.ts" />
/// <reference path="location.ts" />
var app;
(function (app) {
    var domain;
    (function (domain) {
        var Course = (function () {
            function Course(name, category, teacherId, studentsList) {
                this.name = name;
                this.category = category;
                this.teacherId = teacherId;
                this.studentsList = studentsList;
            }
            return Course;
        })();
        domain.Course = Course;
    })(domain = app.domain || (app.domain = {}));
})(app || (app = {}));
//# sourceMappingURL=course.js.map