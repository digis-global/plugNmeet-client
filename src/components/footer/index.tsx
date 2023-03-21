import React, { useMemo } from 'react';
import { Room } from 'livekit-client';
import { createSelector } from '@reduxjs/toolkit';

import { RootState, store, useAppDispatch, useAppSelector } from '../../store';

import WebcamIcon from './icons/webcam';
import MicrophoneIcon from './icons/microphone';
import ChatIcon from './icons/chat';
import ParticipantIcon from './icons/participant';
import RaiseHandIcon from './icons/raisehand';
import ScreenshareIcon from './icons/screenshare';
import RecordingIcon from './icons/recording';
import MenusIcon from './icons/menus';
import SharedNotePadIcon from './icons/sharedNotePad';
import WhiteboardIcon from './icons/whiteboard';
import BreakoutRoomInvitation from '../breakout-room/breakoutRoomInvitation';
import { toggleFooterVisibility } from '../../store/slices/roomSettingsSlice';

interface IFooterProps {
  currentRoom: Room;
  isRecorder: boolean;
}

const footerVisibilitySelector = createSelector(
  (state: RootState) => state.roomSettings.visibleFooter,
  (visibleFooter) => visibleFooter,
);

const Footer = ({ currentRoom, isRecorder }: IFooterProps) => {
  const isAdmin = store.getState().session.currentUser?.metadata?.is_admin;
  const footerVisible = useAppSelector(footerVisibilitySelector);
  const dispatch = useAppDispatch();

  return useMemo(() => {
    return (
      <>
        <footer
          id="main-footer"
          className="h-[55px] lg:h-[60px] px-2 md:px-4 shadow-footer flex items-center justify-between dark:bg-darkPrimary"
          style={{ display: isRecorder ? 'none' : '' }}
        >
          <div className="footer-inner flex items-center justify-between w-full">
            <div className="footer-left w-52 flex items-center">
              <WebcamIcon currentRoom={currentRoom} />
              <MicrophoneIcon currentRoom={currentRoom} />
            </div>

            <div className="footer-middle flex items-center">
              <ParticipantIcon />
              <ChatIcon />
              <ScreenshareIcon currentRoom={currentRoom} />
              <RaiseHandIcon currentRoom={currentRoom} />
              <WhiteboardIcon />
              <SharedNotePadIcon />
              <RecordingIcon currentRoom={currentRoom} />
              {isAdmin ? <MenusIcon /> : null}
            </div>

            <div className="footer-right w-52 hidden sm:flex items-center" />
            <BreakoutRoomInvitation currentRoom={currentRoom} />
          </div>
        </footer>
        <div
          className={`footer-collapse-arrow fixed bottom-[60px] right-0 flex items-center justify-center h-5 w-5 cursor-pointer z-[99]  ${
            footerVisible ? 'footerVisible' : 'footerHidden'
          }`}
          onClick={() => dispatch(toggleFooterVisibility())}
        >
          <i
            className={` text-[10px] sm:text-[12px] dark:text-secondaryColor ${
              footerVisible ? 'pnm-arrow-below' : 'pnm-arrow-up'
            }`}
          ></i>
        </div>
      </>
    );
    //eslint-disable-next-line
  }, [currentRoom, footerVisible]);
};

export default Footer;
