# TV Tracker
## API
The idea is to use TVDb API when the development enlarges enough to justify a more complex API.
For now, I'll use OMDb API.

## ToDo
- Debouncer: searching movies or tv series will be done via an input text that'll trigger the search automatically as the user types in, but debbouncing it so the API's called only if the user stopped typing (like 0.3 secs) so it's not being called on every keystroke.