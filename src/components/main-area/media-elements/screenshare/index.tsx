import React, { useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import {
  RemoteTrackPublication,
  Track,
  LocalParticipant,
  RemoteParticipant,
} from 'livekit-client';

import VideoElm from './videoElm';
import AudioElm from './audioElm';
import { RootState, useAppDispatch, useAppSelector } from '../../../../store';
import {
  updateIsActiveParticipantsPanel,
  updateIsActiveScreenshare,
} from '../../../../store/slices/bottomIconsActivitySlice';
import VideoElements from '../videos';
import { IScreenShareInfo } from '../../../../helpers/livekit/ConnectLivekit';

interface IScreenShareElementsProps {
  videoSubscribers?: Map<string, LocalParticipant | RemoteParticipant>;
  screenShareInfo: Map<string, IScreenShareInfo>;
}

const isActiveParticipantsPanelSelector = createSelector(
  (state: RootState) => state.bottomIconsActivity.isActiveParticipantsPanel,
  (isActiveParticipantsPanel) => isActiveParticipantsPanel,
);

const isActiveChatPanelSelector = createSelector(
  (state: RootState) => state.bottomIconsActivity.isActiveChatPanel,
  (isActiveChatPanel) => isActiveChatPanel,
);

const activateWebcamsViewSelector = createSelector(
  (state: RootState) => state.roomSettings.activateWebcamsView,
  (activateWebcamsView) => activateWebcamsView,
);

const ScreenShareElements = ({
  screenShareInfo,
  videoSubscribers,
}: IScreenShareElementsProps) => {
  const dispatch = useAppDispatch();

  const isActiveParticipantsPanel = useAppSelector(
    isActiveParticipantsPanelSelector,
  );
  const isActiveChatPanel = useAppSelector(isActiveChatPanelSelector);
  const activateWebcamsView = useAppSelector(activateWebcamsViewSelector);

  useEffect(() => {
    dispatch(updateIsActiveParticipantsPanel(false));

    return () => {
      // just for double check to make sure we disabled status of screen share
      dispatch(updateIsActiveScreenshare(false));
    };
  }, [dispatch]);

  const render = () => {
    if (screenShareInfo) {
      const elm = Array<JSX.Element>();

      screenShareInfo.forEach((info) => {
        const track = info.track;
        if (track.source === Track.Source.ScreenShare) {
          elm.push(<VideoElm key={track.trackSid} track={track} />);
        } else if (track.source === Track.Source.ScreenShareAudio) {
          elm.push(
            <AudioElm
              key={track.trackSid}
              track={track as RemoteTrackPublication}
            />,
          );
        }
      });

      return elm;
    } else {
      return null;
    }
  };

  // we won't show video elements if both
  // chat & participant panel active
  const shouldShowVideoElems = (): boolean => {
    if (!activateWebcamsView) {
      return false;
    }
    return !(isActiveChatPanel && isActiveParticipantsPanel);
  };

  return (
    <div className="share-screen-wrapper is-share-screen-running">
      {/*{if videoSubscribers has webcams}*/}
      {videoSubscribers && shouldShowVideoElems() ? (
        <VideoElements videoSubscribers={videoSubscribers} perPage={3} />
      ) : null}

      {render()}
    </div>
  );
};

export default React.memo(ScreenShareElements);
