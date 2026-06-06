import os
root = r'c:\Users\Massa\Project 1\Vroom-Rider'
exclude = {'node_modules', '.git', 'android/app/build', 'ios/Pods'}
lines = []

def tree(path, prefix=''):
    entries = sorted([e for e in os.listdir(path) if e not in exclude and not e.startswith('~')])
    for i, name in enumerate(entries):
        full = os.path.join(path, name)
        connector = '└── ' if i == len(entries) - 1 else '├── '
        lines.append(prefix + connector + name)
        if os.path.isdir(full):
            extension = '    ' if i == len(entries) - 1 else '│   '
            tree(full, prefix + extension)

lines.append(os.path.basename(root) + '/')
tree(root, '')
with open('project_tree.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))
print('written project_tree.txt')
