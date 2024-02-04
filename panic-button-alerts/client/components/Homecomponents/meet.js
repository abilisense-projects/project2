import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const MeetingScheduler = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [participant, setParticipant] = useState('');
  const [details, setDetails] = useState('');

  const scheduleMeeting = () => {
    // API call to backend to save the meeting
    console.log('Meeting scheduled with:', participant, 'on', date, 'at', time);
    // Add further logic to integrate with calendar and send notifications
  };

  return (
    <View>
      <TextInput placeholder="Date" value={date} onChangeText={setDate} />
      <TextInput placeholder="Time" value={time} onChangeText={setTime} />
      <TextInput placeholder="Participant" value={participant} onChangeText={setParticipant} />
      <TextInput placeholder="Details" value={details} onChangeText={setDetails} />
      <Button title="Schedule Meeting" onPress={scheduleMeeting} />
    </View>
  );
};

export default MeetingScheduler;
