# JavaScript & DOM Questions

A simple guide to fundamental JavaScript concepts used in this project.

---

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

***getElementById:*** used when a element is set with an uniqe id, any other element could not be matched with another id attibrute.

***getElementsByClassName:*** used for grab those tems which class is same but the other styling, text element is different from one another. It's like a parent and child, biologically parents can be just one father and mother, but the childs are different with the same DNA. Mainly this js command is meant to be Reused.

***querySelector:*** Mainly find the first match and stops along with a single element or object, Return null if no matched. used for a specific id or attribute.

***querySelectorAll:*** Find every match on the page, return NodeList and if no match, return an empty list. used for mainly button, list item

Here is a simple way to show that how to grab elements from the HTML.

- **`getElementById`**: Used for a unique ID. Only matches one specific element.
- **`getElementsByClassName`**: Used to grab multiple items with the same class. Useful for reusable styles and components.
- **`querySelector`**: Finds the **first** match on the page. Returns a single object or `null`.
- **`querySelectorAll`**: Finds **every** match on the page and returns a `NodeList`. Perfect for selecting all buttons or list items at once.

---

### 2. How do you create and insert a new element into the DOM?

A DOM is hidden in the webpage, it's like internal things.

*const divCase = document.getElementById("div")
let name =["S.M"]
name.push("Hasan")
divCase.textContent = name.join(".")
name.pop()
divCase.textContent = name.join("=")*

*Example of updating text content:*

```javascript
const divCase = document.getElementById("div");
let name = ["S.M"];
name.push("Hasan");
divCase.textContent = name.join("."); // Result: S.M.Hasan
```

---

### 3. What is Event Bubbling? And how does it work?

When an event clicked, it raised up to its parents, grandparents and up to the window.If a delete button is clicked, then the click event goes for the parent div, then body. Use this to handle many items with one listener. The process where an event "rises" through the DOM.

- **How it works**: When you click a child element (like a button), the click event travels up to its parent, then grandparent, all the way to the `window`.
- **Use case**: We use this behavior to handle many items with just one single listener at the top.

---

### 4. What is Event Delegation in JavaScript? Why is it useful?

Allows to manage events for multiple elements using a single event listener on a common parent. it comes for event bubbling. Without the delegation, i have to create mutltiple add event listener functions. It consumes the memory. so use only one common parent for delegation the object.

Managing events for multiple elements using a single common parent.

- **Why it's useful**: Instead of creating mutliple listeners for multiple buttons (which uses a lot of memory), you create one listener on the parent.
- **Benefit**: Highly memory-efficient and automatically works for new items added to the list later.

---

### 5. What is the difference between `preventDefault()` and `stopPropagation()` methods?

**`preventDefault()`: ** It stop the Action. Click on a URL link so that the browser can not go another page.
It stop the browser any kind of links in page.

**`stopPropagation()`:** It stop the message. The stopPropagation() methods can not stop the default behavior of the browser. The Parent's reaction (Bubbling) and it did not tell the parents that it did something.

Two methods to control how events behave.

- **`preventDefault()` (Stop the Action)**:
  - Stops the browser's natural behavior.
  - _Example_: Stops a URL link from opening a new page or a form from reloading.
- **`stopPropagation()` (Stop the Message)**:
  - Stops the "Bubbling" process.
  - _Effect_: It prevents the parent elements from hearing that the event happened. It doesn't stop the browser's default action, just the communication.

---
