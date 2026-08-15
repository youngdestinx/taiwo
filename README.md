# Genial Food

A responsive food ordering learning project.

## Current features

- Intro/onboarding screen
- Responsive hero and menu
- Category filtering
- Food images with emoji fallback
- Add-to-cart confirmation toast
- Shopping cart and quantity controls
- Delivery/pickup selection
- Live totals and order preview
- WhatsApp order generation
- Full-width fixed mobile bottom navigation
- Responsive layout

## Files

- `index.html` — page structure
- `css/style.css` — styling
- `js/app.js` — interactions and ordering logic
- `images/` — reserved for local image assets
- `genial-food.html` — standalone version containing HTML, CSS, and JavaScript

The food images currently load from Unsplash URLs so the project can be tested immediately.


=========================================Reflection Exercise.========================================
UNDERSTANDING ALL THE FUNCTIONS.
=====================================================================================================

1. The Genial header that always stick.
This is achieved by using position sticky and top 0, left 0. This made the header to be stick to the top 
left corner. It is always there when scrolled. width is set to 100% so it takes the full width of the 
container and the min-height is set to 72px. This is smallest posible height for the header.

2. The cart icon design.
This is a button that has a text content of cart and a span that contain numbers.

The design is simple. Set the display to flex, and the align item as center to put the text content and span vertically at the centre. Give it a min-height of your choice, a gap of your choice and make the border-radius 9999px to give a smooth roundish effect. The padding is where the miracle lives. make the left side bigger than
the right.

set the min-width and height of the span as the same. Set it display as grid and place-item to centre. The 
border-radius should be 50% for a perfect circle.

3. The logo design
The logo div consist of a span with a text content of the logo (emoji or image) and a div that contained
the brand name in a strong element and the brand description in a small element.

The design is simple. Set the logo display as flex, align item as centre and a small gap.

Set the display of the logo icon or span as grid then place-item as centre. This make the icon to be
perfectly placed at the centre. The icon should have the same width and height and a small border radius to 
round it edges. 

The strong and small element should be display as block then their sizes should be big and small respectively.

4. The nav design
the nav consist of three a tag where each a tag has a text content and a span. The cart span contains a text content and a span.

The nav container is given a min-height that equals that of the header. it position is set at sticky and it
top value at the value of the header min-height. This makes it to stick immediately after the header. The
display is set at flex and flex-direction-column as repeat(3, 1fr) to create three equal columns. Because 
we are using column, the align-item and justify-content property is set to centre.

The a tag is display as flex and made a column. the align item and justify content is set at centre too 
with a small gap.

5. The onboarding page.
The logic is simple. Create a simple function that does three things. One it select the onboarding
div and add a class of hidden on it. second, select the main content and remove the class of hidden already
on it html. third add a locale storage and set it value to true through localeStorge.settitem("key", "value")

Next select the skip and next button. add the function to it when the button is click.

Lastly, get the localStorage key and store it in a container. check if it returns true. If it returns true,
call the function.

the css is simple. select the .hidden class and set it display as none. make it important

6. The category button. they are just created using flex and flex wrap, so it doesnt overflow but continue
on a new line. It work with the food grid class directly under it in the HTML. When the any category button
is clicked, it filters the "all" and display specific food such as protein.

The functionality.
============================================================
To display the cards dynamically, we will carry the following steps.

1. create an array of foodItem objects
2. select all the category buttons
3. select the empty food grid div
4. create two functions. One to display the cards dynamically and one to filter the category
   and display the filtered cards.


============= renderCards()===== This function display all the cards when the page loads =============
1. create the function and give it a default parameter of category === "all"
2. create a new variable to hold the filtered foodItem objects
3. when the category is all return all the foodItems but when it is not return the filtered foodItem object
4. create a new article element and store it as cards.
5. set the card inner HTML property to contain two divs. One for the image and the other for text content
6. append this card to the empty food grid div.
7. call the function without a parameter so it default runs.


=============== arrow function===== This function filtered the category and render the filtred cards
1. create an event listener on each of the category buttons.
2. listen for when the button is click then run the arrow function
3. the arrow function:
    1. create a category variable that store the value of the data-category from the buttton
    2. remove the active class from all the buttons
    3. add the active class only on the click button
    4. call the renderCards function with the category parameter.


=========== Create the add to cart functionality =================================
1. create an empty cart, it will be an array of object
2. we need the following properties: id, name, price and quantity.
3. We will be creating this cart array from the foodItem array. 
4. To do this, we have to find an array object from the fooditem with a specific id.
5. Once we have found that object we can then create a cart item with it.
6. If it is found already, we simply increase the quantity attribute of the cart object.

7. to do this, we need two helping funcions, the showToast and findFoodItem functions.
8. The showToast function shows the message that a specific item has been added to the container.
9. the findFoodItem find and returns a specific food item using an id.
10. that id is gottten when we click on any button on the food item. (when we click on "order")


============ Create the remove from cart functionality ====================================
To remove an item from the cart, all you need is the id of the item to be removed, then you filtered
the cart if the id is false, i.e, you create a new cart with items except the item with the designated id.


