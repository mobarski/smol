# Installation

Copy `small-lang` directory into:
    - Linux: `~/.vscode/extensions`
    - macOS: `~/.vscode/extensions`
    - Windows: `%USERPROFILE%\.vscode\extensions`



# Debug

Ctrl+Shift+P -> "Developer: Inspect Editor Tokens and Scopes"



# References

- https://macromates.com/manual/en/language_grammars
- https://www.apeth.com/nonblog/stories/textmatebundle.html



```
comment*
    line
        double-slash
        double-dash
        number-sign
        percentage
        [character]
    block
        documentation
constant*
    numeric*
    character
        escape*
    language*
    other
entity
    name
        function*
        type*
        tag()
        section*
    other
        inherited-class*
        attribute-name*
invalid*
    illegal
    deprecated
keyword*
    control [control.import*]
    operator [operator.js*]
    other
markup
    underline**
        link
    bold**
    heading*
    italic**
    list*
        numbered
        unnumbered
    quote* (and **)
    raw
    other
meta
storage*
    type [type.method*]
    modifier
string* (and string source*)
    quoted
        single
        double
        triple
        other
    unquoted*
    interpolated
    regexp
    other
support
    function*
    class*
    type*
    constant*
    variable*
    other [other.variable*]
variable
    parameter*
    language*
    other*
```

