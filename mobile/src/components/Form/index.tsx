import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system'

import { feedbackTypes } from '../../utils/feedbackTypes';
import { FeedbackType } from '../../components/Widget'
import { theme } from '../../theme';
import { styles } from './styles';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';
import { api } from '../../libs/api';

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({ feedbackType,onFeedbackCanceled,onFeedbackSent }: Props) {
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  const feedbackInfo = feedbackTypes[feedbackType];

  function handleScreenshot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
    .then(uri => setScreenshot(uri))
    .catch(error => console.error(error));
  }

  function handleScreenshotRemove() {
    setScreenshot(null);
  }

  async function handleSendFeedback() {
    if (isSendingFeedback) {
      return;
    }

    setIsSendingFeedback(true);

    const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, {encoding: 'base64'})

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        comment: comment,
        screenshot: `data:image/png/base64, ${screenshotBase64}`,
      });

      onFeedbackSent();
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft 
            size={24} 
            weight='bold' 
            color={theme.colors.text_secondary} 
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image
            source={feedbackInfo.image}
            style={styles.image}
          />
          <Text style={styles.titleText}>
            {feedbackInfo.image}
          </Text>
        </View>
      </View>

      <TextInput
        multiline
        autoCorrect={false}
        style={styles.input}
        value={comment}
        onChangeText={setComment}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo!"
        placeholderTextColor={theme.colors.text_secondary}
      />

      <View style={styles.footer}>
        <ScreenshotButton 
          onRemoveShot={handleScreenshotRemove} 
          onTakeShot={handleScreenshot} 
          screenshot={screenshot} 
        />
        <Button 
          onPress={handleSendFeedback}
          isLoading={isSendingFeedback}
        />
      </View>
    </View>
  );
}