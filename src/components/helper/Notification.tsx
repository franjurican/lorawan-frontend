import {notification} from "antd";
import {IconType} from "antd/lib/notification";

export const Notification = (type: IconType, title: string, message: string, duration?: number) => {
    notification[type]({
        message: title,
        description: message,
        duration: duration
    });
};
