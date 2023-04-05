# HTTP Cookies & User Authentication
LightHouse labs  web flex lecture  on HTTP cookies and user Authentication
[Lecture Repo](https://github.com/ermurray/cookies-userAuth) | [Lecture Recording](https://vimeo.com/751948814/612b284a02)
## Topics
- [ ] HTTP review
- [ ] HTTP cookies
- [ ] Build small express ejs login
- [ ] Questions / concerns

### HTTP review
- request response style protocol
- why is HTTP stateless
  -scalability
    - make it bigger/better (vertical)
    - make more (horizontal)
  -complexity
    - not tracking sessions etc.
  - easier caching
    - track  unchanged data easily
  -server crashes etc. 

  - what are the trade offs
    - must re do steps every time (unless cached)
    - we need to store info between requests, a way maintain sessions and session state
### HTTP cookies
- cookies:
  - allows us to save some state between requests
  - stored as key/value pairs
    - "user_id" : "1232ssry129"
  - stored only on browser
  - three main purposes
    - session
    - personalization
    - tracking
  -