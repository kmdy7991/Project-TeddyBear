dic = {'a': 34, 'g': 52, 'c': 19, 'f': 120}

print(dic.items())

print(sorted([(v, k) for (k, v) in dic.items()], reverse=True))

for (k, v) in sorted(dic.items()):
    x, y = (k, v)
    print(x, y)
