'use client';

import { useEffect, useState } from 'react';
import { IconArrowRight, IconCheck, IconVolume } from '@tabler/icons-react';
import EasySpeech from 'easy-speech';
import {
  ActionIcon,
  AspectRatio,
  Button,
  Divider,
  Group,
  Overlay,
  PinInput,
  Spoiler,
  Stack,
  Text,
} from '@mantine/core';
import { useUserPreferences } from '@/providers/UserPreferencesProvider';

export function ListenAndType() {
  const [number, setNumber] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isCheckedAnswer, setIsCheckedAnswer] = useState(false);
  const [answerOverlayVisible, setAnswerOverlayVisible] = useState(true);

  const [isPlaying, setIsPlaying] = useState(false);
  const selectedVoice = useUserPreferences((state) => state.selectedVoice);

  const generateRandomNumber = () => {
    const min = 100000;
    const max = 999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setNumber(randomNumber);
    setInputValue('');
    setIsCheckedAnswer(false);
  };

  const playNumber = async () => {
    if (number !== null && selectedVoice) {
      setIsPlaying(true);
      try {
        await EasySpeech.speak({
          text: number.toString(),
          voice: selectedVoice,
          start: () => {
            setIsPlaying(true);
          },
          end: () => {
            setIsPlaying(false);
          },
          error: (e) => {
            console.error('Speech synthesis error:', e);
            setIsPlaying(false);
          },
        });
      } catch (error) {
        console.error('Speech synthesis failed:', error);
        setIsPlaying(false);
      }
    } else {
      console.warn('Voices not loaded or no selected voice');
    }
  };

  // Initialize component
  useEffect(() => {
    generateRandomNumber();
  }, []);

  // Autoplay audio when number changes and voices are loaded
  useEffect(() => {
    if (selectedVoice && number !== null) {
      playNumber();
    }
  }, [number, selectedVoice]);

  const isAnswerCorrect = parseInt(inputValue, 10) === number;

  return (
    <Stack mt="xl">
      <ActionIcon
        variant="filled"
        aria-label="Play Audio"
        size={100}
        mx="auto"
        radius="lg"
        onClick={playNumber}
        loading={isPlaying}
        loaderProps={{ type: 'dots' }}
      >
        <IconVolume size={80} />
      </ActionIcon>

      <PinInput
        mt="md"
        style={{ justifyContent: 'center' }}
        size="lg"
        length={6}
        type="number"
        value={inputValue}
        onChange={setInputValue}
      />

      <Divider my="md" />

      <Stack h={150} justify="end">
        {isCheckedAnswer &&
          (isAnswerCorrect ? (
            <Text ta="center" size="lg" c="green">
              ✅ Richtig!
            </Text>
          ) : (
            <Text ta="center" mt="md" size="lg" c="red">
              ❌ Falsch! Die richtige Antwort ist
              <AspectRatio
                maw={100}
                mah={30}
                ratio={4}
                mx="auto"
                pos="relative"
                onClick={() => setAnswerOverlayVisible(false)}
              >
                {number}
                <Overlay
                  onClick={() => setAnswerOverlayVisible(false)}
                  color="#000"
                  backgroundOpacity={answerOverlayVisible ? 1 : 0}
                />
              </AspectRatio>
            </Text>
          ))}
        <Group justify="space-between" mt="lg" grow>
          <Button
            size="md"
            leftSection={<IconCheck />}
            onClick={() => setIsCheckedAnswer(true)}
            w={isCheckedAnswer ? '100%' : 'auto'}
          >
            Überprüfen
          </Button>
          {isCheckedAnswer && (
            <Button
              size="md"
              variant="default"
              onClick={generateRandomNumber}
              c={isAnswerCorrect ? 'green' : undefined}
              rightSection={isAnswerCorrect ? <IconArrowRight /> : undefined}
            >
              Nächste
            </Button>
          )}
        </Group>
      </Stack>
    </Stack>
  );
}
