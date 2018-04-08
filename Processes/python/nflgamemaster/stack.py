import random

def checkInput():  


   randomNumber = random.randint(1,100)
   user_guess = int(45)


   if user_guess == randomNumber:
        print("You got it!")
   if user_guess > randomNumber:
        print("Guess lower!")
   if user_guess < randomNumber:
        print("Guess higher!")

checkInput()
