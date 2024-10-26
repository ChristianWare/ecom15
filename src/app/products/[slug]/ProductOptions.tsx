import { checkInStock } from "@/lib/utils";
import { products } from "@wix/stores";

interface ProductOptionsProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  setSelectedOptions: (options: Record<string, string>) => void;
}

export default function ProductOptions({
  product,
  selectedOptions,
  setSelectedOptions,
}: ProductOptionsProps) {
  return (
    <div className="space-y-2.5">
      {product.productOptions?.map((option) => (
        <fieldset key={option.name} className="space-y-1.5">
          <legend>
            <span>{option.name}</span>
          </legend>
          <div className="5 flex flex-wrap items-center gap-1">
            {option.choices?.map((choice) => (
              <div key={choice.description}>
                <input
                  type="radio"
                  id={choice.description}
                  name={option.name}
                  value={choice.description}
                  onChange={() =>
                    setSelectedOptions({
                      ...selectedOptions,
                      [option.name || ""]: choice.description || "",
                    })
                  }
                  checked={
                    selectedOptions[option.name || ""] === choice.description
                  }
                  className="peer hidden"
                />
                <label
                  htmlFor={choice.description}
                  className={`flex min-w-14 cursor-pointer items-center justify-center gap-1.5 border p-2 peer-checked:border-black ${
                    checkInStock(product, {
                      ...selectedOptions,
                      [option.name || ""]: choice.description || "",
                    })
                      ? ""
                      : "opacity-30"
                  }`}
                >
                  {option.optionType === products.OptionType.color && (
                    <span
                      className="size-4 rounded-full border"
                      style={{ backgroundColor: choice.value }}
                    />
                  )}
                  <span>{choice.description}</span>
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
