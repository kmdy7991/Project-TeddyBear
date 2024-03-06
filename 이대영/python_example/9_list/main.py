import random

arr = list(range(1, 21))
random.shuffle(arr)
print(arr)
print(arr[5])
print(arr[5:])

for i in arr:
    print('user', i)
