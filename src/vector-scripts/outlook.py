import requests
import datetime
import dateutil.parser
import anki_vector
from anki_vector.util import distance_mm, speed_mmps


def getToken():
    url = 'https://login.microsoftonline.com/da8f04f2-fdac-45a9-9bd2-d709b4fde044/oauth2/v2.0/token'
    response = requests.post(url, {
        'client_id': None,
        'client_secret': None,
        'scope': 'https://graph.microsoft.com/.default',
        'grant_type': 'client_credentials'
    })
    return response.json().get('access_token')


def getCalendar(token):
    url = 'https://graph.microsoft.com/v1.0/users/a529241e-669c-4545-82b5-8b0f0b58b182/calendar/events'
    now = datetime.datetime.now()
    minTime = now.replace(microsecond=0, second=0)
    maxTime = minTime + datetime.timedelta(minutes=30)
    print(minTime)
    print(maxTime)
    response = requests.get(url, {
        # '$filter': "Start/DateTime ge '" + minTime.isoformat() + "' and Start/DateTime le '" + maxTime.isoformat() + "'"
    }, headers={
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Prefer': 'outlook.timezone="Central Standard Time"'
    }).json()
    print(response)

    calendars = response.get('value')
    for event in calendars:
        start = dateutil.parser.parse(event.get('start').get('dateTime'))
        minuteDiff = (now - start).seconds / 60
        if int(minuteDiff) == 0:
            args = anki_vector.util.parse_command_args()
            with anki_vector.Robot(args.serial) as robot:
                def getTanner(face):
                    if face.face_id == 1:
                        return True
                    else:
                        return False
                face = list(
                    filter(getTanner, robot.faces.request_enrolled_names().faces))
                name = face[0].name
                phrase = 'Attention Team Mojave. Your meeting entitled ' + \
                    event.get('subject') + ' is starting now. It is in ' + \
                    event.get('location').get('displayName') + '.'
                robot.behavior.say_text(phrase)
        # else:
            # args = anki_vector.util.parse_command_args()
            # with anki_vector.Robot(args.serial) as robot:
            #     def getTanner(face):
            #         if face.face_id == 1:
            #             return True
            #         else:
            #             return False
            #     face = list(
            #         filter(getTanner, robot.faces.request_enrolled_names().faces))
            #     name = face[0].name
            #     robot.behavior.drive_straight(
            #         distance_mm(100), speed_mmps(100))
            #     phrase = 'Attention ' + name + '. Your meeting entitled ' + \
            #         event.get('subject') + ' is starting now. It is in ' + \
            #         event.get('location').get('displayName') + '.'
            #     robot.behavior.say_text(phrase)


def main():
    # token = getToken()
    # getCalendar(token)
    args = anki_vector.util.parse_command_args()
    with anki_vector.Robot(args.serial) as robot:
        robot.behavior.say_text("You have a meeting now.")
        print("Python")


if __name__ == '__main__':
    main()
