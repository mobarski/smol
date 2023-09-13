# convert xsokoban screen to smol data

def parse_level(text):
    level = [row for row in text.split('\n') if row.strip()]
    x_set = set()
    y_set = set()
    cells = {}
    for y,row in enumerate(level):
        for x,cell in enumerate(row):
            if cell == ' ': continue
            if cell not in cells:
                cells[cell] = []
            cells[cell].append((x,y))
            x_set.add(x)
            y_set.add(y)
    w = len(x_set)
    h = len(y_set)
    return cells,w,h

W = 19
H = 19
def convert(text):
    data,w,h = parse_level(text)
    xo = (W-w)//2
    yo = (H-h)//2
    pxy = data['@'][0]
    out = []
    out += [pxy[0]+xo] # px
    out += [pxy[1]+yo] # py
    out += [len(data['$'])] # nbox
    for k,t in zip('#$.',[2,4,3]):
        xy = data[k]
        out += [len(xy)]
        out += [t]
        for x,y in xy:
            out.append(x+xo)
            out.append(y+yo)
    return out,w,h

SCREEN_DIR = 'xsokoban-screens'
def convert_screen(n):
    text = open(f"{SCREEN_DIR}/screen.{n}").read()
    out,w,h = convert(text)
    print(f'# xsokoban screen.{n} ({w}x{h})')
    #print(text)
    #print('\t'+str(out).replace(' ','')+',')

for i in range(1,90):
    convert_screen(i)

