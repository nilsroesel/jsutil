import fetch from 'node-fetch';
import * as EventSource from 'eventsource';
import HttpsProxyAgent from 'https-proxy-agent';
import { ServerSubscription } from './server-subscription';

export type ConnectorFactoryFunction = <I, R>(route: string) => Connector;

export class Connector {

    static to(baseUrl: string = ''): ConnectorFactoryFunction {
        return <I, R>(route: string) => new Connector(baseUrl + route);
    }

    private readonly  url: string;

    private proxy: string;

    private constructor(url: string, proxy?: string) {
        this.url = url;
        this.proxy = proxy;
    }

    /**
     * Sends a http request to the route and returns body as generic R
     * @param type Http Method thats used
     * @param payload Request body
     */
    dispatch<I, R>(type: Methods, payload?: I): Promise<R> {
        return new Promise<R>(resolve => {
            let opts = {
                method: type.label,
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({} || payload)
            };
            if(this.proxy) opts = Object.assign({}, opts, {agent: new HttpsProxyAgent(this.proxy)} );
            fetch(this.url, opts).then(response => response.json())
                .then(json => resolve(json as R))
                .catch(() => resolve(null));
        });
    }

    /**
     * Subscribes to a route and will return an event like object
     */
    subscribe(): ServerSubscription {
        const opts = this.proxy? Object.assign({}, {proxy: this.proxy}) : undefined;
        const eventStream = new EventSource(this.url, opts);
        return new ServerSubscription(eventStream);
    }

    /**
     * Returns a new Connector configured with the given proxy url
     * @param proxyUrl
     */
    useProxy(proxyUrl: string): Connector {
        this.proxy = proxyUrl;
        return new Connector(this.url, this.proxy);
    }

}

export class Methods {

    public static readonly GET = new Methods('GET');

    public static readonly POST = new Methods('POST');

    public static readonly PUT = new Methods('PUT');

    public static readonly DELETE = new Methods('DELETE');



    readonly label: string;

    private constructor(arg: string) { this.label = arg; }

}
