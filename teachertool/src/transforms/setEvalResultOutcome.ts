import { stateAndDispatch } from "../state";
import { EvaluationStatus } from "../types/criteria";
import { setEvalResult } from "./setEvalResult";

// This will set the outcome for a given criteria instance id. If result is undefined, it will clear it.
export function setEvalResultOutcome(criteriaId: string, result: EvaluationStatus) {
    const { state: teacherTool, dispatch } = stateAndDispatch();

    const newCriteriaEvalResult = {
        ...teacherTool.evalResults[criteriaId],
        result,
    };

    setEvalResult(criteriaId, newCriteriaEvalResult);
}
