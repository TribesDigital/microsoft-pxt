/// <reference path="../../../built/pxtblocks.d.ts"/>

import { useContext } from "react";
import { AppStateContext } from "../state/appStateContext";
import { getCatalogCriteriaWithId } from "../state/helpers";
import { Button } from "react-common/components/controls/Button";
import { removeCriteriaFromRubric } from "../transforms/removeCriteriaFromRubric";
import { showCatalogModal } from "../transforms/showCatalogModal";

interface IProps {}

const ActiveRubricDisplay: React.FC<IProps> = ({}) => {
    const { state: teacherTool, dispatch } = useContext(AppStateContext);

    return (
        <div className="rubric-display">
            <h3>{lf("Rubric")}</h3>
            {teacherTool.selectedCriteria?.map(criteriaInstance => {
                if (!criteriaInstance) return null;

                const catalogCriteria = getCatalogCriteriaWithId(criteriaInstance.catalogCriteriaId);
                return (
                    criteriaInstance.catalogCriteriaId && (
                        <div className="criteria-instance-display" key={criteriaInstance.instanceId}>
                            {catalogCriteria?.template}
                            <Button
                                className="criteria-btn-remove"
                                label={lf("X")}
                                onClick={() => removeCriteriaFromRubric(criteriaInstance)}
                                title={lf("Remove")}
                            />
                        </div>
                    )
                );
            })}
            <Button
                className="add-criteria secondary"
                label={lf("+ Add Criteria")}
                onClick={showCatalogModal}
                title={lf("Add Criteria")}
            />
        </div>
    );
};

export default ActiveRubricDisplay;
