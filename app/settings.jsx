// app/settings.js (Settings Screen)
import { Ionicons } from '@expo/vector-icons';
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../src/context/ThemeContext';
import { createSettingsStyles } from '../src/styles/SettingsStyles';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const styles = createSettingsStyles(theme);

  const handleClearChat = () => {
    Alert.alert(
      'Clear Chat History',
      'Are you sure you want to clear all chat history? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => {
          Alert.alert('Success', 'Chat history cleared!');
        }},
      ]
    );
  };

  const SettingItem = ({ title, subtitle, rightComponent, onPress }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightComponent}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <SettingItem
            title="Dark Mode"
            subtitle="Use dark theme for better battery life"
            rightComponent={
              <Switch
                value={theme.isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: '#767577', true: '#10A37F' }}
                thumbColor={theme.isDarkMode ? '#FFFFFF' : '#f4f3f4'}
              />
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chat</Text>
          <SettingItem
            title="Clear Chat History"
            subtitle="Remove all conversations"
            rightComponent={
              <Ionicons 
                name="trash-outline" 
                size={20} 
                color={theme.colors.textSecondary} 
              />
            }
            onPress={handleClearChat}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <SettingItem
            title="Version"
            subtitle="1.0.0"
            rightComponent={
              <Ionicons 
                name="information-circle-outline" 
                size={20} 
                color={theme.colors.textSecondary} 
              />
            }
          />
          <SettingItem
            title="Privacy Policy"
            rightComponent={
              <Ionicons 
                name="chevron-forward" 
                size={20} 
                color={theme.colors.textSecondary} 
              />
            }
            onPress={() => Alert.alert('Privacy Policy', 'Privacy policy would open here.')}
          />
          <SettingItem
            title="Terms of Service"
            rightComponent={
              <Ionicons 
                name="chevron-forward" 
                size={20} 
                color={theme.colors.textSecondary} 
              />
            }
            onPress={() => Alert.alert('Terms of Service', 'Terms of service would open here.')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
