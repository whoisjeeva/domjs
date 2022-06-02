class Template {
    constructor(el, model) {
        this.el = el
        this.model = model
    }

    scopeEval(scope, script) {
        return Function('"use strict";return (' + script + ')').bind(scope)();
    }

    bind() {
        this.onclick()
        this.text()
    }

    onclick() {
        let els = Array.from(this.el.querySelectorAll("[dom\\3A onclick]"))
        for (let el of els) {
            el.addEventListener("click", e => {
                let attr = e.target.getAttribute("dom:onclick")
                if (attr) {
                    attr.replace("}${", "} ${")
                    let scopes = [...attr.matchAll(/\$\{(.*?)\}/g)]
                    for (let scope of scopes) {
                        let m = scope[1].replace("${", "").replace("}", "").trim()
                        if (m.includes("(") && m.includes(")")) {
                            this.model.$ref = e.target
                            try {
                                this.scopeEval(this.model, "this."+ m)
                            } catch(e) {
                                this.scopeEval(this.model, m)
                            }
                            this.model.$ref = null
                        }
                    }
                }
            }, false)
        }
    }

    text() {
        let els = Array.from(this.el.querySelectorAll("[dom\\3A text]"))
        for (let el of els) {
            let attr = el.getAttribute("dom:text")
            if (attr) {
                attr.replace("}${", "} ${")
                let scopes = [...attr.matchAll(/\$\{(.*?)\}/g)]
                if (scopes.length === 0) {
                    el.textContent = attr
                }
                for (let scope of scopes) {
                    let m = scope[1].replace("${", "").replace("}", "").trim()
                    this.model.$ref = el
                    try {
                        el.textContent = this.scopeEval(this.model, "this." + m)
                    } catch (e) {
                        el.textContent = this.scopeEval(this.model, m)
                    }
                    this.model.$ref = null
                }
            } else {
                el.textContent = ""
            }
        }
    }
}


export { Template }
