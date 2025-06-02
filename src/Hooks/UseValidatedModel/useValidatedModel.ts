import { useEffect, useState } from "react";
import { ExtendedValidationMessage } from "../../Validators/PartyModelValidator/PartyModelValidator.ts";

function useValidatedModel<TModel>(
  model: TModel | undefined,
  validate: (model: TModel | undefined) => ExtendedValidationMessage[],
) {
  const [validationMessages, setValidationMessages] = useState<ExtendedValidationMessage[]>([]);

  useEffect(() => {
    const messages = validate(model);
    setValidationMessages(messages);
  }, [model, validate]); // re-run when model changes

  return {
    validationMessages,
  };
}

export default useValidatedModel;
