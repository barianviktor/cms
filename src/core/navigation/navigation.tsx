import React from "react";

import { ReactComponent as SettingsIcon } from "../../assets/icons/tune.svg";
import "./navigation.scss";
import { LinkTypes } from "../../interfaces/LinkTypes";
import HackerEffect from "../../shared/hacker-effect/hacker-effect";
import IconButton from "../../shared/icon-button/icon-button";
import LinkItem from "../../shared/link-item/link-item";
import Modal from "../../shared/modal/modal";
import SettingsModal from "../../shared/settings-modal/settings-modal";

export default function Navigation() {
  const [settingsModalOpen, setSettingsModalOpen] = React.useState(false);

  return (
    <div className="navigation">
      <LinkItem
        href={{
          to: "/asd",
          type: LinkTypes.internal,
          workLikeRegularText: true,
        }}
      >
        <HackerEffect title="VILLAGE" />
      </LinkItem>
      <ul>
        <li>
          <IconButton
            icon={<SettingsIcon />}
            onClick={() => setSettingsModalOpen(true)}
            ripple={true}
            elevation={false}
          />
        </li>
      </ul>
      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        slideInDirection="bottom"
        slideOutDirection="bottom"
      ></SettingsModal>
    </div>
  );
}
