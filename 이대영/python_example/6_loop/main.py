n = 5
while n:
    print(n)
    n -= 1

for _ in range(5):
    print('hi', end="")
persons = ['John', 'Smith', 'jason']
# print(persons.sort(reverse=True))

for person in persons:
    print(person)

for (i, person) in enumerate(persons):
    print(i, person)

