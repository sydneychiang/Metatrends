function update(statusString) {
    switch (statusString) {
        case "rising":
            return '\u25b2'
            break;
        case "falling":
            return '\u25bc'
            break;
        case "new":
            return '\u25cf'
            break;
        case "old":
            return ''
            break;
        default:
            break;
    }
}

module.exports = { update }