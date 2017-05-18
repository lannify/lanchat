import Pubnub from 'pubnub';

import { pubnubConfig } from '../config'

const presenceSubscriptions = new Set();
const messageSubscriptions  = new Set();

const identifier = () => Math.random().toString(10).slice(12);

let connection;

export const connect = () => {
  if (connection) { return connection; }

  connection = new Promise((resolve, reject) => {
    const uuid = identifier();
    const options = Object.assign({}, pubnubConfig.client, {uuid});

    const pubnub = new Pubnub(options);

    const initialHandler = {
      status: statusEvent => {
        switch (statusEvent.category) {
          case 'PNConnectedCategory':
          case 'PBNetworkUpCategory':
            resolve(pubnub);
            break;
          case 'PBDisconnectedCategory':
          case 'PBNetworkDownCategory':
            reject(new Error('Received a network-down message'));
            break;
          default:
            return;
        }

        pubnub.removeListener(initialHandler);

        pubnub.addListener({
          message: function() {
            messageSubscriptions.forEach(
              handler => handler.apply(undefined, arguments)
            );
          },
          presence: function() {
            presenceSubscriptions.forEach(
              handler => handler.apply(undefined, arguments)
            );
          },
          status: statusEvent => {
            switch (statusEvent.category) {
              case 'PNDisconnectCategory':
              case 'PNNetworkDownCategory':
                connect(); // reconnect
                break;
            }
          }
        });
      }
    };

    pubnub.addListener(initialHandler);

    return handshake(pubnub).then(() => resolve({ uuid, pubnub }))
                            .catch(err => reject(err));
  });

  return connection;
};

const handshake = pubnub => new Promise((resolve, reject) => {
  pubnub.tie(status => {
    if (status.error) {
      reject(new Error(
        `Pubnub Service failed to respond to time request: ${status.error}`
      ));
    } else {
      resolve(pubnub);
    }
  });
});