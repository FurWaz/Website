import User from "../../main/scripts/User";
import { fetchClients } from "./clients";
import { API_URL, fetchInfos } from "./main";

class Event {
    #type = "";
    #data = {};
    constructor(type, data) {
        this.#type = type;
        this.#data = data;
    }

    get type() { return this.#type; }
    get data() { return this.#data; }
}

let user_poll_id = -1;
const events = [];
function setupEvents() {
    events.splice(0, events.length);
    register();
}

function getClientId() {
    return user_poll_id;
}

function processEvent(event) {
    console.log("new event: "+event.type+" (data: "+JSON.stringify(event.data)+")");
    switch (event.type) {
        case "newMusic":
            fetchInfos();
            break;
        case "newClient":
        case "clientRemoved":
            fetchClients();
            break;
    
        default:
            break;
    }
}

function register() {
    fetch(API_URL+"/register?name="+User.CurrentUser.username, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }).then(res => {
        res.json().then(data => {
            if (typeof(data) == "string" && data.startsWith("Error")) {
                console.log("error : "+data);
                return;
            }
            user_poll_id = data.id;
            console.log("registered with id "+data.id);
            pollEvents();
        }).catch(err => { console.error(err); });
    }).catch(err => { console.error(err); });
}

function pollEvents() {
    console.log("polling events ...");
    fetch(API_URL+"/events?id="+user_poll_id, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Accept": "application/json" }
    }).then(res => {
        console.log("event received !")
        pollEvents();
        res.json().then(data => {
            if (typeof(data) == "string" && data.startsWith("Error")) {
                console.log("error : "+data);
                return;
            }
            processEvent(new Event(data.type, data.data));

        }).catch(err => {
            console.error(err);
        });
    }).catch(err => {
        console.log("error getting event !")
        pollEvents();
        console.error(err);
    });
}

function getEvents() {
    return events.splice(0, events.length);
}

export { Event, getEvents, setupEvents, getClientId };