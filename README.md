# SFU Surge frontend technical take-home
[Deployed here](https://goldentoaste-frontend-technical.vercel.app/)

The code isn't documented via comments that well, not feelin' it. Here are some explanations.


## Masonry grid
The masonry grid as shown in the design document is [not natively supported in html](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Masonry_layout). So
for this project it is faked with 3 flex columns, see `ReviewList.tsx`. Whenever the list the reviews changes, they are distributed amongst the 2 columns when rendering, so that
each column item take up all spaces available, while keeping relative order in "rows" of the grid.

During initial render, and also whenver the size of window changes, the current width of screen is checked to decide how many columns there should be. This is probably not possible with just css media queries.

## Loading data
There is mock api in `src/lib/api.ts`, where some small artificial delay is added. The frontend pulls the total count, and incrementally fetches from api to populate the grid of reviews.
Intially 20 items is fetched, enough to fill the screen for most screen sizes (it's not possible to determine how item is needed to fill screen during ssr, and is *very* hard to determine at client side, 
so might as well to just to choose a reasonable constant).

## Load More button
Load more button is a component wrapper for a button, that has position absolute to postion at bottom of the grid. The button is a child of a div of gradient background, to make positioning bit easier.

Button has a "gradient border", which is faked by having a linear gradient background, and a solid background in a ::before psudo element in front of it, which is shrinked a bit to reveal the gradient background
to appear like a border. A true gradient border is not supported in css.

Clicking the button hides itself, and also enables the list to load more content when ever the bottom of the list is scrolled to be almost visible, to make it appear like a infinite scrolling list. See implementation in
`ReviewList.tsx`

## Review star ratings
Star ratings is a single div with yellow background, that has the `star.svg` applied to it as a repeating mask to only show the yellow star regions. The width of div is calculated to only reveal the correct number of stars.
The advantage of doing it this way is, instead of 5 divs or imgs, only 1 svg is being rendered, and that the svg is not an inline svg, yet it's color can be controlled from css.

## Profile icons
Profile icons are fetched from DiceBear as recommended, and using the user name as seed the api, so that each user always get the same profile icon.

## Project oranganizations: Css
Vanilla css is used, for components with complex css (such as `Button.tsx`) or multiple css classes is involved (such as `ReviewItem.tsx`), while simpler element styles or one-off element styles
are done inline in the components. Chose to do it this way before because css-in-js is awkward and error-prone, and I like writing real css more.

## Project oranganizations: path alias
Path alias is configured in tsconfig, to avoid writing complex relative imports in components usages, because `../../../../some_components/Button.tsx` is ugly. All reusable code and components are in `$lib` path alias.
Relative importants within `$lib` is fine since they are usually more self contained. 

Note: Vite's support for path alias is poorly documented :/

## Project oranganizations: Assets
Vite refused to import and include static assets in src folder during build time, for some reason. Assets such as `star.svg` is in the `public` folder.


## Closing thoughts
All things considered, this project isn't too hard.

*But,* the way React handles passing around callbacks, and modifying states within callback functions behaves very unintuitivesly, and so is very hard to debug. 
This is most likely because react is representing components as function, and during each "re-render", the function is called again, leading to strange behaviours.(
    this is basically why most of the hooks exists right :P
)

Consider using literally any other framework :v