# Get Going with GraphQL (Source Code)

This repo contains the completed files for the Node.js and React applications built throughout the _Get Going with GraphQL_ book from 8-Bit Press.

**[Learn more about the book and download a sample chapter here.](https://8bit.press/book/get-going-with-graphql)**

## What's in the Book?

If you're new to Apollo Server and Apollo Client and want to learn GraphQL the right way by following proven best practices for API design and development, then this book was written for you.

Key topics covered in the book include:

### GraphQL Schema Design

The heart of any GraphQL API is its schema. We'll learn the ins and outs of GraphQL's Schema Definition Language (SDL) to design and evolve a purpose-built schema that helps support rapid client application development.

### Apollo Server

We'll take an SDL-first approach to building out a GraphQL schema using Apollo Server. We'll even take advantage of some advanced features of Apollo Server by building a custom plugin for it and also using its Express integration so we can apply middleware to it.

### Queries and Mutations

We'll create queries and mutations that are specifically designed around product features to facilitate easy reading and writing of data via a GraphQL API. Using GraphQL's query language, we'll be able to request data from the API in exactly the shape we need (so no more wrangling complex logic on the client side to deal with over-fetching and under-fetching data!).

### Apollo Data Sources

Bloating field resolver functions with data-fetching logic can be messy and often isn't very DRY. We'll use an Apollo data source to neatly encapsulate and organize data-fetching logic on the back end.

### Pagination

We'll explore different pagination styles that are commonly used in GraphQL APIs and then apply offset-based pagination to multiple API fields to help clients optimize how they fetch long lists of data.

### Authentication and Authorization

Authentication and authorization are some of the trickiest things to get right in an app. We'll implement a basic authentication strategy using JSON Web Tokens and cookies and also add authorization to the API on a per-field basis using GraphQL Shield.

### Apollo Client 3 with React Hooks

We'll take a modern approach to build a React client application using function components along with a variety of different hooks, including Apollo Client 3's useQuery and useMutation hooks.

### Manage Data in the Apollo Client Cache

We'll use the new type policies feature of Apollo Client to customize how it caches data related to different operations performed against the schema. We'll also explore multiple strategies for updating the cache to re-render components after a mutation completes, when paginated queries are fetched, or if real-time updates are received from the server.

### Subscriptions

GraphQL APIs are capable of more than just sending stateless HTTP requests to run query and mutation operations. We'll also send subscription operations via a WebSocket connection to receive data in real time from the server to keep a subscribed client up to data with the latest data.

## What Does All the Code in This Repo Do?

The book takes a hands-on approach to learning essential GraphQL concepts by building a community-based book review application called Bibliotech.

It covers designing the GraphQL API from scratch based on product requirements, building the API out using [Apollo Server](https://www.apollographql.com/docs/apollo-server/), and testing out its various operations using [Apollo Explorer](https://www.apollographql.com/docs/studio/explorer/).

Once the API is up and running, the book explains how to use [Apollo Client](https://www.apollographql.com/docs/react/) and [Tailwind CSS](https://tailwindcss.com/) to rapidly build out an MVP React application that consumes Bibliotech's new GraphQL API.

## About the Author

Mandi Wise discovered her love for building web things 20 years ago. She spent the last six years sharing that passion by teaching software development to others, including how to build web and mobile applications powered by GraphQL APIs. She currently works as a Solutions Architect for [Apollo Graph Inc.](https://www.apollographql.com/) You can find her on [GitHub](https://github.com/mandiwise) and [Twitter](https://twitter.com/mandiwise).

## Questions & Feedback

Email [hello@8bit.press](mailto:hello@8bit.press) if you have any questions or feedback about this book.

---

Copyright © 2021 8-Bit Press Inc.
