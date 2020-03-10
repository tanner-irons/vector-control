import anki_vector

def main():
    with anki_vector.behavior.ReserveBehaviorControl():
        with anki_vector.AsyncRobot() as robot:
            print('test')

if __name__ == '__main__':
    main()
