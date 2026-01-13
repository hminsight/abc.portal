# Dynamics Power Pages Bootstrap 5, Sass & Gulp Boilerplate

A simple boilerplate to start your Dynamics Portal project using Bootstrap, jQuery, SASS and HTML5.
This boilerplate is unstyled ready for bootstrap configuration and custom styles

## Getting Started

### Installation

First of all, install the dependencies to run this boilerplate.

- [NodeJS](http://nodejs.org/)
  (download and install - requires version 14 or above)

- [GulpJS](http://gulpjs.com/)
  `npm install --global gulp-cli`

# install all package dependencies

`npm install`

# Audit package vunerabilities

`npm audit fix`

# run gulp

`gulp watch`

This should open your browser at http://localhost:3000 and start coding. With the commands above, you have everything to start.

Known issues

- Sometimes after starting `gulp watch` the page is plank, just SHIFT-F5 refresh the page
- Sass compiler can break and error when code is incorrect, if this happens ctrl-c and restart `gulp watch` in the terminal console.
- Responsive navigation resizing from mobile to desktop causes the header to not work correctly. Refresh the browser to fix.

## Customise the styles

This solution provides 9 example pages with, also header and footer styles

- index.html
- alerts.html
- aside-layout.html
- form.html
- payment.html
- profile.html
- signin.html
- register.html
- stepper.html

Also the basic portal scss files.

If your developing a custom portal it's recommended to remove the theme.scss or comment out the theme.css styles from the power page site, but beware this may affect certain components and layouts.

# Bootstrap Overwrite Choice

You can choose to overwrite (copy -> paste) over the out-of-the-box bootstrap.min.css in the web-files folder or keep it as is and create styles to overwrite the bootstrap.min.css in styles.min.css

If you keep the out-of-the-box bootstrap.min.css in web-files then replace the `src/css/portal-bootstrap5.css` with the css from bootstrap.min.css in your power pages site and updated the `src/html/includes/head.html` to link to this file and comment out the bootstrap.css link.

If creating a bootstrap theme the solution is ready to go.

In `src/scss/` you'll find the bootrap.scss and \_overrides.scss file

It's recommended to configure the bootstrap variables as close the designs as possible then add any further custom styles as .scss files to the solution and compile copy/upload both bootstrap.css and styles.css to the power pages solution.

Start by making initial style changes in the Bootstrap `src/scss/_overrides.scss` file to configure colours, font-sizes, padding etc... for more about customising Bootstrap https://getbootstrap.com/docs/5.3/getting-started/introduction/

The `src/scss/\_common-fixes.scss provide overwrites for common power page issues like spacing, positing and other layout issues that are in the out-of-the-box solution. Remove this

# How to use the Frontend Solution

The solution provides HTML templates that can help style a Power Page site from Brand Guides or Designs. In each page of a Power Page site there are 3 main parts a header, main content and a footer.

- head.html - This includes Power Page css libraries and meta data
- header.html/header-user.html - This is header and navigation logged out and logged in as a site user
- template.html (main content) - This is a copy and paste from the source html in Power Pages from `<div id="mainContent" class="wrapper-body" role="main"> ... </div>`
- footer.html - this is the basic html from the `<footer>`
- foot.html - This includes Power Page libraries

The templates for the header.html/header-user.html and footer.html are within the includes folder, there is also a head.html. Because header.html/header-user.html rely on Liquid Scripts its recommended to code this directly in Power Pages VS Code tool.

To create a template simply create a new html/{file-name}.html add the following html includes below and copy and paste `<div id="mainContent" class="wrapper-body" role="main"> ... </div>` into the middle

//=include includes/\_head.html
//=include includes/\_header.html

PASTE MAIN CONTENT HERE FROM POWER PAGES

//=include includes/\_footer.html
//=include includes/\_foot.html
