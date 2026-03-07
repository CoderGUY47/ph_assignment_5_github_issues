# JavaScript Knowledge & Project API

---

## 🏗️ JavaScript Fundamentals

### 1️⃣ What is the difference between var, let, and const?

> **use let** when the value of a variable needs to be updated later in your code. For example, if you are calculating a total price in a shopping cart, let allows change product in its specific block.
```javascript
let score = 10; 
```

> **use const** (short for constant) for any value that will not change. It protects the data. If anyone accidentally try to change a const value, the program will show an error immediately, helping find bugs faster.
```javascript
const pi = 3.14;
```

> **Ignore var**, either it can cause "bugs" in both mini and large projects. let and const stay exactly where we can put them (inside the curly braces { }).
```javascript
var old = 0;
```

---

### 2️⃣ What is the spread operator (...)?

> The spread operator which is mainly three dots `...` and useful for copying things. If there is an array and put it inside another array, then use the dots. It "spreads" the items out so user don't have to write them one by one. It's less time consuming for developers.

---

### 3️⃣ What is the difference between map(), filter(), and forEach()?

These 3 are for arrays but they do different work.

*   **`forEach()`**: just go through the list and do it's thing, but it does not give back anything.
*   **`map()`**: is changing the list. It take a list and give back a new list with same size.
*   **`filter()`**: is picking specific things. If user want only "closed" issues, then used to remove the others.

---

### 4️⃣ What is an arrow function?

> Arrow function is a easiest way to write functions using `=>`. It is shorter than the old `function` word. Also, it handle the `this` keyword better in some cases. For this, the code would be finish in one line and looks clean.

**With function keyword:**
```javascript
const double = function(n){ 
    return n * 2; 
};
```

**With arrow function:**
```javascript
const double = (n) => { 
    return n * 2; 
};
```

---

### 5️⃣ What are template literals?

If we want to use variables inside a string, we use backticks `` ` `` . Sometimes we need to use multiple lines in html, so we create a div container in html file for multiple cards, then call it in js file with ".innerHTML". Like this, it's very helpful but it makes js file heavier.

```javascript
card.innerHTML = `
    <div class="issue-card">
        <div class="issue-content">
            <h3 class="issue-title">${issue.title}</h3>
            <p class="issue-desc">${issue.description}</p>
        </div>
    </div>
`;
```

> We also use it to put variables directly inside the string using `${variable}`. It is much easier than using the `+` plus sign to join strings and variables.

---

## 🚀 API Endpoints Section

This project uses the Phi Lab API to manage GitHub issues. Below are the links:

| Purpose | Endpoint URL |
| :--- | :--- |
| **Get All Issues** | `https://phi-lab-server.vercel.app/api/v1/lab/issues` |
| **Get Single Issue** | `https://phi-lab-server.vercel.app/api/v1/lab/issue/{id}` |
| **Search Issues** | `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q={searchText}` |

### 💡 Examples:

*   **Detail**: `https://phi-lab-server.vercel.app/api/v1/lab/issue/33`
*   **Search**: `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=notifications`
