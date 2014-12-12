### TODO

#### _`_container s`_ need to be removed: `#body_container` is what made me realize this.
- This will require `#pages` to pull away from `#body`.

`title` to be renamed, `id` and *title* to be placed by tiles.json.

---

##### tiles.json

_`paths.*.links.*.path`_ must be hidden, therefore abstracted from the link
- This forces `load_link()` to make lookups for the **asterisk** placeholders of this headline.
	- `type='customer', id='mortgage'` would look for _`paths.customer.links.mortgage.path`_ on the back-end.

_`paths.*.links.*.location`_ can be set to one of the following:
- _internal_  : load page into #pages
- _external_  : load external site through #outgoing
- _affiliate_ : load external site without speedbump

---

##### Drop in replacement tile for the form, and hard-coded fall-backs for JSON features.
- Will resemble, closely, the current website.

##### Revisit the _load_link()_ function, and prepare all pages to load correctly with it, whether it be in the **#pages** div or in another tab. The new window thing doesn't exactly matter.
- this means the _load()_ function will need to be finished, probably first.
- for now **all pages except for external links** will load into the front page

---

##### The css structure of the Security Center is not coordinated well with the rest of the index, which is not important for the demonstration but will need to be reassessed.
- Also pages' css names are stupid, and calculated widths don't work in IE, plus table borders still need work.

---

Something will have to be done about _.load_link_ being called twice from  *nav_links*, since *get_nav()* loads plain-text and _.on()_ is attached to _$(**document**)_.

---

##### `#user_nav` should be renamed to ~~`#nav`~~ `<nav>` to take advantage of HTML5
- add to `json/tiles.json`
- `json/tiles.json` will eventually be renamed to fit into a global scope.
- this will ultimately allow for the deletion of `json/nav.json`.

---

##### Website Meeting 12-11-14

`pages` line heights must be set to 1.5 spaced.
The demo page needs extended
- This page encouraged the decision to create a new type of tile, one that would only cover the right 3/4ths of the pages area, named **"slice"** for now.

Corrections in the JSON for Customer Service will be simple, eBanking and Demos are already taken care of.

Resize photos throughout the pages.

Make bullet points in IRA and stylize the disclaimer.

In "Card Services": phone numbers need to stand out, and dropdowns need animations.

All instances of "eBanking" need to be changed to "Online Banking."

Pages business and Online Banking, header "Anytime Access" should be changed to "Online Banking." Header "Text Banking" will be added, and "Bill Pay" is moving to slot 2. List must be bullet points.

GoClub is exclusively for customers 55 years of age, add deposit to account balance.

In "Business Services": links need to be burgundy and "eSatatements" should take link to eStatment page.

##### Bugs

1) Scaling is off in the dropdown list item height | index.js

2) 50px is added to view on every click | functions.js

##### Issues

 - Page sizes don't revert once loaded and moved from.

 - Pages that load SQL databases will have to be synchronous, though there isn't any plans for these types of databases on TBOC, there may be in future sites.

 - Button text will overflow if extended beyond its width.

---

_/res_ needs organized again

If _/lib/_ is here to stay, set jQuery inside it as well; that being kept in /js just weird.

pages probably shouldn't overflow

Testing email will require the existing _mail_ functions to be commented and replaced by my email address. This may not even be necessary since _Activate eStatements_ has been removed from the website.

The navigation links are now populated by _nav.json_, but neither _indexOf()_ nor _$.inArray()_ correctly search the objects of _nav[]_.

_#notices_ still needs converted into JSON with a URL to a specific markdown folder, similar to the hierarchy in _Landing Zone_; this markdown folder could probably be hosted on the client-side if we decide to create the control panel offline--which is mostly necessary.

jQuery wasn't handling the dropdowns all that well, so I moved to pure CSS3 transitions and only needed to set the height from javascript, this made things much nicer all in all, but there's still a sticky bit to figure out with the initial dropdown hover.

I really should figure out the best way to automate the entirety of the width, inherited from #doc.

#####Card Services -- Add Gift Card number

##### Refactor and Merge 10.0.0.246 & Localhost: Personal Services and Business Services

---

##### Wording for outgoing

You Are Leaving TBOC.com

You have selected a page outside of The Bank of Carbondale's web site. Click continue below to proceed.

The information contained in this site is not endorsed or guaranteed by The Bank of Carbondale. Also, please be aware that the security and privacy policies on this site may be different from our policy.

---

##### Search Terms

- **@bugs:**_[number]_ -- matches with *Bugs* list number
- **@debug** -- debugging code
- **@todo** -- a broken or unimplemented section.
- **@implementation** -- commented code to be implemented
-  **@out-take** -- commented code that may be used or referenced
- **@unnecessary** -- my wacko quips that should be removed for production
