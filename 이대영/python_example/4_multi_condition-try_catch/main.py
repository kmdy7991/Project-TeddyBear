is_num = input("Enter a number: ")

try:
    is_num = int(is_num)
except ValueError:
    is_num = -1

if is_num > 50:
    print("The number is greater than 50")
elif is_num > 0:
    print("plus number")
else:
    print("is not digit")