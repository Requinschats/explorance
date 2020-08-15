import moment from "moment";

export class User {
    constructor(user) {
        this.id = user.id //Assuming determinism for the scope if this assignment
        this.name = user.name
        this.family = user.family
        this.birthday = user.birthday
    }

    static getTemplateUsers () {
        return [
            {id: 0, name: "Ali", family: "Delshad", birthday: new moment().format('YY-MM-DD')},
            {id: 1, name: "Hamid", family: "Sadeghi", birthday: new moment().format('YY-MM-DD')},
            {id: 2, name: "Amir", family: "Olfat", birthday: new moment().format('YY-MM-DD')},
            {id: 3, name: "Keyvan", family: "Nasr", birthday: new moment().format('YY-MM-DD')}
        ].map(user => new User(user))
    }
}
