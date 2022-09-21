# HTTP Cookies & User Authentication
LightHouse labs  web flex lecture  on HTTP cookies and user Authentication
[Lecture Repo](https://github.com/ermurray/cookies-userAuth) | [Lecture Recording](https://vimeo.com/751948814/612b284a02)
## Topics
- [x] HTTP review
- [x] HTTP cookies
- [x] Build small express ejs login
- [x] Questions / concerns

### HTTP review
- request response style protocol
- it is stateless

  ```
  The HTTP protocol is a stateless one. This means that every HTTP request the server receives is independent and does not relate to requests that came prior to it.
  
  ie. a request is made for the first ten user records, then another request is made for the next ten records.

  On a stateful protocol, the server remembers each client position inside the result-set, and therefore the requests will be similar to:

  Give me the first ten user records
  Give me the next ten records
  On a stateless protocol, the requests will be a bit different. The server doesn't hold the state of its client, and therefore the client's position in the result-set needs to be sent as part of the requests: ...
  ```
  - why is it stateless
    - scalability
      - make it bigger/better (vertical)
      - make more (horizontal)
    - complexity
      - not tracking sessions etc.
    - easier caching
      - track unchanged data easily
    - server doesn't loose state on restart crash etc.

  - what does this mean
    - doesnt keep track of context and must be provided every time
    - we need a cookie or token some way to manage session state

### HTTP cookies
- cookies:
  - Allow us to store user info between HTTP request
  - stored as key value pair
    - "user_id" : "12388d77dds"  
  - stored by the browser
  - three main purposes
    - session 
    - personalization
    - tracking
  - set on the response object
  - provided in the request to the server 