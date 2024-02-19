import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProductSearchObj } from "../types/others";
// import useBasket from "../constants/useBasket";

interface CombinedContextProps {
  propertyType: string;
  setPropertyType: React.Dispatch<React.SetStateAction<string>>;
  handlePropertyType: (value: string, category: string) => void;
  handleChangeCategory: (value: string, category: string) => void;
  targetSearchObj: ProductSearchObj;
  filter: string;
  updateTargetSearchObj: (
    value?: string,
    category?: string,
    data?: { min?: number; max?: number }
  ) => void;
  setTargetSearchObj: React.Dispatch<React.SetStateAction<ProductSearchObj>>;
  // useBasket: ReturnType<typeof useBasket>;
}

const CombinedContext = createContext<CombinedContextProps | undefined>(
  undefined
);

interface CombinedProviderProps {
  children: ReactNode;
}

export const CombinedProvider: React.FC<CombinedProviderProps> = ({
  children,
}) => {
  const [propertyType, setPropertyType] = useState<string>("");
  const [targetSearchObj, setTargetSearchObj] = useState<ProductSearchObj>({
    page: 1,
    limit: 12,
    order: "createdAt",
    company_mb_id: "",
    product_collection: "",
    product_address: "",
    product_size: "",
    product_value: "",
    product_price_min: 0,
    product_price_max: 0,

  });
  const [filter, setFilter] = useState<string>("");
  const updateTargetSearchObj = (
    value?: string,
    category?: string,
    data?: { min?: number; max?: number }
  ) => {
    if (category === "collection") {
      targetSearchObj.page = 1;
      targetSearchObj.company_mb_id = "";
      targetSearchObj.product_collection = value;
    }
    if (category === "address") {
      targetSearchObj.page = 1;
      targetSearchObj.company_mb_id = "";
      targetSearchObj.product_collection = value;
      targetSearchObj.product_address = value;
    }
    if (category === "price") {
      targetSearchObj.page = 1;
      targetSearchObj.order = "product_price";
      targetSearchObj.product_price_min = data?.min;
      targetSearchObj.product_price_max = data?.max;
      targetSearchObj.product_collection = "";
    }
    if (category === "value") {
      targetSearchObj.page = 1;
      targetSearchObj.order = "product_value";
      targetSearchObj.product_collection = "";
      targetSearchObj.product_value = "";
    }
    if (category === "size") {
      targetSearchObj.page = 1;
      targetSearchObj.product_size = "";
      targetSearchObj.product_collection = "";
      targetSearchObj.order = "product_size";
      targetSearchObj.product_size_min = data?.min;
      targetSearchObj.product_size_max = data?.max;
    }
    setFilter("");
    setTargetSearchObj({ ...targetSearchObj });
    if (category === "all") {
      setTargetSearchObj({ page: 1, limit: 12, order: "createdAt" });
      setFilter("");
    }
  };

  const handleChangeCategory = (value: string, category: string) => {
    updateTargetSearchObj(value, category);
  };

  // const { onAdd, onRemove, onDelete, onDeleteAll, cartItems } = useBasket(); // Destructure useBasket

  const handlePropertyType = (value: string, category: string) => {
    updateTargetSearchObj(value, category);
  };

  return (
    <CombinedContext.Provider
      value={{
        propertyType,
        setPropertyType,
        handlePropertyType,
        targetSearchObj,
        setTargetSearchObj,
        updateTargetSearchObj,
        handleChangeCategory,
        filter,
        // useBasket: { onAdd, onRemove, onDelete, onDeleteAll, cartItems },
      }}
    >
      {children}
    </CombinedContext.Provider>
  );
};

export const useCombinedContext = (): CombinedContextProps => {
  const context = useContext(CombinedContext);

  if (!context) {
    throw new Error(
      "useCombinedContext must be used within a CombinedProvider"
    );
  }

  return context;
};
