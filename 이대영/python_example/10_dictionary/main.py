dic = dict()

word = None
count = None

with open('test.txt', 'r', encoding='utf-8') as f:
    for str in f.readlines():
        for s in str.strip("\n").split():
            print(s)
            dic[s] = dic.get(s, 0) + 1

for key, value in dic.items():
    if word is None or value > count:
        word = key
        count = value

print(word, count)
print(dic.keys())
print(dic.values())