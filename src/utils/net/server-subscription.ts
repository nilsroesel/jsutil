import * as EventSource from 'eventsource';

export class ServerSubscription {

    private readonly eventSteam: EventSource;

    constructor(eventStream: EventSource) { this.eventSteam = eventStream; }

    /**
     * Will creates an event listener to the source
     * @param event
     * @param consumer Callback Function that is executed if event appears
     */
    on(event: string, consumer: (payload?: any) => void): ServerSubscription {
        this.eventSteam.addEventListener(event, consumer);
        return this;
    }

    onReplace(event: string, consumer: (payload?: any) => void): ServerSubscription {
        this.eventSteam.removeEventListener(event, undefined);
        //this.eventSteam.addEventListener(event, consumer);
        return this;
    }

    /**
     * Closes the connection
     */
    unsubscribe() { this.eventSteam.close(); }

}