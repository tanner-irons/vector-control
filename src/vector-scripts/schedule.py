import anki_vector
import argparse
from sys import argv


def notify(title, location, reminder):
    # args = anki_vector.util.parse_command_args()
    with anki_vector.Robot() as robot:
        phrase = 'Attention Team Mojave. Your meeting entitled ' + title
        
        if reminder:
            phrase += ' starts in ' + reminder + ' minutes.'
        else:
            phrase += ' is starting now.'

        if location:
            phrase += ' It is in ' + location + '.'

        robot.behavior.say_text(phrase)
        print(phrase)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--title')
    parser.add_argument('--location')
    parser.add_argument('--reminder')
    args = parser.parse_args()
    notify(args.title, args.location, args.reminder)


if __name__ == '__main__':
    main()
