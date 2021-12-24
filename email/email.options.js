const { Email } = require("./email.model");
const { hiringMenu } = require("../common/navigation");

const EmailResourceOptions = {
    resource: Email,
    options: {
        navigation: hiringMenu,
        properties: {
            _id: {
                isVisible: false
            },
            name: {
                isTitle: true
            },
            subject: {
                isTitle: false
            },
            _id: {
                isVisible: false
            },
            body: {
                type: "richtext",
                isVisible: {
                    list: false, edit: true, show: true, new: true
                }
            }
        },
    }
}

module.exports = {
    EmailResourceOptions
}