### TODO

##### Change Demos to "Holiday Hours | More Information" With the speech bubble icon

---

##### Revisit the _load_link()_ function, and prepare all pages to load correctly with it, whether it be in the **#pages** div or in another tab. The new window thing doesn't exactly matter.
- this means the _load()_ function will need to be finished, probably first.
- for now **all pages except for external links** will load into the front page

---

##### The css structure of the Security Center is not coordinated well with the rest of the index, which is not important for the demonstration but will need to be reassessed.
- Also pages' css names are stupid, and calculated widths don't work in IE, plus table borders still need work.

---

Something will have to be done about _.load_link_ being called twice from  *nav_links*, since *get_nav()* loads plain-text and _.on()_ is attached to _$(**document**)_.

---

##### `#user_nav` should be renamed to `#nav`
- add to `json/tiles.json`
- `json/tiles.json` will eventually be renamed to fit into a global scope.
- this will ultimately allow for the deletion of `json/nav.json`.

---

##### Bugs

1) Scaling is off in the dropdown list item height | index.js

---

_/res_ needs organized again

If _/lib/_ is here to stay, set jQuery inside it as well; that being kept in /js just weird.

pages probably shouldn't overflow

Testing email will require the existing _mail_ functions to be commented and replaced by my email address. This may not even be necessary since _Activate eStatements_ has been removed from the website.

The navigation links are now populated by _nav.json_, but neither _indexOf()_ nor _$.inArray()_ correctly search the objects of _nav[]_.

_#notices_ still needs converted into JSON with a URL to a specific markdown folder, similar to the hierarchy in _Landing Zone_; this markdown folder could probably be hosted on the client-side if we decide to create the control panel offline--which is mostly necessary.

jQuery wasn't handling the dropdowns all that well, so I moved to pure CSS3 transitions and only needed to set the height from javascript, this made things much nicer all in all, but there's still a sticky bit to figure out with the initial dropdown hover.

I really should figure out the best way to automate the entirety of the width, inherited from #doc.

---

##### Search Terms

- **@bugs:**_[number]_ -- matches with *Bugs* list number
- **@debug** -- debugging code
- **@implementation** -- commented code to be implemented
-  **@out-take** -- commented code that may be used or referenced
- **@unnecessary** -- my wacko quips that should be removed