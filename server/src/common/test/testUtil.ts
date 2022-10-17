import {Message} from "../../messages/entities/message.entity";
import {User} from "../../auth/entities/user.entity";

export default class TestUtil {
    static getMessageWithoutId(): Message {
        const message = new Message();
        message.name = "User1";
        message.text = "User1 text message";

        return message;
    };

    static getUserWithoutId(): User {
        const user = new User();
        user.name = "User1";
        user.userWsId = null;

        return user;
    };
}
