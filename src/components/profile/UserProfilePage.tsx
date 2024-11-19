import React from 'react';
import { UserProfile } from '../../types/user';
import { UserProfileForm } from './UserProfileForm';
import { AstrologicalDataForm } from './AstrologicalDataForm';
import { PreferencesForm } from './PreferencesForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/Tabs';
import { User, Stars, Settings } from 'lucide-react';

interface UserProfilePageProps {
  profile?: UserProfile;
  onSave: (profile: Partial<UserProfile>) => void;
}

export function UserProfilePage({ profile, onSave }: UserProfilePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-serif text-white mb-8 flex items-center gap-3">
          <User className="w-8 h-8 text-amber-400" />
          Your Mystical Profile
        </h1>

        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="bg-purple-800/50 p-1 rounded-lg">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="astrology" className="flex items-center gap-2">
              <Stars className="w-4 h-4" />
              Astrology
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Preferences
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <UserProfileForm
              profile={profile}
              onSave={onSave}
            />
          </TabsContent>

          <TabsContent value="astrology">
            <AstrologicalDataForm
              data={profile?.astrological}
              onSave={(data) => onSave({ astrological: data })}
            />
          </TabsContent>

          <TabsContent value="preferences">
            <PreferencesForm
              preferences={profile?.preferences}
              onSave={(prefs) => onSave({ preferences: prefs })}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}