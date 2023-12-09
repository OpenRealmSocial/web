# @openrealm/hub-web

A fast and easy REST-like interface to work with Openrealm Hubs. Designed to work with [Hub](https://github.com/openrealmsocial/hub/) and any other Hub that implements the [Openrealm protocol](https://github.com/openrealmsocial/protocol).

## Features
- Call any endpoint using a simple HTTP API, including from a browser environment
- Responses are plain JSON
- Written entirely in Typescript, with strict types for safety. 

## Installation
The examples in this package use `axios` to make HTTP requests, but you can use any library. It is also useful to install the `@openrealm/core` library which has several helper methods that are useful while working with Openrealm messages. 

```bash
yarn add axios @openrealm/core
yarn add -D @types/axios 
```

## Documentation
The HTTP API endpoints are [documented here](https://docs.openrealm.social). 

### Getting started: fetching casts
```typescript
import axios from "axios";

const qid = 2;
const server = "http://nemes.openrealm.social:2281";

try {
    const response = await axios.get(`${server}/v1/castsByQid?qid=${qid}`);

    console.log(`API Returned HTTP status ${response.status}`);    
    console.log(`First Cast's text is ${response.messages[0].data.castAddBody.text}`);
} catch (e) {
    // Handle errors
    console.log(response);
}
```

## License

MIT License
