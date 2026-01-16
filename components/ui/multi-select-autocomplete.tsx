"use client";

import * as React from "react";
import Image from "next/image";
import { TagCross } from "iconsax-react";
import { cn } from "@/lib/utils";

export interface MultiSelectAutocompleteProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
  placeholder?: string;
  className?: string;
}

export function MultiSelectAutocomplete({
  value,
  onChange,
  options,
  placeholder = "Type to search...",
  className,
}: MultiSelectAutocompleteProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [hoveredIndex, setHoveredIndex] = React.useState(-1);
  const [hoveredChip, setHoveredChip] = React.useState<string | null>(null);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  /* ---------------------------------------------
   * Filtering + prediction
   * --------------------------------------------- */

  const filteredOptions = React.useMemo(() => {
    const search = inputValue.toLowerCase().trim();
    return options.filter(
      (option) =>
        !value.includes(option) && option.toLowerCase().includes(search)
    );
  }, [inputValue, options, value]);

  const autocompletePrediction = React.useMemo(() => {
    if (!inputValue || filteredOptions.length === 0) return null;

    const match = filteredOptions[0];
    if (match.toLowerCase().startsWith(inputValue.toLowerCase())) {
      return match.slice(inputValue.length);
    }

    return null;
  }, [inputValue, filteredOptions]);

  /* ---------------------------------------------
   * Handlers
   * --------------------------------------------- */

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    setIsOpen(val.trim().length > 0);
    setHoveredIndex(-1);
  };

  const handleSelect = (option: string) => {
    if (!value.includes(option)) {
      onChange([...value, option]);
    }
    setInputValue("");
    setIsOpen(false);
    setHoveredIndex(-1);
    inputRef.current?.focus();
  };

  const handleRemove = (option: string) => {
    onChange(value.filter((v) => v !== option));
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isOpen && filteredOptions.length > 0) {
      e.preventDefault();
      handleSelect(
        hoveredIndex >= 0 ? filteredOptions[hoveredIndex] : filteredOptions[0]
      );
    }

    if (e.key === "Escape") {
      setIsOpen(false);
      setHoveredIndex(-1);
    }

    if (e.key === "ArrowRight") {
      setHoveredIndex((i) => (i < filteredOptions.length - 1 ? i + 1 : i));
    }

    if (e.key === "ArrowLeft") {
      setHoveredIndex((i) => (i > 0 ? i - 1 : -1));
    }

    if (e.key === "Backspace" && !inputValue && value.length > 0) {
      handleRemove(value[value.length - 1]);
    }
  };

  const handleFocus = () => {
    // Only open if there's actual input text
    if (inputValue.trim().length > 0 && filteredOptions.length > 0) {
      setIsOpen(true);
    }
  };

  /* ---------------------------------------------
   * Outside click handling
   * --------------------------------------------- */

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        !containerRef.current?.contains(e.target as Node) &&
        !dropdownRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setHoveredIndex(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ---------------------------------------------
   * Render
   * --------------------------------------------- */

  return (
    <div className={cn("relative w-full", className)}>
      <div
        ref={containerRef}
        className="rounded-md border-2 border-blue-800 bg-transparent min-h-[40px] p-2 flex flex-wrap items-center gap-2 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Chips */}
        {value.map((item) => (
          <div
            key={item}
            className="bg-blue-800 text-white rounded-lg px-2 py-1 flex items-center gap-2 border border-white/20"
          >
            <span className="text-sm font-medium">{item}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(item);
              }}
              onMouseEnter={() => setHoveredChip(item)}
              onMouseLeave={() => setHoveredChip(null)}
            >
              <TagCross
                size={24}
                variant="Bold"
                color={hoveredChip === item ? "#B0F2F6" : "#ffffff"}
              />
            </button>
          </div>
        ))}

        {/* Inline autocomplete input */}
        <div className="relative flex-1 min-w-[120px]">
          {autocompletePrediction && (
            <div className="absolute top-1 text-sm text-foreground/40 pointer-events-none whitespace-pre">
              {inputValue}
              <span>{autocompletePrediction}</span>
            </div>
          )}

          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            placeholder={value.length === 0 && !inputValue ? placeholder : ""}
            className="relative z-10 w-full bg-transparent text-foreground caret-foreground outline-none text-sm"
            // style={{ caretColor: "#ffffff" }}
          />

          {/* Suggestions */}
          {isOpen && inputValue.trim().length > 0 && filteredOptions.length > 0 && (
            <div ref={dropdownRef} className="absolute z-50 top-full left-0 mt-2">
          <div className="bg-white rounded-xl shadow-lg p-2 flex gap-2">
            {filteredOptions.map((option, index) => {
              const isHovered = index === hoveredIndex;
              const showIcon = index < 2;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  className={cn(
                    "px-3 py-2 rounded-xl flex items-center gap-2 whitespace-nowrap",
                    isHovered
                      ? "bg-blue-800 text-white"
                      : "bg-white text-blue-800"
                  )}
                >
                  {showIcon && (
                    <Image
                      src={
                        isHovered
                          ? "/illustrations/dark-autobrightness.svg"
                          : "/illustrations/light-autobrightness.svg"
                      }
                      alt=""
                      width={20}
                      height={20}
                    />
                  )}
                  <span className="text-sm font-medium">{option}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}
