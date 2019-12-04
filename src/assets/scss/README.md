# Sass Style Guide

This is a coding standard guide to formatting Sass stylesheets to encourage consistency between developers in this repository. Please take a common sense approach to modifying the sass, adopting a style of 'code what you see' rather than doing your own thing. Our coding standards are inline with those set for Drupal and Bootstrap 4.

## Helper docs

* [Font Sizes Cheatsheet](FONTSIZES.md)
* [Sass Doc Annotation](http://sassdoc.com/annotations/)

## Folder Structure

More info in each folder's readme...

Filename          | Purpose
----------------- | ----------------------------------------------------------------------
`lib`             | A collection of architecturally high-level styles for basic elements 
                  | SASS resources, variables, mixins, etc. Styles for color schemes.
`lib/partials`    | Styles for components and layout that make up the theme design.
`lib/vendor`      | Styles relating to third party stuff.

## When creating new `.scss` files

Not all files have to be partials, if a piece of CSS is uncommon, or part of the admin area it's better to make it a separate file and include it as a library.

* As an example, we have an override.css file here `css/override.css`.

Dist Process :

* Run 'gulp build'
* The build will aggregate partials into `dist/assets/css/lib/main.css`.

## Basics

* Use only soft tabs equalling two spaces. No hard TAB characters.
* Remove trailing whitespace.
* Do not define a unit for 0 values. (0px should be 0)
* `//` comments will not be rendered on compile.

## Indention & Spacing

* Starting level selectors should have no indention.
* Properties should be indented once (two spaces) under their selectors.
* One space should follow a selector name before the opening declaration bracket.
* Add one space between a property (after the colon) and value.

E.g.:

```css
.selector {
  text-align: center;
  vertical-align: middle;
}
```

## Sass Formatting

### Selector Nesting

* A newline should precede and follow a selector being nested.
* Place nested selectors after the parent's properties/includes/extends/etc...

E.g.:

```scss
.selector {
  color: #ffffff;
  background: #000000;

  .nested-selector {
    text-align: center;
    border-radius: 5px;
    color: #cecece;
  }

}
```

### Media Queries and Breakpoints

We use bootstrap media queries, imported into the scss using the following declarations:

```
Small devices (landscape phones, 576px and up)
  @media (min-width: 576px) { ... }

Medium devices (tablets, 768px and up)
  @media (min-width: 768px) { ... }

Large devices (desktops, 992px and up)
  @media (min-width: 992px) { ... }

Extra large devices (large desktops, 1200px and up)
  @media (min-width: 1200px) { ... }

@include media-breakpoint-up(sm) { ... }
@include media-breakpoint-up(md) { ... }
@include media-breakpoint-up(lg) { ... }
@include media-breakpoint-up(xl) { ... }

```

### Mixins, Nesting, and Breakpoints

* When using mixins that act as containers for style declarations (such as `@include breakpoint()`), never nest a selector within the mixins brackets.
* `@includes` etc... should be placed (when sensible) at the end of a selector's properties. Specifically, add any breakpoint mixins in order of progressive enhancement.

E.g.:

```scss
.selector {
  color: #ffffff;
  background: #000000;
  @extend %selector-to-extend;
  @include element-invisible;
  @include breakpoint(lima) {
    color: #eeeeee;
  }
  @include breakpoint(papa) {
    color: #cccccc;
  }

  .nested-selector {
    // Nested selector content here.
    // Notice the newlines.
  }

}
```

### 'Quotes'

Single '' quotes only please.

# Multiple selectors

Multiple selectors require a new line:

/* Bad CSS */
.selector, .selector-secondary, .selector[type=text] {
  padding:15px;
  margin:0px 0px 15px;
  background-color:rgba(0, 0, 0, 0.5);
  box-shadow:0px 1px 2px #CCC,inset 0 1px 0 #FFFFFF
}

/* Good CSS */
.selector,
.selector-secondary,
.selector[type="text"] {
  padding: 15px;
  margin-bottom: 15px;
  background-color: rgba(0,0,0,.5);
  box-shadow: 0 1px 2px #ccc, inset 0 1px 0 #fff;
}

### Extending

While Sass' `@extend` functionality is pretty, it causes a lot of maintenance
nightmares, so use it sparingly. The one absolute rule is:

*Do not `@extend` a selector onto a selector in a different file.*

In those cases it's usually best to use a mixin.

## Class Naming Conventions

This project leverages a *Component*-*Element*-*Modifier* syntax for naming
classes. This produces rather lengthy class names but also provides quick,
easily discernible information to developers.

The syntax looks like this:

```scss
.component
.component__element
.component__element--modifier
```

The class names in this syntax do not imply any structural hierarchy in regard
to markup. More often than not, the base _component_ class is the containing
element of the sub-components, but this is not always the case. You may end up
with a markup structure in which an _element_ is placed above the base
_component_ like so:

```html
<div class="component__wrapper">
  <div class="component">
    <!-- other markup here -->
  </div>
</div>
```

There are two ways which _modifier_ classes are usually applied. The first
way is by creating the modifier class as an extension of the base class thereby
ensuring that only one class is needed on a given element. This produces
compiled CSS with many duplicate properties applied to classes and is not the
preferred method.

```sass
.component__element {
  // styles
}

.component__element--modifier {
  @extend .component__element;
  // More styles
}
```

Instead, modifier classes should be applied *in addition* to base classes to
achieve the desired result.

```sass
.component__element {
  // styles
}

.component__element--modifier {
  // separate or overriding styles
}
```

```html
<div class="component">
  <div class="component__element component__element--modifier"></div>
</div>
```

## Modular Scale Typography

We're using what's called [modular scale](https://alistapart.com/article/more-meaningful-typography) for our typography. This means all of our type sizes are based on a ratio. We have a few helper functions.

You can use the mixin `font-size()` to declare the font-size you want, if you're looking at a mockup with font-sizes in px you can use [Font Sizes Cheatsheet](FONTSIZES.md).

Here's an example:

```scss
.component {
  @include font-size(2); // From the cheatsheet we see 2 will result in 22.5px
}
```

## Other Conventions

* Do not add units to 0 values.

   ```scss
   // No.
   margin: 0px auto;
   // Yes.
   margin: 0 auto;
   ```

### CSS Property Declaration Order

This project follows Drupal's CSS declaration order:

```scss
.selector {
  // Positioning declarations
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  // Box model declarations
  display: inline-block;
  width: 100px;
  padding: 10px;
  border: 1px solid #333333;
  // Other declarations
  background: #000000;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 10px;
}
```

More information can be found here: [drupal.org](https://www.drupal.org/docs/develop/standards/css/css-formatting-guidelines#declaration-order)

### Declaring Colour

Always use one of the predefined Sass variables in place for colours.

```scss
// No.
color: #121212;
// Yes.
color: $secondary;
```

### Comments

Sectioning comments should look like so, with bottom borders extending to 80
characters:

```scss
// This is a section
// -----------------------------------------------------------------------------
.selector {
  color: $blue;
}
```

