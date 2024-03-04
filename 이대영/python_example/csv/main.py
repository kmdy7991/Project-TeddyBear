import csv
with open('in.csv', newline='', encoding='utf-8') as csvfile:
    read = csv.reader(csvfile, delimiter=' ', quotechar='|')
    for row in read:
        print(', '.join(row))