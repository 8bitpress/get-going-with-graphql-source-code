import { ApolloLink, Observable } from "@apollo/client";
import { createClient } from "graphql-ws";
import { print } from "graphql";

class WebSocketLink extends ApolloLink {
  constructor(options) {
    super();
    this.client = createClient(options);
  }

  request(operation) {
    return new Observable(sink => {
      return this.client.subscribe(
        { ...operation, query: print(operation.query) },
        {
          next: sink.next.bind(sink),
          complete: sink.complete.bind(sink),
          error: err => {
            if (err instanceof Error) {
              return sink.error(err);
            }

            if (err instanceof CloseEvent) {
              return sink.error(
                new Error(
                  `Socket closed with event ${err.code} ${err.reason || ""}`
                )
              );
            }

            return sink.error(
              new Error(err.map(({ message }) => message).join(", "))
            );
          }
        }
      );
    });
  }
}

export default WebSocketLink;
