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
function updateHeaderString(lastUpdate, time){
    let today = new Date();
    let update = Math.abs( today - time) / (36e5/60);
    
    if( update > 60*24*30){
        lastUpdate.textContent = "Viewing data from approximately" + Math.round(update/(60*24*30)) + " months ago";
    }
    else if (update > 60*24){
        lastUpdate.textContent = "Viewing data from " + Math.round(update/(60*24)) + " days ago";
    }
    else if (update > 60){
        lastUpdate.textContent = "Viewing data from " + Math.round(update/60) + " hours ago";
    } else if (time == "search") {
        lastUpdate.textContent = "Showing search results..."
    }
    else{
        console.log("time and today are", time, " ---------", today)
        lastUpdate.textContent = "Viewing data from " + Math.round(update) + " minutes ago";
    }
}
module.exports = { update, updateHeaderString}