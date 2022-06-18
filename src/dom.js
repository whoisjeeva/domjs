import { Stack } from "./core/stack"
import { Extension } from "./core/extension"
import { Template } from "./core/template"
import { request } from "./core/request"

import { getElementStyle } from "./util/get_element_style"


class DOM extends Array {
    constructor(selector) {
        super()
        this.initialSelector = selector
        this.init()
    }

    init() {
        if (this.initialSelector instanceof HTMLElement) {
            this.push(this.initialSelector)
        } else if (typeof this.initialSelector === "string") {
            if (this.initialSelector.includes("<") && this.initialSelector.includes(">")) {
                let div = document.createElement("div")
                div.innerHTML = this.initialSelector
                this.push(div.firstChild)
            } else {
                Array.from(document.querySelectorAll(this.initialSelector)).forEach(el => this.push(el))
            }
        } else if (this.initialSelector instanceof Array) {
            this.initialSelector.forEach(el => this.push(el))
        }
    }

    get(index) {
        return new DOM(this[index])
    }

    bind(model) {
        let template = new Template(this[0], model)
        template.bind()
        return template
    }

    append(html) {
        if (html instanceof HTMLElement) {
            this.forEach(el => el.appendChild(html))
        } else if (typeof html === "string") {
            this.forEach(el => el.innerHTML += html)
        } else if (html instanceof DOM) {
            this.forEach(el => el.appendChild(html[0]))
        }
        return this
    }

    appendTo(selector) {
        let el = new DOM(selector)
        el.append(this)
    }

    prepend(html) {
        if (html instanceof HTMLElement) {
            this.forEach(el => el.insertBefore(html, el.firstChild))
        } else if (typeof html === "string") {
            this.forEach(el => el.innerHTML = html + el.innerHTML)
        } else if (html instanceof DOM) {
            this.forEach(el => el.insertBefore(html[0], el.firstChild))
        }
        return this
    }

    addClass(className) {
        for (let element of this) {
            element.classList.add(className)
        }
        return this
    }

    removeClass(className) {
        for (let element of this) {
            element.classList.remove(className)
        }
        return this
    }

    toggleClass(className) {
        for (let element of this) {
            element.classList.toggle(className)
        }
        return this
    }

    hasClass(className) {
        let el = this[0]
        return el.classList.contains(className)
    }

    /* perform a querySelector inside the element */
    find(selector) {
        let els = []
        for (let element of this) {
            els = els.concat(Array.from(element.querySelectorAll(selector)))
        }
        return new DOM(els)
    }

    /* returns element that can be matched with given selector */
    filter(selector) {
        let els = []
        for (let el in this) {
            let box = document.createElement("div")
            box.appendChild(this[el])
            let matches = box.querySelector(selector)
            if (matches) {
                els.push(matches)
            }
        }
        return new DOM(els)
    }


    on(event, callback) {
        let events = event.split(" ")
        for (let element of this) {
            for (let event of events) {
                element.addEventListener(event, callback)
                Stack.events.push({ element, event, callback })
            }
        }
        return this
    }

    off(event) {
        let events = event.split(" ")
        for (let element of this) {
            for (let event of events) {
                let e = Stack.events.find(e => e.element === element && e.event === event)
                if (e) {
                    element.removeEventListener(event, e.callback)
                    Stack.events.splice(Stack.events.indexOf(e), 1)
                }
            }
        }
        return this
    }

    clear() {
        for (let element of this) {
            let e = Stack.events.find(e => e.element === element)
            if (e) {
                element.removeEventListener(e.event, e.callback)
                Stack.events.splice(Stack.events.indexOf(e), 1)
            }
        }
    }

    children() {
        let els = []
        let el = this[0]
        if (el) {
            els = Array.from(el.children)
        }
        return new DOM(els)
    }

    parent() {
        return new DOM(this[0].parentElement)
    }

    html(html) {
        if (html === undefined) {
            return this[0].innerHTML
        }
        for (let element of this) {
            element.innerHTML = html
        }
        return this
    }

    text(text) {
        if (text === undefined) {
            return this[0].innerText
        }
        for (let element of this) {
            element.innerText = text
        }
        return this
    }

    val(value) {
        if (value === undefined) {
            return this[0].value
        }
        for (let element of this) {
            element.value = value
        }
        return this
    }

    attr(name, value) {
        if (value === undefined) {
            return this[0].getAttribute(name)
        }
        for (let element of this) {
            element.setAttribute(name, value)
        }
        return this
    }

    removeAttr(name) {
        for (let element of this) {
            element.removeAttribute(name)
        }
        return this
    }

    remove() {
        for (let element of this) {
            element.remove()
        }
        return this
    }

    css(name, value) {
        if (value === undefined) {
            if (name instanceof Object) {
                for (let element of this) {
                    for (let key in name) {
                        element.style[key] = name[key]
                    }
                }
            } else {
                return getElementStyle(this[0], name)
            }
        }
        for (let element of this) {
            element.style[name] = value
        }
        return this
    }

    each(callback) {
        for (let element of this) {
            callback(element)
        }
        return this
    }

    enable() {
        for (let element of this) {
            element.disabled = false
        }
        return this
    }

    disable() {
        for (let element of this) {
            element.disabled = true
        }
        return this
    }

    extend(selector) {
        let dom = new DOM(selector)
        for (let element of dom) {
            if (this.indexOf(element) === -1) {
                this.push(element)
            }
        }
    }

    first() {
        return new DOM(this[0])
    }

    last() {
        return new DOM(this[this.length - 1])
    }

    hide() {
        for (let element of this) {
            element.style.display = "none"
        }
        return this
    }

    show() {
        for (let element of this) {
            element.style.display = "block"
        }
        return this
    }

    submit() {
        if (this.length > 0) {
            this[0].submit()
        }
        return this
    }

    height(value) {
        if (value === undefined) {
            return this[0].offsetHeight
        }
        for (let element of this) {
            element.style.height = value
        }
        return this
    }

    width(value) {
        if (value === undefined) {
            return this[0].offsetWidth
        }
        for (let element of this) {
            element.style.width = value
        }
        return this
    }

    innerWidth() {
        return this[0].clientWidth
    }

    innerHeight() {
        return this[0].clientHeight
    }

    disabled() {
        return this[0].disabled
    }

    offset() {
        let rect = this[0].getBoundingClientRect()
        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        }
    }

    position() {
        let rect = this[0].getBoundingClientRect()
        return {
            top: rect.top,
            left: rect.left
        }
    }

    scrollTop(value) {
        if (value === undefined) {
            return this[0].scrollTop
        }
        for (let element of this) {
            element.scrollTop = value
        }
        return this
    }

    scrollLeft(value) {
        if (value === undefined) {
            return this[0].scrollLeft
        }
        for (let element of this) {
            element.scrollLeft = value
        }
        return this
    }

    scrollWidth() {
        return this[0].scrollWidth
    }

    scrollHeight() {
        return this[0].scrollHeight
    }

    offsetParent() {
        return new DOM(this[0].offsetParent)
    }

    siblings() {
        let els = []
        let el = this[0]
        let parent = el.parentElement
        for (let child of parent.children) {
            if (child !== el) {
                els.push(child)
            }
        }
        return new DOM(els)
    }
}


window._ = Extension.prototype
window.$ = selector => {
    return new DOM(selector)
}
window.$.__proto__.request = request

window.Template = Template

