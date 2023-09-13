from bisect import bisect
import re

def tokenize(text):
    # requires whitespace to separate tokens
    tokens = re.findall('[(][^)]*?[)] | [{][^}]*?[}] | \[[^\]]*?\] | [#][^\n]*\n | [;,]+ | \S+',text, re.VERBOSE)
    tokens = [t for t in tokens if t[0] not in '#({[];,'] # remove comments, semicolons and commas
    return tokens

def convert_numbers(x):
    try: return int(x)
    except: pass
    try: return float(x)
    except: pass
    return x

def detect_labels(tokens):
    defined = []
    used = []
    for pos,t in enumerate(tokens):
        if t[-1] == ':':
            name = t[:-1]
            defined.append((pos,name))
        else:
            if t[0] == ':':
                name = t[1:]
                used.append((pos,name))
            elif t[0] == '$':
                name = t
                used.append((pos,name))
        pos += 1
    return {'defined':defined, 'used':used}

def preprocess(tokens):
    out = []
    variables = {}
    i = 0 
    while i < len(tokens):
        t = tokens[i]
        if t=='def':
            name = tokens[i+1]
            value = tokens[i+2]
            variables[name] = value
            i += 2
        elif t in variables:
            out.append(variables[t])
        elif t[0] == '@' and t[1:] in variables:
            out.append('@'+variables[t[1:]])
        elif t[0] == '>' and t[1:] in variables:
            out.append('>'+variables[t[1:]])
        else:
            out.append(t)
        i += 1
    return out

def link(tokens, labels):
    linked = tokens.copy()
    for pos,name in labels['defined']:
        linked[pos] = 'nop' # TODO: label vs _label
    for pos,name in labels['used']:
        linked[pos] = find_label_definition(name, pos, labels['defined'])
    linked = [convert_numbers(x) for x in linked]
    return linked

def find_label_definition(name, pos, defined):
    """Find the definition of a label, starting from a given position
    local labels (starting with underscore) are only visible in the same block"""
    i_start = bisect(defined, pos, key=lambda x: x[0]) # TODO: bisect_left/right vs look up/down
    is_global = lambda name: name[0] in ['$']
    is_local  = lambda name: not is_global(name)
    directions = ['up', 'down'] if is_global(name) else ['down', 'up']
    for look in directions:
        if look == 'down':
            for i in range(i_start, len(defined)):
                if is_local(name) and not is_local(defined[i][1]):
                    break
                if defined[i][1] == name:
                    return defined[i][0]
        if look == 'up':
            for i in range(i_start-1, -1, -1):
                if is_local(name) and not is_local(defined[i][1]):
                    break
                if defined[i][1] == name:
                    return defined[i][0]
    raise Exception(f'Label not found: {name}, starting from {pos}, {defined}')

def as_list(tokens):
    return str(tokens).replace(', ', ',')

def as_str(tokens):
    return str(tokens).replace(', ', ' ').replace("'",'')[1:-1]

def text_to_code(text):
    tokens = tokenize(text)
    tokens = preprocess(tokens)
    labels = detect_labels(tokens)
    linked = link(tokens, labels)
    return linked

# === CLI =========================================================================================

if __name__ == '__main__':
    import sys
    if len(sys.argv) < 2:
        print('Usage: python v1_asm.py <file.asm>')
        sys.exit(1)
    with open(sys.argv[1]) as f:
        code = f.read()
    linked = text_to_code(code)
    print(as_list(linked))
    print(as_str(linked))
