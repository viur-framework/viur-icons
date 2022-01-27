import os,re, math
from xml.dom.minidom import *
from svgelements import *

iconRoot = ".."

blockList = ["dot"]


for filename in os.listdir(iconRoot):
    if not filename.endswith(".svg"):
        continue

    filePath = os.path.join(iconRoot, filename)
    source = open(filePath,'r').read()

    if 'viewBox="0 0 60 60"' in source and filename.replace(".svg","") not in blockList:
        # update default viewBox
        svg = SVG.parse(filePath)
        viewBox = [math.ceil(v) for v in svg.bbox()]

        x = int(viewBox[0])-1
        y = int(viewBox[1])-1
        w = math.ceil(viewBox[2]-x)
        h = math.ceil(viewBox[3]-y)

        source = re.sub(r'viewBox=".*?"',f'viewBox="{x} {y} {w} {h}"', source)

    #remove comments
    source = re.sub(r'<!--.*?-->',"", source)

    dom = parseString(source)

    #remove attributes
    for attribute in ["id","data-name","enable-background","version","x","y","xml:space","title","xmlns:xlink","style"]:
        try:
            dom.firstChild.removeAttribute(attribute)
        except:pass

    #remove all titles
    titles = dom.getElementsByTagName("title")
    for title in titles:
        print(title)
        title.parentNode.removeChild(title)

    #replace all colors
    elements = []
    elements.extend(dom.getElementsByTagName("path"))
    elements.extend(dom.getElementsByTagName("rect"))
    elements.extend(dom.getElementsByTagName("polygon"))
    elements.extend(dom.getElementsByTagName("ellipse"))
    elements.extend(dom.getElementsByTagName("circle"))
    for path in elements:
        if path.getAttribute("fill"):
            path.setAttribute("fill","currentcolor")

    source= dom.toxml()
    print(filePath)
    source = source.replace('<?xml version="1.0" ?>','')
    f = open(filePath, 'w').write(source)
