import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import usePreviousPage from './helpers/hooks/usePreviousPage';
import { RootState, store, useAppDispatch, useAppSelector } from '../../store';
import { createSelector } from '@reduxjs/toolkit';
import { setWhiteboardCurrentPage } from '../../store/slices/whiteboard';
import { useTranslation } from 'react-i18next';
import {
  broadcastCurrentPageNumber,
  broadcastScreenDataBySocket,
} from './helpers/handleRequestedWhiteboardData';

interface IFooterUIProps {
  excalidrawAPI: ExcalidrawImperativeAPI | null;
}
const totalPagesSelector = createSelector(
  (state: RootState) => state.whiteboard.totalPages,
  (totalPages) => totalPages,
);
const currentPageSelector = createSelector(
  (state: RootState) => state.whiteboard.currentPage,
  (currentPage) => currentPage,
);

const FooterUI = ({ excalidrawAPI }: IFooterUIProps) => {
  const totalPages = useAppSelector(totalPagesSelector);
  const currentPage = useAppSelector(currentPageSelector);
  const [options, setOptions] = useState<Array<JSX.Element>>();
  const [disablePre, setDisablePre] = useState(true);
  const [disableNext, setDisableNext] = useState(false);
  const previousPage = usePreviousPage(currentPage);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const session = store.getState().session;

  useEffect(() => {
    if (previousPage && currentPage !== previousPage && excalidrawAPI) {
      savePreviousPageData();
    }
    //eslint-disable-next-line
  }, [currentPage, previousPage, excalidrawAPI]);

  useEffect(() => {
    if (currentPage > 1) {
      setDisablePre(false);
    }
    if (currentPage === 1) {
      setDisablePre(true);
    }

    if (disableNext) {
      if (currentPage !== totalPages) {
        setDisableNext(false);
      }
    } else {
      if (currentPage === totalPages) {
        setDisableNext(true);
      }
    }
  }, [currentPage, disableNext, totalPages]);

  useEffect(() => {
    const jxs: Array<JSX.Element> = [];
    for (let i = 0; i < totalPages; i++) {
      jxs.push(
        <option key={i} value={i + 1}>
          {t('whiteboard.page', { count: i + 1 })}
        </option>,
      );
    }
    setOptions(jxs);
    //eslint-disable-next-line
  }, [totalPages]);

  useEffect(() => {
    return () => {
      if (excalidrawAPI) {
        const lastPage = store.getState().whiteboard.currentPage;
        const data = excalidrawAPI.getSceneElements();
        if (data.length) {
          sessionStorage.setItem(String(lastPage), JSON.stringify(data));
        }
      }
    };
  }, [excalidrawAPI]);

  const savePreviousPageData = (displayPre = true) => {
    if (!excalidrawAPI) {
      return;
    }
    const data = excalidrawAPI.getSceneElements();
    if (data.length) {
      sessionStorage.setItem(String(previousPage), JSON.stringify(data));
    }
    if (displayPre) {
      excalidrawAPI.updateScene({
        elements: [],
      });
      displayCurrentPageData(currentPage);
    }
  };

  const displayCurrentPageData = (currentPage) => {
    const data = sessionStorage.getItem(currentPage);
    if (data && excalidrawAPI) {
      const elements = JSON.parse(data);
      if (elements.length) {
        excalidrawAPI.updateScene({ elements });
        // better to broadcast full screen
        broadcastScreenDataBySocket(elements);
      }
    }
  };

  const setCurrentPage = (page: number) => {
    broadcastCurrentPageNumber(page);
    dispatch(setWhiteboardCurrentPage(page));
  };

  const handlePre = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const renderForAdmin = () => {
    return (
      <div className="flex footerUI">
        {!disablePre ? (
          <button
            className="pre w-10 flex items-center justify-center"
            onClick={handlePre}
          >
            <i className="pnm-arrow-left-short primaryColor text-[14px] opacity-50" />
          </button>
        ) : null}
        <select
          id="pages"
          name="pages"
          className="pagesOpts mt-1 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) => setCurrentPage(Number(e.currentTarget.value))}
          value={currentPage}
        >
          {options}
        </select>
        {!disableNext ? (
          <button
            className="next w-10 flex items-center justify-center"
            onClick={handleNext}
          >
            <i className="pnm-arrow-right-short primaryColor text-[14px] opacity-50" />
          </button>
        ) : null}
      </div>
    );
  };

  const renderForParticipant = () => {
    return (
      <div className="flex footerUI">
        {t('whiteboard.page', { count: currentPage })}
      </div>
    );
  };

  return (
    <>
      {session.currenUser?.metadata?.is_admin && !session.currenUser.isRecorder
        ? renderForAdmin()
        : renderForParticipant()}
    </>
  );
};

export default FooterUI;
