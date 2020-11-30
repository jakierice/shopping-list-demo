# Shopping List App Exercises

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running the App

In the project directory, you can run:

### `yarn start`

This will run the app in the development mode.\
The page will reload if you make edits.\
You will also see any lint errors in the console.

--------------------

## Exercises

The following list contains a few "feature requests" that might make the Shopping List app
a little more useful. There is also a known issue that needs to be fixed.

### Features to Add

Each of the following features can be added independently, and each feature will
add new value for the app's users. Be creative and solve the problems however
you can. You can use these exercises as an opportunity to:

  - Ask for review and advice on the design of your feature code and solutions
  - Pair program with a peer
  - Practice going through code reviews with a mentor

#### [FEAT1] Delete items from a shopping list

The current shopping list implementation does not provide the user with a way
to delete an item.

##### Must Haves

1. Each item in the list should have a "Delete" button

    - When the "Delete" button is clicked by the user, that item should be removed from the list

##### Nice to Haves

1. "Undo" button

    - When a user clicks the "Undo" button **the last shopping list item that was deleted will be added back to the list**
    - If no items have been deleted, **do not display the "Undo" button**

2. "Deleted" list

    - Shows the **last 10 items** that have been deleted off of a shopping list
    - If no items have been deleted off of the list, **show a message or icon to let the user know nothing has been deleted**

#### [FEAT2] Save shopping list

Users should be able to open the shopping list app and see the shopping lists they made in the past.

##### Must haves

1. "Save" button

    - When user clicks "Save" button, the **shopping lists are saved in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)** so that is will persist between browser refreshes.

##### Nice to haves

1. Auto save

    - The shopping lists **save to
  [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
  every 5 seconds**

2. "Clear" button

    - When user clicks "Clear" button, shopping lists and saved data are both
  completed deleted

#### [FEAT3] UI styles

The app is currently a bit dull. Use something like a CSS framework or React component library to make this
Shopping List App a bit nicer to look at.

### Bugs to Fix

#### [BUG1] Can't add items to first shopping list

Fix the first shopping list to behave as expected.

##### Expected behavior

1. Users should be able to add items to every shopping list

##### Actual behavior

1. There are two shopping lists in the app
2. The first shopping list already has list item when the app loads
3. There is no way to add new items to the first shopping list
4. The second shopping list behaves as expected
