import anki_vector

def main():
    with anki_vector.Robot() as robot:
        robot.audio.stream_wav_file('../app/pcm1608m.wav')

if __name__ == '__main__':
    main()
