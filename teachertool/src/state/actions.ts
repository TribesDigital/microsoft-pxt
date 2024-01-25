import { ModalType, NotificationWithId } from "../types";
import { CatalogCriteria, CriteriaInstance } from "../types/criteria";

// Changes to app state are performed by dispatching actions to the reducer
type ActionBase = {
    type: string;
};

/**
 * Actions
 */
type PostNotification = ActionBase & {
    type: "POST_NOTIFICATION";
    notification: NotificationWithId;
};

type RemoveNotification = ActionBase & {
    type: "REMOVE_NOTIFICATION";
    notificationId: string;
};

type SetProjectMetadata = ActionBase & {
    type: "SET_PROJECT_METADATA";
    metadata: pxt.Cloud.JsonScript | undefined;
};

type SetEvalResult = ActionBase & {
    type: "SET_EVAL_RESULT";
    result: pxt.blocks.EvaluationResult | undefined;
};

type SetTargetConfig = ActionBase & {
    type: "SET_TARGET_CONFIG";
    config: pxt.TargetConfig;
};

type SetCatalog = ActionBase & {
    type: "SET_CATALOG";
    catalog: CatalogCriteria[] | undefined;
};

type SetSelectedCriteria = ActionBase & {
    type: "SET_SELECTED_CRITERIA";
    criteria: CriteriaInstance[];
};

type RemoveCriteriaInstance = ActionBase & {
    type: "REMOVE_CRITERIA_INSTANCE";
    instanceId: string;
};

type ShowModal = ActionBase & {
    type: "SHOW_MODAL";
    modal: ModalType;
};

type HideModal = ActionBase & {
    type: "HIDE_MODAL";
};

/**
 * Union of all actions
 */

export type Action =
    | PostNotification
    | RemoveNotification
    | SetProjectMetadata
    | SetEvalResult
    | SetTargetConfig
    | SetCatalog
    | SetSelectedCriteria
    | RemoveCriteriaInstance
    | ShowModal
    | HideModal;

/**
 * Action creators
 */
const postNotification = (notification: NotificationWithId): PostNotification => ({
    type: "POST_NOTIFICATION",
    notification,
});

const removeNotification = (notificationId: string): RemoveNotification => ({
    type: "REMOVE_NOTIFICATION",
    notificationId,
});

const setProjectMetadata = (metadata: pxt.Cloud.JsonScript | undefined): SetProjectMetadata => ({
    type: "SET_PROJECT_METADATA",
    metadata,
});

const setEvalResult = (result: pxt.blocks.EvaluationResult | undefined): SetEvalResult => ({
    type: "SET_EVAL_RESULT",
    result,
});

const setTargetConfig = (config: pxt.TargetConfig): SetTargetConfig => ({
    type: "SET_TARGET_CONFIG",
    config,
});

const setCatalog = (catalog: CatalogCriteria[] | undefined): SetCatalog => ({
    type: "SET_CATALOG",
    catalog,
});

const setSelectedCriteria = (criteria: CriteriaInstance[]): SetSelectedCriteria => ({
    type: "SET_SELECTED_CRITERIA",
    criteria,
});

const removeCriteriaInstance = (instanceId: string): RemoveCriteriaInstance => ({
    type: "REMOVE_CRITERIA_INSTANCE",
    instanceId,
});

const showModal = (modal: ModalType): ShowModal => ({
    type: "SHOW_MODAL",
    modal,
});

const hideModal = (): HideModal => ({
    type: "HIDE_MODAL",
});

export {
    postNotification,
    removeNotification,
    setProjectMetadata,
    setEvalResult,
    setTargetConfig,
    setCatalog,
    setSelectedCriteria,
    removeCriteriaInstance,
    showModal,
    hideModal,
};
