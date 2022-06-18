## Getting Started

Include `domjs` in your project:

```html
<script src="https://cdn.jsdelivr.net/gh/whoisjeeva/domjs/dist/dom.min.js"></script>
```


I am trying to implement a templating feature in this project. I can bind a model to an element and then update the element with the model. Each element bound by the model has a scope, so that all the children of that element has access to the model.

```html
<button dom:onclick="${ alert('hello, world') }${ hello('hi') }" dom:text="${ confirm() }">Click me!</button>

<script>
    let model = {
        name: "John",
        hello: function(message) {
            console.log(message)
            console.log(this)
        }
    }

    $("body").bind(model)
</script>
```
