import os
import re
from glob import glob
from collections import defaultdict
from xml.etree import ElementTree


def indent(elem, level=0):
    '''
    from http://effbot.org/zone/element-lib.htm
    Modified given element in place.
    '''
    i = "\n" + level*"  "
    if len(elem):
        if not elem.text or not elem.text.strip():
            elem.text = i + "  "
        if not elem.tail or not elem.tail.strip():
            elem.tail = i
        for elem in elem:
            indent(elem, level+1)
        if not elem.tail or not elem.tail.strip():
            elem.tail = i
    else:
        if level and (not elem.tail or not elem.tail.strip()):
            elem.tail = i


def multidict(pairs):
    d = defaultdict(list)
    for key, value in pairs:
        d[key].append(value)
    return d


def userscript_meta(filepath):
    with open(filepath) as fd:
        for line in fd:
            m = re.match(r'//\s+@(\w+)\s+(.+)$', line)
            if m:
                yield m.groups()

def add_script(tree, filepath):
    meta = multidict(userscript_meta(filepath))
    # print filepath, meta

    attrs = dict(
        filename=os.path.basename(filepath),
        name=meta['name'][0],
        namespace=meta.get('namespace', ['com.example.www'])[0],
        description=meta.get('description', ['No description'])[0],
        enabled='true',
        version=meta.get('version', ['?.?.?'])[0],
        # runAt="document-end"
    )
    tree.start('Script', attrs)
    # grant
    tree.start('Grant', {})
    tree.data('unsafeWindow')
    tree.end('Grant')
    # includes
    for include in meta['include']:
        tree.start('Include', {})
        tree.data(include)
        tree.end('Include')
    tree.end('Script')


def install(gm_scripts_path):
    tree = ElementTree.TreeBuilder()
    tree.start('UserScriptConfig', {})

    for userscript in glob(os.path.join(gm_scripts_path, '*.user.js')):
        add_script(tree, userscript)

    tree.end('UserScriptConfig')
    element = tree.close()

    indent(element)
    ElementTree.ElementTree(element).write(os.path.join(gm_scripts_path, 'config.xml'))


pattern = os.path.expanduser('~/Library/Application Support/Firefox/Profiles/*/gm_scripts')
for match in glob(pattern):
    install(match)
