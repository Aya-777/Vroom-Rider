import { useEffect, useState } from 'react';
import { useProfileMenuItems } from '../constants/profileData';
import { useMainDrawer } from '../../../navigation/hooks/useMainDrawer';
import { profileRepository } from '../repositories/profileRepository';
import { UserProfile } from '../types/profile.types';

export const useProfileViewModel = () => {
  const { openSidebar } = useMainDrawer();
  const { gridItems, listItems } = useProfileMenuItems();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await profileRepository.getMyProfile();
        if (isMounted) setProfile(data);

      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'FETCH_PROFILE_FAILED';
          setError(message);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProfile();
    return () => {
      isMounted = false;
    };
  }, []);

  return {
    openSidebar,
    profile,
    isLoading,
    error,
    gridItems,
    listItems,
  };
};