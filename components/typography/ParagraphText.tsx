"use client";

import React from 'react';
import clsx from 'clsx';

export type ColoredPhrase = {
  /** The phrase to color (case-insensitive match) */
  text: string;
  /** Tailwind color class or CSS color value. Can include responsive classes (e.g., "text-blue-500 sm:text-blue-600") */
  color: string;
};

export type ParagraphTextProps = {
  /** The main text content - can be string or ReactNode */
  children: React.ReactNode;
  /** Phrases to color differently (only works with string children) */
  coloredPhrases?: ColoredPhrase[];
  /** Default text color (Tailwind class or CSS color). Can include responsive classes */
  defaultTextColor?: string;
  /** Typography variant with responsive sizing. Overrides className for font size if provided */
  variant?: 'body' | 'body-sm' | 'text' | 'lead';
  /** Additional className for the paragraph element. Supports responsive classes */
  className?: string;
  /** HTML element to render as */
  as?: 'p' | 'span' | 'div';
  /** ARIA label for accessibility */
  'aria-label'?: string;
};

type TextSegment = {
  text: string;
  color?: string;
};

/**
 * Typography variant classes with responsive sizing (mobile-first)
 * Base sizes optimized for small screens, scaling up on larger breakpoints
 */
const variantClasses: Record<NonNullable<ParagraphTextProps['variant']>, string> = {
  body: 'text-body',
  'body-sm': 'text-body-sm',
  text: 'text-sm sm:text-base md:text-lg',
  lead: 'text-base sm:text-lg md:text-xl lg:text-2xl',
};

/**
 * ParagraphText Component
 * 
 * A flexible, type-safe paragraph component that supports:
 * - Phrase-level color customization
 * - Full styling control
 * - Responsive design with Tailwind breakpoints
 * - Typography variants with responsive sizing
 * 
 * @example Basic usage
 * ```tsx
 * <ParagraphText
 *   variant="body"
 *   defaultTextColor="text-foreground"
 * >
 *   This is a paragraph with some text.
 * </ParagraphText>
 * ```
 * 
 * @example With colored phrases
 * ```tsx
 * <ParagraphText
 *   variant="body-sm"
 *   coloredPhrases={[
 *     { text: "some text", color: "text-primary" }
 *   ]}
 *   defaultTextColor="text-foreground"
 * >
 *   This is a paragraph with some text.
 * </ParagraphText>
 * ```
 * 
 * @example Responsive usage
 * ```tsx
 * <ParagraphText
 *   variant="body"
 *   className="leading-relaxed px-2"
 *   coloredPhrases={[
 *     { 
 *       text: "some text", 
 *       color: "text-blue-400 sm:text-blue-500 md:text-blue-600" // Responsive colors
 *     }
 *   ]}
 *   defaultTextColor="text-foreground"
 * >
 *   This is a paragraph with some text.
 * </ParagraphText>
 * ```
 */
export function ParagraphText({
  children,
  coloredPhrases = [],
  defaultTextColor,
  variant,
  className,
  as: Component = 'p',
  'aria-label': ariaLabel,
}: ParagraphTextProps) {
  // Check if children is a string
  const isStringChildren = typeof children === 'string';
  
  // Convert children to string only if needed for color processing
  const childrenString = React.useMemo(() => {
    if (isStringChildren) {
      return children;
    }
    // For non-string children, return empty string (won't be used for color processing)
    return '';
  }, [children, isStringChildren]);

  // Process text into segments with colors
  const segments = React.useMemo(() => {
    // If children is not a string, skip color processing
    if (!isStringChildren) {
      return [];
    }
    
    const result: TextSegment[] = [];
    
    // If no colored phrases, return single segment
    if (coloredPhrases.length === 0) {
      return [{ text: childrenString }];
    }
    
    const lowerText = childrenString.toLowerCase();
    
    // Find all phrase matches in the text
    const phraseMatches: Array<{
      start: number;
      end: number;
      color: string;
    }> = [];
    
    coloredPhrases.forEach(phrase => {
      const phraseLower = phrase.text.toLowerCase();
      let searchStart = 0;
      
      while (true) {
        const index = lowerText.indexOf(phraseLower, searchStart);
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
    
    // Build segments from matches
    let currentPos = 0;
    
    phraseMatches.forEach(match => {
      // Add text before the match
      if (match.start > currentPos) {
        const before = childrenString.slice(currentPos, match.start);
        if (before) {
          result.push({ text: before });
        }
      }
      
      // Add the colored phrase
      const phraseText = childrenString.slice(match.start, match.end);
      if (phraseText) {
        result.push({ text: phraseText, color: match.color });
      }
      
      currentPos = match.end;
    });
    
    // Add remaining text after the last match
    if (currentPos < childrenString.length) {
      const after = childrenString.slice(currentPos);
      if (after) {
        result.push({ text: after });
      }
    }
    
    // If no matches were found, return the whole text as a single segment
    if (result.length === 0) {
      return [{ text: childrenString }];
    }
    
    return result;
  }, [childrenString, coloredPhrases, isStringChildren]);

  // Render segments
  const renderContent = () => {
    return segments.map((segment, index) => {
      const colorClass = segment.color || defaultTextColor;
      const isCssColor = colorClass && (
        colorClass.startsWith('#') ||
        colorClass.startsWith('rgb') ||
        colorClass.startsWith('hsl') ||
        colorClass.startsWith('var(')
      );
      
      const style = isCssColor ? { color: colorClass } : undefined;
      
      return (
        <span
          key={`segment-${index}`}
          className={colorClass && !isCssColor ? colorClass : undefined}
          style={style}
        >
          {segment.text}
        </span>
      );
    });
  };

  // Get variant classes if variant is provided
  const variantClassName = variant ? variantClasses[variant] : undefined;

  // If children is not a string, render it directly without color processing
  if (typeof children !== 'string') {
    return (
      <Component
        className={clsx(variantClassName, className)}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      className={clsx(variantClassName, className)}
      aria-label={ariaLabel || childrenString}
    >
      {renderContent()}
    </Component>
  );
}

export default ParagraphText;

