import React, { useState, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { createLocalTracks, Room, Track } from 'livekit-client';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';

import {
  RootState,
  store,
  useAppDispatch,
  useAppSelector,
} from '../../../store';
import {
  updateIsActiveMicrophone,
  updateIsMicMuted,
  updateShowMicrophoneModal,
} from '../../../store/slices/bottomIconsActivitySlice';
import MicMenu from './mic-menu';
import { participantsSelector } from '../../../store/slices/participantSlice';
import MicrophoneModal from '../modals/microphoneModal';
import { updateMuteOnStart } from '../../../store/slices/sessionSlice';
import { updateSelectedAudioDevice } from '../../../store/slices/roomSettingsSlice';

interface IMicrophoneIconProps {
  currentRoom: Room;
}
const isActiveMicrophoneSelector = createSelector(
  (state: RootState) => state.bottomIconsActivity.isActiveMicrophone,
  (isActiveMicrophone) => isActiveMicrophone,
);
const showMicrophoneModalSelector = createSelector(
  (state: RootState) => state.bottomIconsActivity.showMicrophoneModal,
  (showMicrophoneModal) => showMicrophoneModal,
);
const isMicLockSelector = createSelector(
  (state: RootState) =>
    state.session.currentUser?.metadata?.lock_settings.lock_microphone,
  (lock_microphone) => lock_microphone,
);
const isMicMutedSelector = createSelector(
  (state: RootState) => state.bottomIconsActivity.isMicMuted,
  (isMicMuted) => isMicMuted,
);

const MicrophoneIcon = ({ currentRoom }: IMicrophoneIconProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const session = store.getState().session;
  const showTooltip = session.userDeviceType === 'desktop';
  const muteOnStart =
    session.currentRoom.metadata?.room_features.mute_on_start ?? false;

  const showMicrophoneModal = useAppSelector(showMicrophoneModalSelector);
  const isActiveMicrophone = useAppSelector(isActiveMicrophoneSelector);
  const isMicLock = useAppSelector(isMicLockSelector);
  const isMicMuted = useAppSelector(isMicMutedSelector);

  const [lockMic, setLockMic] = useState<boolean>(false);

  // for change in mic lock setting
  useEffect(() => {
    const closeMicOnLock = () => {
      currentRoom?.localParticipant.audioTracks.forEach((publication) => {
        if (
          publication.track &&
          publication.source === Track.Source.Microphone
        ) {
          currentRoom.localParticipant.unpublishTrack(publication.track, true);
        }
      });
      dispatch(updateIsActiveMicrophone(false));
      dispatch(updateIsMicMuted(false));
    };

    if (isMicLock) {
      setLockMic(true);

      const currentUser = participantsSelector.selectById(
        store.getState(),
        currentRoom.localParticipant.identity,
      );
      if (currentUser?.audioTracks) {
        closeMicOnLock();
      }
    } else {
      setLockMic(false);
    }
  }, [isMicLock, currentRoom, dispatch]);

  // default room lock settings
  useEffect(() => {
    const isLock =
      store.getState().session.currentRoom.metadata?.default_lock_settings
        ?.lock_microphone;
    const isAdmin = store.getState().session.currentUser?.metadata?.is_admin;

    if (isLock && !isAdmin) {
      if (isMicLock !== false) {
        setLockMic(true);
      }
    }
    // eslint-disable-next-line
  }, []);

  const muteUnmuteMic = () => {
    currentRoom?.localParticipant.audioTracks.forEach(async (publication) => {
      if (
        publication.track &&
        publication.track.source === Track.Source.Microphone
      ) {
        if (publication.isMuted) {
          await publication.track.unmute();
          dispatch(updateIsMicMuted(false));
        } else {
          await publication.track.mute();
          dispatch(updateIsMicMuted(true));
        }
      }
    });
  };

  const manageMic = () => {
    if (!isActiveMicrophone && !lockMic) {
      dispatch(updateShowMicrophoneModal(true));
    }

    if (isActiveMicrophone) {
      muteUnmuteMic();
    }
  };

  const getTooltipText = () => {
    if (!isActiveMicrophone && !lockMic) {
      return t('footer.icons.start-microphone-sharing');
    } else if (!isActiveMicrophone && lockMic) {
      return t('footer.icons.microphone-locked');
    }

    if (isActiveMicrophone && !isMicMuted) {
      return t('footer.menus.mute-microphone');
    } else if (isActiveMicrophone && isMicMuted) {
      return t('footer.menus.unmute-microphone');
    }
  };

  const onCloseMicrophoneModal = async (deviceId?: string) => {
    dispatch(updateShowMicrophoneModal(false));

    if (isEmpty(deviceId)) {
      return;
    }

    const localTracks = await createLocalTracks({
      audio: {
        deviceId: deviceId,
      },
      video: false,
    });
    for (let i = 0; i < localTracks.length; i++) {
      const track = localTracks[i];
      if (track.kind === Track.Kind.Audio) {
        await currentRoom?.localParticipant.publishTrack(track);
        dispatch(updateIsActiveMicrophone(true));
      }
    }
    if (muteOnStart) {
      setTimeout(async () => {
        const audioTracks = currentRoom?.localParticipant.audioTracks;

        if (audioTracks) {
          audioTracks.forEach(async (publication) => {
            if (
              publication.track &&
              publication.track.source === Track.Source.Microphone
            ) {
              if (!publication.isMuted) {
                await publication.track.mute();
                dispatch(updateIsMicMuted(true));
                // we'll disable it as it was first time only.
                dispatch(updateMuteOnStart(false));
              }
            }
          });
        }
      }, 500);
    }

    if (deviceId != null) {
      dispatch(updateSelectedAudioDevice(deviceId));
    }
  };

  return (
    <div className="relative z-10">
      {showMicrophoneModal ? (
        <MicrophoneModal
          show={showMicrophoneModal}
          onCloseMicrophoneModal={onCloseMicrophoneModal}
        />
      ) : null}
      <div
        className={`microphone footer-icon relative h-[35px] lg:h-[40px] w-[35px] lg:w-[40px] rounded-full bg-[#F2F2F2] dark:bg-darkSecondary2 hover:bg-[#ECF4FF] mr-3 lg:mr-6 flex items-center justify-center cursor-pointer ${
          showTooltip ? 'has-tooltip' : ''
        }`}
        onClick={() => manageMic()}
      >
        <span className="tooltip">{getTooltipText()}</span>

        {!isActiveMicrophone ? (
          <>
            <i className="pnm-mic-unmute primaryColor dark:text-darkText text-[12px] lg:text-[14px]" />
            {lockMic ? (
              <div className="arrow-down absolute -bottom-1 -right-1 w-[16px] h-[16px] rounded-full bg-white dark:bg-darkSecondary3 flex items-center justify-center">
                <i className="pnm-lock primaryColor dark:text-darkText" />
              </div>
            ) : null}
          </>
        ) : null}

        {!isMicMuted && isActiveMicrophone ? (
          <i className="pnm-mic-unmute secondaryColor  text-[12px] lg:text-[14px]" />
        ) : null}

        {isMicMuted && isActiveMicrophone ? (
          <i className="pnm-mic-mute secondaryColor text-[12px] lg:text-[14px]" />
        ) : null}
      </div>

      {isActiveMicrophone ? <MicMenu currentRoom={currentRoom} /> : null}
    </div>
  );
};

export default MicrophoneIcon;
