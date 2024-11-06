'use client';

import { useEffect, useState } from 'react';
import { IconArrowRight, IconCheck, IconVolume } from '@tabler/icons-react';
import { ActionIcon, Button, Divider, Flex, Group, PinInput, Stack, Text } from '@mantine/core';
import { useEasySpeech } from '@/hooks/useEasySpeech';
// import { useEasySpeech } from '@/providers/EasySpeechProvider';
import { useUserPreferences } from '@/providers/UserPreferencesProvider';

export function ListenAndType() {
  const [number, setNumber] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isCheckedAnswer, setIsCheckedAnswer] = useState(false);
  const [answerOverlayVisible, setAnswerOverlayVisible] = useState(true);
  const { easySpeech } = useEasySpeech();

  const [isPlaying, setIsPlaying] = useState(false);
  const selectedVoice = useUserPreferences((state) => state.selectedVoice);

  const nextNumber = () => {
    const min = 100000;
    const max = 999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    setNumber(randomNumber);
    setInputValue('');
    setIsCheckedAnswer(false);
    setAnswerOverlayVisible(true);
  };

  const playNumber = async () => {
    if (number !== null && selectedVoice) {
      setIsPlaying(true);
      try {
        await easySpeech?.speak({
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
      } finally {
        setIsPlaying(false);
      }
    } else {
      console.warn('Voices not loaded or no selected voice');
    }
  };

  // Initialize component
  useEffect(() => {
    nextNumber();
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
            <Flex align="center" justify="center" mt="md" gap="0.25em" wrap="wrap">
              <Text size="lg" c="red">
                ❌ Falsch! Die richtige Antwort ist
              </Text>
              {answerOverlayVisible ? (
                <Button
                  variant="transparent"
                  p={0}
                  m={0}
                  h="2em"
                  w="70px"
                  onClick={() => setAnswerOverlayVisible(false)}
                >
                  █████
                </Button>
              ) : (
                <Text w="70px" size="lg" c="red">
                  {number}
                </Text>
              )}
            </Flex>
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
              onClick={nextNumber}
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
