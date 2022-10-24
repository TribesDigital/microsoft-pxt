import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-common/components/controls/Button";
import { leaveGameAsync } from "../epics";
import { AppStateContext, dispatch } from "../state/AppStateContext";
import ArcadeSimulator from "./ArcadeSimulator";
import Presence from "./Presence";
import Reactions from "./Reactions";

export interface GamePageProps {}

export default function Render(props: GamePageProps) {
    const { state } = useContext(AppStateContext);
    const { appMode } = state;
    const { netMode } = appMode;
    const [copySuccessful, setCopySuccessful] = useState(false);
    const copyTimeoutMs = 1000;

    const onLeaveGameClick = async () => {
        pxt.tickEvent("mp.leavegame");
        await leaveGameAsync();
    };

    const copyJoinCode = async () => {
        pxt.tickEvent("mp.copyjoincode");
        if (state.gameState?.joinCode) {
            navigator.clipboard.writeText(state.gameState?.joinCode);
            setCopySuccessful(true);
        }
    };

    useEffect(() => {
        if (copySuccessful) {
            let resetCopyTimer = setTimeout(() => {
                setCopySuccessful(false);
            }, copyTimeoutMs);
            return () => {
                clearTimeout(resetCopyTimer);
            };
        }
    }, [copySuccessful]);

    return (
        <div>
            {netMode === "connecting" && (
                <div className="tw-text-lg tw-font-bold tw-mt-5">
                    {lf("Connecting...")}
                </div>
            )}
            {state.gameState?.gameMode && (
                <div className="tw-flex tw-flex-col tw-items-center">
                    {state.playerSlot && <ArcadeSimulator />}
                    <div className="tw-flex tw-flex-row tw-space-x-2 tw-w-full">
                        {state.gameState?.joinCode && (
                            <div>
                                {state.gameState?.joinCode &&
                                    `${lf("Join Code")}: ${
                                        state.gameState?.joinCode
                                    }`}
                                <button
                                    onClick={copyJoinCode}
                                    title={lf("Copy Join Code")}
                                >
                                    <div className="tw-text-sm tw-ml-1">
                                        {!copySuccessful && (
                                            <FontAwesomeIcon
                                                icon={faCopy}
                                                className="hover:tw-scale-105 tw-mb-[0.1rem]"
                                            />
                                        )}
                                        {copySuccessful && (
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className="tw-text-green-600 tw-mb-[0.1rem]"
                                            />
                                        )}
                                    </div>
                                </button>
                            </div>
                        )}
                        <div className="tw-flex-grow" />
                        <div>{lf("Keyboard Controls")}</div>
                    </div>
                    <div className="tw-flex tw-flex-row tw-space-x-2 tw-items-center tw-align-middle tw-justify-center tw-mt-3">
                        <Reactions />
                        <Presence />
                    </div>
                    <div>
                        <Button
                            className={"gray tw-mt-5"}
                            label={lf("Leave Game")}
                            title={lf("Leave Game")}
                            onClick={onLeaveGameClick}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
