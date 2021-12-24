const { Position } = require("./position.model");
const { hiringMenu } = require("../common/navigation");

const PositionResourceOptions = {
    resource: Position,
    options: {
        navigation: hiringMenu,
        properties: {
            _id: {
                isVisible: false
            },
        }
    }
}

module.exports = {
    PositionResourceOptions
}