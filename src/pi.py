try:
    age = int(input('how old are you? '))
    print(f'good to know you are {age} years old')
except(ValueError):
    print('please use integers only')