'use client';

import { IconAdjustments } from '@tabler/icons-react';
import EasySpeech from 'easy-speech';
import { ActionIcon, Group, Modal, Select, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useUserPreferences } from '@/providers/UserPreferencesProvider';
import { ColorSchemeToggle } from './ColorSchemeToggle/ColorSchemeToggle';

const voicesSortPreference = ['Google Deutsch', 'Anna', 'Helena', 'Martin'];

const sortVoices = (voices: SpeechSynthesisVoice[]) =>
  voices.toSorted((a, b) => {
    const indexA = voicesSortPreference.findIndex((pref) => a.name.includes(pref));
    const indexB = voicesSortPreference.findIndex((pref) => b.name.includes(pref));

    if (indexA === -1 && indexB === -1) {
      return a.name.localeCompare(b.name);
    }
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });

export function SettingsButton() {
  const [isSettingsOpen, { open, close }] = useDisclosure();

  const selectedVoice = useUserPreferences((state) => state.selectedVoice);
  const setSelectedVoice = useUserPreferences((state) => state.setSelectedVoice);
  const sortedAvailableVoices = sortVoices(
    typeof window !== 'undefined'
      ? EasySpeech.voices().filter((voice) => voice.lang.startsWith('de'))
      : []
  );

  if (!selectedVoice) {
    setSelectedVoice(sortedAvailableVoices[0]);
  }

  return (
    <>
      <ActionIcon variant="outline" aria-label="Settings" onClick={open} size="lg">
        <IconAdjustments />
      </ActionIcon>
      <Modal
        opened={isSettingsOpen}
        onClose={close}
        title={
          <Group>
            <IconAdjustments /> Einstellungen
          </Group>
        }
      >
        <Stack>
          <Select
            label="Stimme auswählen"
            placeholder="Wählen Sie eine Stimme"
            data={sortedAvailableVoices.map((voice) => ({
              value: voice.name,
              label: voice.name,
            }))}
            renderOption={(option) => (
              <Group
                bg={
                  voicesSortPreference.findIndex((pref) => option.option.label.includes(pref)) !==
                  -1
                    ? '#7dff9344'
                    : undefined
                }
              >
                {option.option.label}
              </Group>
            )}
            value={selectedVoice?.name}
            onChange={(voiceName) => {
              const voice = sortedAvailableVoices.find((v) => v.name === voiceName);
              if (voice) {
                setSelectedVoice(voice);
              }
            }}
          />
          <Group justify="flex-end">
            <ColorSchemeToggle />
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
