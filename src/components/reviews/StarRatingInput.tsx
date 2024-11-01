import { useState } from "react";
import { StarIcon } from "lucide-react";

interface StarRatingInputProps {
  value: number;
  onChange: (value: number) => void;
}

export default function StarRatingInput({
  value,
  onChange,
}: StarRatingInputProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const ratingsText = ["Terrible", "Bad", "Okay", "Good", "Great"];

  return (
    <div className="flex items-center space-x-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i + 1)}
          onMouseEnter={() => setHovered(i + 1)}
          onMouseLeave={() => setHovered(null)}
          type="button"
          className="h-7 w-7"
        >
          <StarIcon
            width={20}
            height={20}
            className={`${
              i < (hovered ?? value) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
            }`}
          />
        </button>
      ))}
      <span className="text-sm text-gray-600">
        {ratingsText[(hovered ?? value) - 1]}
      </span>
    </div>
  );
}
