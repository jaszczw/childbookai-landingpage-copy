"use client";

import React from 'react';
import { DecorativeGlyph, type DecorativeGlyphVariant } from './DecorativeGlyph';
import clsx from 'clsx';

export type GlyphConfig = {
  /** The word to add a glyph to (case-insensitive match) */
  word: string;
  /** 0-indexed position in the word where the glyph should be inserted */
  position: number;
  /** Optional variant for this specific glyph. Uses defaultGlyphVariant if not provided */
  variant?: DecorativeGlyphVariant;
  /** Optional responsive visibility classes (e.g., "hidden sm:inline") */
  responsiveVisibility?: string;
  /** Optional size classes for this specific glyph. Overrides glyphSizeClassName if provided. Supports responsive classes */
  glyphSizeClassName?: string;
};

export type ColoredPhrase = {
  /** The phrase to color (case-insensitive match) */
  text: string;
  /** Tailwind color class or CSS color value. Can include responsive classes (e.g., "text-blue-500 sm:text-blue-600") */
  color: string;
};

export type HeadingTextProps = {
  /** The main text content */
  title: string;
  /** Configuration for decorative glyphs to insert */
  glyphs?: GlyphConfig[];
  /** Phrases to color differently */
  coloredPhrases?: ColoredPhrase[];
  /** Default text color (Tailwind class or CSS color). Can include responsive classes */
  defaultTextColor?: string;
  /** Phrases/words that should start on a new line (line break inserted before each match, based on the original title) */
  endl?: string[];
  /** Default variant for glyphs when not specified in glyph config */
  defaultGlyphVariant?: DecorativeGlyphVariant;
  /** Size classes for glyphs. Supports responsive classes (e.g., "w-[0.5em] h-[0.5em] sm:w-[0.6em] sm:h-[0.6em]") */
  glyphSizeClassName?: string;
  /** Typography variant with responsive sizing. Overrides className for font size if provided */
  variant?: 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'blockquote' | 'text';
  /** Additional className for the heading element. Supports responsive classes */
  className?: string;
  /** HTML element to render as */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  /** ARIA label for accessibility */
  'aria-label'?: string;
};

type TextSegment = {
  text: string;
  color?: string;
  isGlyph?: boolean;
  isLineBreak?: boolean;
  glyphVariant?: DecorativeGlyphVariant;
  glyphVisibility?: string;
  glyphSizeClassName?: string;
  wordGroupId?: number; // Groups segments that belong to the same word with a glyph
};

/**
 * Typography variant classes with responsive sizing (mobile-first)
 * Base sizes optimized for small screens, scaling up on larger breakpoints
 */
const variantClasses: Record<NonNullable<HeadingTextProps['variant']>, string> = {
  display: 'text-display-responsive',
  h1: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
  h2: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl',
  h3: 'text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl',
  h4: 'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl',
  h5: 'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl',
  h6: 'text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl',
  span: 'text-sm sm:text-base md:text-lg',
  blockquote: 'text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl',
  text: 'text-sm sm:text-base md:text-lg lg:text-xl',
};

/**
 * HeadingText Component
 * 
 * A flexible, type-safe heading component that supports:
 * - Conditional decorative glyph insertion at specific character positions
 * - Phrase-level color customization
 * - Full styling control
 * - Responsive design with Tailwind breakpoints
 * - Typography variants with responsive sizing
 * 
 * @example Basic usage
 * ```tsx
 * <HeadingText
 *   title="Become the hero of your own story"
 *   glyphs={[
 *     { word: "Become", position: 3 },
 *     { word: "hero", position: 3, variant: "blue2" }
 *   ]}
 *   coloredPhrases={[
 *     { text: "Become the hero", color: "text-blue-500" }
 *   ]}
 *   defaultTextColor="text-white"
 *   defaultGlyphVariant="blue1"
 * />
 * ```
 * 
 * @example With typography variant
 * ```tsx
 * <HeadingText
 *   title="Become the hero of your own story"
 *   variant="h1"
 *   glyphs={[
 *     { word: "Become", position: 3 },
 *     { word: "hero", position: 3, variant: "blue2" }
 *   ]}
 *   defaultTextColor="text-white"
 * />
 * ```
 * 
 * @example Responsive usage
 * ```tsx
 * <HeadingText
 *   title="Become the hero of your own story"
 *   variant="h1"
 *   className="font-bold"
 *   glyphs={[
 *     { 
 *       word: "Become", 
 *       position: 3,
 *       responsiveVisibility: "hidden sm:inline" // Hide on mobile, show on larger screens
 *     },
 *     { 
 *       word: "hero", 
 *       position: 3, 
 *       variant: "blue2" 
 *     }
 *   ]}
 *   coloredPhrases={[
 *     { 
 *       text: "Become the hero", 
 *       color: "text-blue-400 sm:text-blue-500 md:text-blue-600" // Responsive colors
 *     }
 *   ]}
 *   defaultTextColor="text-white"
 *   defaultGlyphVariant="blue1"
 *   glyphSizeClassName="w-[0.4em] h-[0.4em] sm:w-[0.5em] sm:h-[0.5em] md:w-[0.6em] md:h-[0.6em]"
 * />
 * ```
 */
export function HeadingText({
  title,
  glyphs = [],
  coloredPhrases = [],
  defaultTextColor,
  endl = [],
  defaultGlyphVariant = "blue1",
  glyphSizeClassName = "w-[0.5em] h-[0.5em]",
  variant,
  className,
  as: Component = 'h1',
  'aria-label': ariaLabel,
}: HeadingTextProps) {
  // Process text into segments with glyphs and colors
  const segments = React.useMemo(() => {
    // Build a map of word -> array of glyph configs for quick lookup
    // This allows multiple glyphs per word
    const glyphMap = new Map<string, GlyphConfig[]>();
    glyphs.forEach(glyph => {
      const key = glyph.word.toLowerCase();
      if (!glyphMap.has(key)) {
        glyphMap.set(key, []);
      }
      glyphMap.get(key)!.push(glyph);
    });

    const result: TextSegment[] = [];
    let wordGroupCounter = 0;
    
    // First, split text into words while preserving spaces
    const words = title.split(/(\s+)/);
    
    // Process each word
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      
      // Skip pure whitespace for now (we'll add it back)
      if (/^\s+$/.test(word)) {
        result.push({ text: word });
        continue;
      }
      
      // Check if this word needs glyphs
      const wordLower = word.toLowerCase();
      const glyphConfigs = glyphMap.get(wordLower);
      
      if (glyphConfigs && glyphConfigs.length > 0) {
        // Sort glyphs by position (ascending) to process them in order
        const sortedGlyphs = [...glyphConfigs].sort((a, b) => a.position - b.position);
        
        // Assign same wordGroupId to all parts of this word
        const wordGroupId = wordGroupCounter++;
        
        // Process the word with multiple glyphs
        // Build segments by slicing the word between glyph positions
        // Each glyph replaces a character at its position in the original word
        let currentPos = 0;
        
        for (let glyphIndex = 0; glyphIndex < sortedGlyphs.length; glyphIndex++) {
          const glyphConfig = sortedGlyphs[glyphIndex];
          const { position, variant } = glyphConfig;
          
          // Clamp position to valid range
          const pos = Math.max(0, Math.min(position, word.length - 1));
          
          // Add text before this glyph (from currentPos to pos)
          if (pos > currentPos) {
            const before = word.slice(currentPos, pos);
            if (before) {
              result.push({ text: before, wordGroupId });
            }
          }
          
          // Add the glyph (replacing the character at position)
          result.push({
            text: '',
            isGlyph: true,
            glyphVariant: variant || defaultGlyphVariant,
            glyphVisibility: glyphConfig.responsiveVisibility,
            glyphSizeClassName: glyphConfig.glyphSizeClassName,
            wordGroupId,
          });
          
          // Move past the character that was replaced (pos + 1)
          currentPos = pos + 1;
        }
        
        // Add remaining text after the last glyph
        if (currentPos < word.length) {
          const after = word.slice(currentPos);
          if (after) {
            result.push({ text: after, wordGroupId });
          }
        }
      } else {
        // No glyph, add word as-is
        result.push({ text: word });
      }
    }
    
    // Now apply colored phrases
    // Match phrases against the original title, then map to segments
    if (coloredPhrases.length > 0) {
      const lowerTitle = title.toLowerCase();
      
      // Find all phrase matches in the original title
      const phraseMatches: Array<{
        start: number;
        end: number;
        color: string;
      }> = [];
      
      coloredPhrases.forEach(phrase => {
        const phraseLower = phrase.text.toLowerCase();
        let searchStart = 0;
        
        while (true) {
          const index = lowerTitle.indexOf(phraseLower, searchStart);
          if (index === -1) break;
          
          phraseMatches.push({
            start: index,
            end: index + phraseLower.length,
            color: phrase.color,
          });
          
          searchStart = index + 1;
        }
      });
      
      // Sort matches by start position
      phraseMatches.sort((a, b) => a.start - b.start);
      
      // Map original title positions to segments
      // We need to track which characters in the original title correspond to which segments
      let originalCharIndex = 0;
      
      // First pass: apply colors to text segments
      for (let i = 0; i < result.length; i++) {
        const segment = result[i];
        
        if (segment.isGlyph) {
          // Glyph replaces a character, so we skip one character in original title
          originalCharIndex++;
          continue;
        }
        
        // Map this segment's characters to original title positions
        const segmentStartInOriginal = originalCharIndex;
        const segmentEndInOriginal = originalCharIndex + segment.text.length;
        
        // Check if this segment overlaps with any colored phrase in the original title
        for (const match of phraseMatches) {
          if (segmentStartInOriginal < match.end && segmentEndInOriginal > match.start) {
            // Segment overlaps with colored phrase
            segment.color = match.color;
            break; // Use first matching color
          }
        }
        
        originalCharIndex += segment.text.length;
      }
      
      // Second pass: propagate colors to glyph segments in the same word group
      // Build a map of wordGroupId to color
      const wordGroupColors = new Map<number, string>();
      for (const segment of result) {
        if (segment.wordGroupId !== undefined && segment.color) {
          wordGroupColors.set(segment.wordGroupId, segment.color);
        }
      }
      
      // Apply colors to glyph segments in word groups
      for (const segment of result) {
        if (segment.isGlyph && segment.wordGroupId !== undefined) {
          const groupColor = wordGroupColors.get(segment.wordGroupId);
          if (groupColor) {
            segment.color = groupColor;
          }
        }
      }
    }

    // Apply forced line breaks based on `endl` phrases/words.
    // We insert a line-break segment *before* each matched phrase in the original title.
    if (endl.length > 0) {
      const lowerTitleForBreaks = title.toLowerCase();
      const breakPositions: number[] = [];

      endl.forEach(text => {
        const search = text.toLowerCase();
        if (!search) return;

        let searchStart = 0;
        while (true) {
          const index = lowerTitleForBreaks.indexOf(search, searchStart);
          if (index === -1) break;
          breakPositions.push(index);
          searchStart = index + 1;
        }
      });

      breakPositions.sort((a, b) => a - b);

      if (breakPositions.length > 0) {
        const splitResult: TextSegment[] = [];
        let originalCharIndex = 0;
        let breakIdx = 0;

        for (const segment of result) {
          // Line-break segments shouldn't exist yet, but skip defensively.
          if (segment.isLineBreak) {
            splitResult.push(segment);
            continue;
          }

          if (segment.isGlyph) {
            // Glyph replaces a character in the original title.
            splitResult.push(segment);
            originalCharIndex++;
            continue;
          }

          const text = segment.text;
          if (!text) {
            splitResult.push(segment);
            continue;
          }

          const segStart = originalCharIndex;
          const segEnd = segStart + text.length;
          let localStart = 0;

          // Process all break positions that fall within this segment
          while (
            breakIdx < breakPositions.length &&
            breakPositions[breakIdx] >= segStart &&
            breakPositions[breakIdx] < segEnd
          ) {
            const breakPos = breakPositions[breakIdx];
            const offsetInSeg = breakPos - segStart;

            // Text before the break
            if (offsetInSeg > localStart) {
              splitResult.push({
                ...segment,
                text: text.slice(localStart, offsetInSeg),
              });
            }

            // Insert an explicit line-break segment
            splitResult.push({ text: "", isLineBreak: true });

            localStart = offsetInSeg;
            breakIdx++;
          }

          // Remaining text after the last break (or entire segment if no breaks)
          if (localStart < text.length) {
            splitResult.push({
              ...segment,
              text: text.slice(localStart),
            });
          }

          originalCharIndex = segEnd;
        }

        return splitResult;
      }
    }
    
    return result;
  }, [title, glyphs, coloredPhrases, endl, defaultGlyphVariant]);

  // Render segments - group word segments with glyphs together, and group consecutive text with same styling
  const renderContent = () => {
    const elements: React.ReactNode[] = [];
    let currentTextGroup: string = '';
    let currentColor: string | undefined = undefined;
    let currentIsCssColor: boolean = false;
    let currentWordGroupId: number | undefined = undefined;
    let currentWordGroupSegments: Array<{ segment: TextSegment; index: number }> = [];
    let groupKey = 0;

    const flushTextGroup = () => {
      if (currentTextGroup) {
        const colorClass = currentColor || defaultTextColor;
        const isCssColor = colorClass && (
          colorClass.startsWith('#') ||
          colorClass.startsWith('rgb') ||
          colorClass.startsWith('hsl') ||
          colorClass.startsWith('var(')
        );
        
        const style = isCssColor ? { color: colorClass } : undefined;
        
        elements.push(
          <span
            key={`text-group-${groupKey++}`}
            className={colorClass && !isCssColor ? colorClass : undefined}
            style={style}
          >
            {currentTextGroup}
          </span>
        );
        currentTextGroup = '';
        currentColor = undefined;
        currentIsCssColor = false;
      }
    };

    const flushWordGroup = () => {
      if (currentWordGroupSegments.length > 0) {
        // Get the color from any segment in the group that has a color
        // (all segments in a word group should have the same color after color propagation)
        const segmentWithColor = currentWordGroupSegments.find(s => s.segment.color);
        const colorClass = segmentWithColor?.segment.color || defaultTextColor;
        const isCssColor = colorClass && (
          colorClass.startsWith('#') ||
          colorClass.startsWith('rgb') ||
          colorClass.startsWith('hsl') ||
          colorClass.startsWith('var(')
        );
        
        const style = isCssColor ? { color: colorClass } : undefined;
        
        // Render all segments in the word group together as a single inline unit.
        // This ensures the word with glyph behaves as one complete word element.
        // The word group span wraps: text-before + glyph + text-after.
        // We also prevent wrapping *inside* this word by using whitespace-nowrap,
        // so the whole word moves to the next line together.
        elements.push(
          <span
            key={`word-group-${groupKey++}`}
            className={clsx(
              colorClass && !isCssColor ? colorClass : undefined,
              "inline-flex items-baseline whitespace-nowrap"
            )}
            style={style}
          >
            {currentWordGroupSegments.map(({ segment }, groupIndex) => {
              if (segment.isGlyph) {
                // Glyph wrapped in span for responsive visibility, but still inside word group
                return (
                  <span
                    key={`word-group-${currentWordGroupId}-glyph-${groupIndex}`}
                    className={segment.glyphVisibility}
                  >
                    <DecorativeGlyph
                      variant={segment.glyphVariant!}
                      sizeClassName={segment.glyphSizeClassName || glyphSizeClassName}
                    />
                  </span>
                );
              }
              return (
                <React.Fragment key={`word-group-${currentWordGroupId}-text-${groupIndex}`}>
                  {segment.text}
                </React.Fragment>
              );
            })}
          </span>
        );
        currentWordGroupSegments = [];
        currentWordGroupId = undefined;
      }
    };

    segments.forEach((segment, index) => {
      // Handle explicit line-break segments
      if (segment.isLineBreak) {
        flushWordGroup();
        flushTextGroup();
        elements.push(<br key={`br-${index}`} />);
        return;
      }

      // If segment belongs to a word group (has wordGroupId)
      if (segment.wordGroupId !== undefined) {
        // If we were accumulating text, flush it first (text comes before word groups)
        flushTextGroup();
        
        // If this is a new word group, flush the previous one
        if (currentWordGroupId !== undefined && currentWordGroupId !== segment.wordGroupId) {
          flushWordGroup();
        }
        
        // Start or continue the word group
        currentWordGroupId = segment.wordGroupId;
        currentWordGroupSegments.push({ segment, index });
        return;
      }
      
      // If we were in a word group, flush it first (word groups come before regular text)
      if (currentWordGroupId !== undefined) {
        flushWordGroup();
      }
      
      // Handle regular segments (not in word groups)
      if (segment.isGlyph) {
        // This shouldn't happen (glyphs should have wordGroupId), but handle it just in case
        flushTextGroup();
        
        elements.push(
          <span
            key={`glyph-${index}`}
            className={segment.glyphVisibility}
          >
            <DecorativeGlyph
              variant={segment.glyphVariant!}
              sizeClassName={segment.glyphSizeClassName || glyphSizeClassName}
            />
          </span>
        );
      } else {
        const segmentColor = segment.color || defaultTextColor;
        const segmentIsCssColor = Boolean(segmentColor && (
          segmentColor.startsWith('#') ||
          segmentColor.startsWith('rgb') ||
          segmentColor.startsWith('hsl') ||
          segmentColor.startsWith('var(')
        ));
        
        // If color changed, flush previous group and start new one
        if (currentTextGroup && (currentColor !== segmentColor || currentIsCssColor !== segmentIsCssColor)) {
          flushTextGroup();
        }
        
        // Accumulate text with same styling
        currentTextGroup += segment.text;
        currentColor = segmentColor;
        currentIsCssColor = segmentIsCssColor;
      }
    });

    // Flush any remaining groups
    flushWordGroup();
    flushTextGroup();

    return elements;
  };

  // Get variant classes if variant is provided
  const variantClassName = variant ? variantClasses[variant] : undefined;

  return (
    <Component
      className={clsx(variantClassName, className)}
      aria-label={ariaLabel || title}
    >
      {renderContent()}
    </Component>
  );
}

export default HeadingText;
