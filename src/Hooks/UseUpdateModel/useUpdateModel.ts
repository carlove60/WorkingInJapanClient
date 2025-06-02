import * as React from "react";
import { isNotNullOrEmpty } from "../../Helpers/StringHelper/StringHelper.ts";

function useUpdateModel<T>(initialValue: T) {
  const [model, setModel] = React.useState<T>(initialValue);

  const updateModel = (key: keyof T, value: T[keyof T]) => {
    if (isNotNullOrEmpty(key as string)) {
      const newModel = {
        ...model,
        [key]: value,
      };

      setModel(newModel);
    }
  };

  return { model, updateModel };
}

export default useUpdateModel;
