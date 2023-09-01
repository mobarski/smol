import sys; sys.path+=['../vm']

from build import *

config = {
    'core.registers': 256,
    'core.parts': ['core', 'sugar','colors','leds','mouse','threads','text','timer'],
    #
    'leds.width': 17,
    'leds.height': 7,
    'leds.size': 32,
    'leds.radius': 15,
    #
    # 'colors.data': [
    #     '#211e20',
    #     '#555568',
    #     '#a0a08b',
    #     '#e9efec',
    # ]
    #
    'colors.data': [
        '#F5F5F5', # white smoke
        '#D3D3D3', # light gray
        '#808080', # gray
        #
        '#F08080', # light coral
        #'#F4A460', # sandy brown
        #'#FFA500', # orange
        #'#FFFF00', # yellow
        '#FFD700', # gold
        #'#98FB98', # pale green
        #'#00FF7F', # spring green
        '#00FA9A', # medium spring green
        #'#3CB371', # medium sea green
        '#87CEFA', # light sky blue
        #'#7B68EE', # medium slate blue
        '#DDA0DD', # plum
    ]
}

code = [
    'leds-clear',3,
    'r1','=',1,
    'leds-set','r1',1,2,
    'leds-set','r1',2,1,
    'leds-set','r1',3,0,
    'leds-set','r1',4,1,
    'leds-set','r1',5,2,
    'r1','+=',1,
    'if','r1','<',16,5,
    'leds-draw',
    'halt'
]

code = [
    'leds-clear',0,
    'r1','=',1,
    'leds-set','r1',1,'r1',
    'leds-set','r1',2,'r1',
    'leds-set','r1',3,'r1',
    'leds-set','r1',4,'r1',
    'leds-set','r1',5,'r1',
    'r1','+=',1,
    'if','r1','<',15,5,
    'leds-draw',
    'halt'
]


# code = [
#     'timer-set',10,4,
#     'halt',
#     'r1','+=',1,
#     'log','r1',
#     'halt'
# ]

# code = ['threads-set',1,11,'threads-set',2,17,'threads-next','threads-next','log',333,'halt','nop','log',111,'threads-next','goto',11,'nop','log',222,'threads-next','goto',17]
# code = ['threads-set',1,11,'threads-set',2,21,'threads-next','threads-next','log',333,'halt','nop','log',111,'threads-id',11,'log','r11','threads-next','goto',11,'nop','log',222,'threads-id',22,'log','r22','threads-next','goto',21]
# code = ['threads-set',1,11,'threads-set',2,19,'threads-next','threads-next','log',333,'halt','nop','log',111,'threads-id',5,'threads-next','goto',11,'nop','log',222,'threads-id',6,'threads-next','goto',19]
#code = ['threads-set',1,11,'threads-set',2,19,'threads-next','threads-next','log',333,'halt','nop','log',111,'log','r11','threads-next','goto',11,'nop','log',222,'log','r22','threads-next','goto',19]

code = [
    'leds-clear',0,
    'timer-set',5,6,'halt',
    #
    'mouse-frame',
    'mouse-btn','>r1',
    'mouse-xy','>r2','>r3',
    'leds-set','r2','r3','r1',
    'log','r1',
    'leds-draw',
    'halt'
]

js = vm_as_js(config, code, run=0)
html = js_and_html(js)
open('smol-reg-vm.html', 'w').write(html)
