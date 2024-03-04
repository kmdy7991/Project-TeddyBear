def message(msg: str) -> str:
    return 'enter the ' + msg


print(message(input("Enter a message: ")))


def in_num(num: str) -> bool:
    try:
        if type(int(num)) is int:
            return True
    except ValueError:
        return False


if in_num(input("Enter a number: ")):
    print("is right")
else:
    print("is not right")