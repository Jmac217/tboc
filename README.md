### DOCUMENTATION.md

##### Overview of Changes From Old to New

- The file system is actually manageable now.  
- I went through the in-line styles, stupidly named classes, and unbearable folder hierarchy and HTML/CSS structure and renamed everything to fit a common pattern.  
- I also went through all included files, headers and footers, functions and connections, and pulled them all into the places they were supposed to have appeared to begin with.  
- Lastly I removed all of the image-based titles, and found a suitable font for these headers.  

---

##### filesystem changes  

The folder structure has been jumbled slightly to remove abstracted folders, but only to clutter things in the `/pages/old` file, which has now been sorted out in `/pages/`
- `/pages/old` is the place to pull out files and place them accordingly, should they be needed, which at this point seems unlikely.
- Since there are so many `i_*` files I'll probably set up an `/pages/include` file for the time being, but eventually all `i_*` files' contents will be added to the respective main (_index.html_) file and discarded.
- This change has already been implemented into the index. Files that get loaded inside of the pages div will have these inclusions removed all together.  

`/pages/old` has been copied from **and** cut from so it is not complete while also housing files that have been copied into `/pages/[respective folder]` -- things are messy only in that folder. However, aside from the include folder, there were only a few other folders created in `/pages/`:
- `/download` => for PDFs
- `/admin`    => for respective administrators (ie Margaret, Elizabeth, Rhonda, etc...)
- `/apps`     => other things that don't fit or provide standalone functionality

---

##### load_link() attributes overview

All internal files are loaded into `#pages` with _load_link()_, while all external pages go through a _speed bump_ jQuery UI element called `#outgoing`.

- To get at this change there is a `type`attribute associated with the element used to determine whether it should be loaded into the index or in a new tab or window.
- This function only needs a path, but optionally accepts location and window type. (see `/json/tiles.json -> paths`)
- The `path` attribute will be used to open the page, obviously, but also to populate the navigation array. (see `/json/nav.json`)
  - `Location` can be _internal_ or _external_ and `window` will either be set to _current_, _new_, or _tab_.
- `path` attributes set to _external_  call the `#outgoing` flag in the _load_link()_ function, which brings up the UI element and displays the link to be navigated to, while _internal_ will look for the `window` parameter to determine where to load the given page.
- If no `window` parameter is provided the page will be loaded into `#pages` by default.
  - Anchors may receive this function via _.load_link_ class with parametrized attributes.

---

##### Notices

The generated notice area is working in a mostly hard-coded state.
There is a function in `/js/index.js` called _notice()_ that takes a _bool_ and a _string_; respectively, whether or not to load the function, _loaded_, and a _path_ to the file to be loaded.
The loaded file should be written in Markdown and parsed by _parsedown.php_, a PHP Markdown library. These files should either be written with a `.md`, or `.html` extension if Markdown is not to be used.
- A WYSIWYG is in the works, but isn't a high priority, for users unfamiliar to Markdown. The form is only partially created and needs work, and currently uses _XML_. (see `/JSON/notice.php` and `/pages/admin/`)
  - The WYSIWYG form will have a type(_alert_, _warning_, _info_, and can support custom sets for various styles), head, body, date, {rows}
  - This form, with a work space attached to it, is located at `/admin/index.php`.
  - This is where things are being hooked together for testing.
  
---

##### Some Thoughts on Administration Validation.

I think the best way to deal with the administration aspect is by validating a cookie.
- This cookie will be created by someone with _administration_ rights to the site.
- Only an admin can create an admin
- Only someone with the cookie will be allowed to be verified.
- There will be an internal link provided to officers of the bank to link to this secret path.
- On this page there will be a secure login system.
- Once you're logged in it will set your cookie to die in 1 hour. This cookie is checked by the index if a session variable is set by the login.
- It will be important to separate the files accessible on the web from the files they include.
- `admin_cookie.php` could be used for this, or just avoid the entire mess and negate the preceding bullet points by hosting the panel offline...
  - If it's the case that the admin panel will only be accessible from the intranet, as it should be, then the cookie setting won't be necessary for login keys; just a database query and a password should suffice for admin logins.