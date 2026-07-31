import { useCallback, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useProfileMenuItems } from '../constants/profileData';
import { useMainDrawer } from '../../../navigation/hooks/useMainDrawer';
import { profileRepository } from '../repositories/profileRepository';
import { UserProfile } from '../types/profile.types';

export const useProfileViewModel = () => {
  const { openSidebar } = useMainDrawer();
  const { gridItems, listItems } = useProfileMenuItems();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isMounted = useRef(true);
  const hasLoadedOnce = useRef(false);

  const fetchProfile = async (mode: 'initial' | 'refresh') => {
    try {
      if (mode === 'initial') setIsLoading(true);
      else setIsRefreshing(true);
      setError(null);

      const data = await profileRepository.getMyProfile();
      if (isMounted.current) setProfile(data);
    } catch (err) {
      if (isMounted.current) {
        const message = err instanceof Error ? err.message : 'FETCH_PROFILE_FAILED';
        setError(message);
      }
    } finally {
      if (isMounted.current) {
        if (mode === 'initial') setIsLoading(false);
        else setIsRefreshing(false);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      isMounted.current = true;
      fetchProfile(hasLoadedOnce.current ? 'refresh' : 'initial');
      hasLoadedOnce.current = true;

      return () => {
        isMounted.current = false;
      };
    }, [])
  );

  const onRefresh = () => fetchProfile('refresh');
  
  return {
    openSidebar,
    profile,
    isLoading,
    isRefreshing,
    error,
    onRefresh,
    gridItems,
    listItems,
  };
};