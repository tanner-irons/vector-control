import anki_vector
import argparse
import asyncio
from sys import argv


async def notify(title, location, reminder):
    phrase = f'Attention Team Mojave. Your meeting entitled { title }'
    phrase += f' starts in { reminder } minutes.' if reminder else ' is starting now.'
    if location:
        phrase += ' It\'s in ' + location + '.'

    with anki_vector.AsyncRobot('00407a9e') as robot:
        future = robot.behavior.say_text(phrase)
        result = future.result()
        print(result)


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--title')
    parser.add_argument('--location')
    parser.add_argument('--reminder')
    args = parser.parse_args()
    await notify(args.title, args.location, args.reminder)


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    future = loop.run_until_complete(main())
    try:
        result = future.result()
    except asyncio.TimeoutError:
        print('The coroutine took too long, cancelling the task...')
        future.cancel()
    except Exception as exc:
        print('The coroutine raised an exception: {!r}'.format(exc))
    finally:
        print('The coroutine returned: {!r}'.format(result))
