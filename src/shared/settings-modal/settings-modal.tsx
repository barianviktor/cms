import React from "react";
import Modal from "../modal/modal";
import "./settings-modal.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  languageSelector,
  languagesSelector,
  themeSelector,
} from "../../store/selectors/app";
import { AppDispatch } from "../../store";
import GridList from "../grid-list/grid-list";
import { Language } from "../../interfaces/Language";
import { GridItem } from "../../interfaces/GridItem";
import { setTheme, setLanguage } from "../../store/slices/app";
import SegmentedButton from "../segmented-button/segmented-button";
import { ReactComponent as LightIcon } from "../../assets/icons/light_theme.svg";
import { ReactComponent as SystemIcon } from "../../assets/icons/system_theme.svg";
import { ReactComponent as DarkIcon } from "../../assets/icons/dark_theme.svg";
import { SegmentedButtonItem } from "../../interfaces/SegmentedButtonItem";

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  slideInDirection?: "left" | "right" | "top" | "bottom";
  slideOutDirection?: "left" | "right" | "top" | "bottom";
}

export default function SettingsModal({
  isOpen,
  onClose,
  slideInDirection = "bottom",
  slideOutDirection = "bottom",
}: SettingsModalProps) {
  const languages: Language[] = useSelector(languagesSelector);
  const language = useSelector(languageSelector);
  const theme = useSelector(themeSelector);
  let dispatch = useDispatch<AppDispatch>();
  const themeMock: SegmentedButtonItem[] = [
    {
      id: "light",
      children: (
        <>
          <LightIcon></LightIcon>
          <span>Light</span>
        </>
      ),
    },
    {
      id: "system",
      children: (
        <>
          <SystemIcon></SystemIcon>
          <span>System</span>
        </>
      ),
    },
    {
      id: "dark",
      children: (
        <>
          <DarkIcon></DarkIcon>
          <span>Dark</span>
        </>
      ),
    },
  ];
  const createGridItems = (languages: Language[]): GridItem[] => {
    const gridItems: GridItem[] = [];

    languages.forEach((language: Language) => {
      gridItems.push({
        title: language.name,
        subTitle: language.country,
        id: language.code,
      });
    });
    console.log(gridItems);
    return gridItems;
  };
  const selectLanguage = (language: string) => {
    dispatch(setLanguage(language));
  };
  const onThemeChange = (theme: string) => {
    console.log(theme);
    dispatch(setTheme(theme));
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      slideInDirection={slideInDirection}
      slideOutDirection={slideOutDirection}
    >
      <h1>Settings</h1>
      <div className="settings-item">
        <h2>Theme</h2>
        <SegmentedButton
          selectedItem={theme}
          items={themeMock}
          onChange={onThemeChange}
        />
      </div>

      <div className="settings-item">
        <h2>Languages</h2>
        <GridList
          onElementClick={selectLanguage}
          data={createGridItems(languages)}
          selectedId={language}
        />
      </div>
    </Modal>
  );
}
