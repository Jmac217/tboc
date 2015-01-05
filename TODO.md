### TODO

#### 01-06-15
- make home fully relative

- look into tiles.json load issue

  - *For some reason Im making calls to `tiles.json` 3 times per load_link()*

- make Elizabeths changes

- fix Chrome #links issue

  - forces the last button in `#links` to return to a new line

- _"_container"s_ need to be removed: `#body_container` is what made me realize this.

  - This will require `#pages` to pull away from `#body`.

- `title` to be renamed, `id` and *title* to be placed by tiles.json.

  - Change id, type to page, header 

- `.cite` should be added to all citations, `business->loans.php` is a perfect example.

- could rename /json/tiles.json

- could rename #nav to <nav>

---

##### _Misc._
Go back through and make sure all pages have alt-text.

Card Services -- Add Gift Card number

make sure that things from *Secuity Center* do not overflow into the footer, that was strange.

*`page_right_column_extended`* can actually be merged with *`page_right_column`* it will make things much better, the extension doesn't even matter.

- Something does need to be in place for boxes with widths smaller than the image however.

Testing email will require the existing _mail_ functions to be commented and replaced by my email address. This may not even be necessary since _Activate eStatements_ has been removed from the website.

_#notices_ still needs converted into JSON with a URL to a specific markdown folder, similar to the hierarchy in _Landing Zone_; this markdown folder could probably be hosted on the client-side if we decide to create the control panel offline--which is mostly necessary.

---

##### Bugs

1) Scaling is off in the dropdown list item height | index.js

2) 50px is added to view on every click | functions.js

---

##### Issues

 - Pages that load SQL databases will have to be synchronous, though there isn't any plans for these types of databases on TBOC, there may be in future sites.

 - Button text will overflow if extended beyond its width.
 
 - History.js will be necessary after adding direct page links

---

##### Search Terms

- **@bugs:**_[number]_ -- matches with *Bugs* list number
- **@debug** -- debugging code
- **@todo** -- a broken or unimplemented section.
- **@implementation** -- commented code to be implemented
-  **@out-take** -- commented code that may be used or referenced
- **@unnecessary** -- my wacko quips that should be removed for production
