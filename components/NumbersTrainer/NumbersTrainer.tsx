'use client';

import { Divider, Group, Paper, Select } from '@mantine/core';
import { ListenAndType } from '@/components/ListenAndType/ListenAndType';
import { SettingsButton } from '@/components/SettingsButton/SettingsButton';
import classes from './NumbersTrainer.module.css';

export function NumbersTrainer() {
  return (
    <Paper shadow="md" p="xl" maw={500} mx="auto" mt="xl">
      <Group justify="space-between">
        <Select
          placeholder="Aufgabentyp auswählen"
          defaultValue="listenAndType"
          data={[
            { label: 'Hören und Ergänzen', value: 'listenAndType' },
            // { label: 'Sehen und Schreiben', value: 'seeAndWrite' },
            // { label: 'Hören und Sprechen', value: 'listenAndSpeak' },
          ]}
          allowDeselect={false}
        />
        <SettingsButton />
      </Group>
      <Divider my="md" />
      <ListenAndType />
    </Paper>
  );
}
