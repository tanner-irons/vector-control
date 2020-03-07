import anki_vector

def main():
    with anki_vector.Robot() as robot:
        robot.behavior.say_text("Hello.")

if __name__ == '__main__':
    main()
