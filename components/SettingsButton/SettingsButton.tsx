'use client';

import { useEffect, useState } from 'react';
import { IconAdjustments } from '@tabler/icons-react';
import { ActionIcon, Group, Modal, Select, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEasySpeech } from '@/hooks/useEasySpeech';
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
  const [sortedAvailableVoices, setSortedAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const { easySpeech } = useEasySpeech();

  const selectedVoice = useUserPreferences((state) => state.selectedVoice);
  const setSelectedVoice = useUserPreferences((state) => state.setSelectedVoice);

  useEffect(() => {
    const voices = sortVoices(
      easySpeech?.voices()?.filter((voice: SpeechSynthesisVoice) => voice.lang.startsWith('de')) ??
        []
    );

    // Fix Safari duplicates
    const uniqueVoicesMap = new Map<string, SpeechSynthesisVoice>();
    voices.forEach((voice) => {
      if (!uniqueVoicesMap.has(voice.voiceURI)) {
        uniqueVoicesMap.set(voice.voiceURI, voice);
      }
    });
    const uniqueVoices = Array.from(uniqueVoicesMap.values());

    setSortedAvailableVoices(uniqueVoices);
    if (!selectedVoice && uniqueVoices.length > 0) {
      setSelectedVoice(uniqueVoices[0]);
    }
  }, [easySpeech, selectedVoice, setSelectedVoice]);

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
              value: voice.voiceURI,
              label: voice.name,
            }))}
            value={selectedVoice?.voiceURI}
            onChange={(voiceURI) => {
              const voice = sortedAvailableVoices.find((v) => v.voiceURI === voiceURI);
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
